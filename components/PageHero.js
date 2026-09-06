export default function PageHero({ title, subtitle, crumb }) {
  return (
    <div className="bg-brand-green-dark text-white">
      <div className="container-page py-12 md:py-16">
        {crumb && (
          <div className="text-xs uppercase tracking-wide text-brand-orange font-semibold mb-2">
            {crumb}
          </div>
        )}
        <h1 className="font-display text-3xl md:text-4xl font-extrabold">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-white/75">{subtitle}</p>}
      </div>
    </div>
  );
}
