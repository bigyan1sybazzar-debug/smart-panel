import Link from "next/link";

export default function Logo({ compact = false, className = "" }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center shrink-0 group ${className}`}
      aria-label="Smart Prefab Panel home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo.png"
        alt="Smart Prefab Panel Nepal"
        className={compact ? "h-9 w-auto object-contain" : "h-11 sm:h-12 w-auto object-contain"}
      />
    </Link>
  );
}
