const testimonials = [
  {
    quote:
      "I went from no website to fully booked in 3 weeks. My clients say my site looks more professional than gyms that have been around for years.",
    name: "Sarah M.",
    title: "Personal Trainer, Austin TX",
    avatar: "SM",
    stars: 5,
  },
  {
    quote:
      "I was embarrassed by my old site. Set up Visionary Dev on a Tuesday, had 4 new client inquiries by Friday. I wish I'd done this 2 years ago.",
    name: "Marcus T.",
    title: "Business Coach, Atlanta GA",
    avatar: "MT",
    stars: 5,
  },
  {
    quote:
      "Zero tech knowledge, zero stress. I answered a few questions and 2 minutes later I had a website I was actually proud to hand out at events.",
    name: "Priya K.",
    title: "Nutritionist & Wellness Coach",
    avatar: "PK",
    stars: 5,
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="bg-white px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
            Real results
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            Service businesses are growing with Visionary Dev.
          </h2>
          <p className="mt-4 text-gray-500">
            Join hundreds of trainers, coaches, and consultants who stopped waiting and started winning.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-4"
            >
              <Stars count={t.stars} />
              <p className="text-gray-700 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof bar */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center border-t border-gray-100 pt-12">
          <div>
            <p className="text-3xl font-bold text-gray-900">500+</p>
            <p className="text-sm text-gray-500 mt-1">Websites launched</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">2 min</p>
            <p className="text-sm text-gray-500 mt-1">Average setup time</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">4.9★</p>
            <p className="text-sm text-gray-500 mt-1">Average rating</p>
          </div>
        </div>
      </div>
    </section>
  )
}
