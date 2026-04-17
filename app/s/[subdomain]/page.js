import { notFound }      from "next/navigation"
import { createClient }  from "@/lib/supabase/server"
import { SiteRenderer }  from "@/components/site/SiteRenderer"

// Public site — accessible to anyone.
// URL: /s/[subdomain]  (e.g. /s/sarahs-personal-training)
// Production: middleware will rewrite subdomain.visionarydev.org → this route.
export async function generateMetadata({ params }) {
  const { subdomain } = await params
  const supabase      = await createClient()

  const { data: site } = await supabase
    .from("sites")
    .select("business_name, content")
    .eq("subdomain", subdomain)
    .eq("published", true)
    .single()

  if (!site) return { title: "Site not found" }

  return {
    title:       site.business_name,
    description: site.content?.hero?.subheadline ?? "",
  }
}

export default async function PublicSitePage({ params }) {
  const { subdomain } = await params
  const supabase      = await createClient()

  const { data: site } = await supabase
    .from("sites")
    .select("*")
    .eq("subdomain", subdomain)
    .eq("published", true)
    .single()

  if (!site) notFound()

  return <SiteRenderer site={site} />
}
