/**
 * @typedef {Object} UserProfile
 * @property {string} id            - UUID, FK to auth.users
 * @property {string} email
 * @property {string|null} full_name
 * @property {string|null} avatar_url
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {"free"|"pro"|"agency"} SubscriptionPlan
 * @typedef {"active"|"canceled"|"past_due"|"trialing"|"incomplete"} SubscriptionStatus
 *
 * @typedef {Object} Subscription
 * @property {string} id
 * @property {string} user_id                  - FK to profiles
 * @property {SubscriptionPlan} plan
 * @property {SubscriptionStatus} status
 * @property {string|null} stripe_customer_id
 * @property {string|null} stripe_subscription_id
 * @property {string|null} current_period_start
 * @property {string|null} current_period_end
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} SiteIntake
 * @property {string} businessName
 * @property {string} businessType      - e.g. "personal trainer"
 * @property {string} location
 * @property {string} tagline
 * @property {string} description
 * @property {Array<{name: string, price: string}>} services
 * @property {{email: string, phone?: string}} contact
 */

/**
 * @typedef {Object} SiteContent
 * @property {{headline: string, subheadline: string, ctaText: string}} hero
 * @property {Array<{title: string, description: string, price: string}>} services
 * @property {{bio: string}} about
 * @property {{primaryColor: string, font: string}} theme
 */

/**
 * @typedef {Object} Site
 * @property {string} id
 * @property {string} user_id           - FK to profiles
 * @property {string} subdomain         - unique, e.g. "sarahs-training"
 * @property {string|null} custom_domain
 * @property {string} business_name
 * @property {boolean} published
 * @property {SiteIntake} intake        - raw answers from the 7-question form
 * @property {SiteContent} content      - AI-generated site content
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {"new"|"contacted"|"converted"|"archived"} LeadStatus
 *
 * @typedef {Object} Lead
 * @property {string} id
 * @property {string} site_id           - FK to sites
 * @property {string} name
 * @property {string} email
 * @property {string|null} phone
 * @property {string|null} message
 * @property {LeadStatus} status
 * @property {Object} metadata          - UTM params, referrer, custom fields
 * @property {string} created_at
 */

/**
 * @typedef {Object} LeadStats
 * @property {number} total
 * @property {number} new
 * @property {number} contacted
 * @property {number} converted
 * @property {number} archived
 */
