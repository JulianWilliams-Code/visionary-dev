/**
 * @typedef {Object} UserProfile
 * @property {string} id
 * @property {string} email
 * @property {string} full_name
 * @property {string|null} avatar_url
 * @property {string} created_at
 */

/**
 * @typedef {Object} Subscription
 * @property {string} id
 * @property {string} user_id
 * @property {"active"|"canceled"|"past_due"|"trialing"} status
 * @property {"free"|"pro"|"agency"} plan
 * @property {string} stripe_customer_id
 * @property {string} stripe_subscription_id
 * @property {string} current_period_end
 */

/**
 * @typedef {Object} Site
 * @property {string} id
 * @property {string} user_id
 * @property {string} name
 * @property {string} subdomain
 * @property {string|null} custom_domain
 * @property {Object} content
 * @property {boolean} published
 * @property {string} created_at
 * @property {string} updated_at
 */
