import { NextRequest, NextResponse } from 'next/server'
import { createClient }              from '@/lib/supabase/server'

// ── Validation ────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Strip HTML tags to prevent stored XSS
function sanitize(value: unknown): string {
  return String(value ?? '').replace(/<[^>]*>/g, '').trim()
}

interface LeadBody {
  siteId:   string
  name:     string
  email:    string
  message?: string
}

function validate(body: Partial<LeadBody>): string | null {
  if (!body.siteId?.trim())          return 'siteId is required.'
  if (!body.name?.trim())            return 'Name is required.'
  if (body.name.length > 100)        return 'Name is too long.'
  if (!body.email?.trim())           return 'Email is required.'
  if (!EMAIL_RE.test(body.email))    return 'Please enter a valid email address.'
  if (body.email.length > 255)       return 'Email is too long.'
  if (body.message && body.message.length > 2000)
    return 'Message is too long (max 2000 characters).'
  return null
}

// ── POST /api/leads ───────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // Parse body
  let raw: Record<string, unknown>
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const siteId  = sanitize(raw.siteId)
  const name    = sanitize(raw.name)
  const email   = sanitize(raw.email).toLowerCase()
  const message = raw.message ? sanitize(raw.message) : null

  // Validate
  const validationError = validate({ siteId, name, email, message: message ?? undefined })
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 })
  }

  const supabase = await createClient()

  // Verify site exists and is live — prevents phantom lead inserts
  const { data: site } = await supabase
    .from('sites')
    .select('id')
    .eq('id', siteId)
    .eq('is_live', true)
    .maybeSingle()

  if (!site) {
    return NextResponse.json({ error: 'Site not found.' }, { status: 400 })
  }

  // Duplicate detection: same email + site within 24 hours
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const { data: existing } = await supabase
    .from('leads')
    .select('id')
    .eq('site_id', siteId)
    .eq('email', email)
    .gte('created_at', since)
    .maybeSingle()

  if (existing) {
    // Silent success — don't reveal internal dedup to caller
    return NextResponse.json({ success: true }, { status: 200 })
  }

  // Insert
  const { error: insertError } = await supabase
    .from('leads')
    .insert({ site_id: siteId, name, email, message, metadata: {} })

  if (insertError) {
    console.error('[POST /api/leads]', insertError.message)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
