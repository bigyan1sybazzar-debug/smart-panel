export default function PageHero({ title, subtitle, crumb }) {
  return (
    <div className="bg-brand-green-dark text-white">
      <div className="container-page py-8 sm:py-10 md:py-14">
        {crumb && (
          <div className="text-xs uppercase tracking-wide text-brand-orange font-semibold mb-2">
            {crumb}
          </div>
        )}
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">{title}</h1>
        {subtitle && (
          <p className="mt-2 sm:mt-3 max-w-2xl text-white/75 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
