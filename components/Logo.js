import Link from "next/link";
import Image from "next/image";

export default function Logo({ compact = false, className = "" }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center shrink-0 group ${className}`}
      aria-label="Smart Prefab Panel home"
    >
      <Image
        src="/images/logo.png"
        alt="Smart Prefab Panel Nepal"
        width={220}
        height={56}
        priority
        className={compact ? "h-9 w-auto object-contain" : "h-11 sm:h-12 w-auto object-contain"}
      />
    </Link>
  );
}
