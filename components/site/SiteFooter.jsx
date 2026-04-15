export default function SiteFooter({ content, meta, theme }) {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12 px-4 text-center text-sm">
      <p className={`font-bold text-white text-base mb-2`}>{meta?.businessName}</p>
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        {content?.location && <span>📍 {content.location}</span>}
        {content?.email    && <span>✉ {content.email}</span>}
        {content?.phone    && <span>📞 {content.phone}</span>}
      </div>
      <p className="mt-6 text-gray-600 text-xs">
        Built with{" "}
        <a href="/" className={`${theme.accentText} hover:underline`}>
          Visionary Dev
        </a>
      </p>
    </footer>
  )
}
