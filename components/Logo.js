import Link from "next/link";

export default function Logo({ compact = false }) {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0 group" aria-label="Smart Prefab Panel home">
      <div className={`relative flex items-center justify-center shrink-0 ${compact ? "w-10 h-10" : "w-12 h-12"}`}>
        <svg width="100%" height="100%" viewBox="0 0 50 50" fill="none">
          <rect x="2" y="2" width="46" height="46" rx="8" fill="#1b75bc" />
          <path d="M25 2L48 25V42C48 45.3137 45.3137 48 42 48H25V2Z" fill="#2b8a3e" />
          <path d="M14 30C14 20 22 12 32 12C32 22 24 30 14 30Z" fill="#ffffff" />
          <path d="M19 29C19 23 23 19 29 19" stroke="#1b75bc" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col justify-center font-display font-extrabold tracking-tight leading-none">
        <span className={`text-[#1b75bc] tracking-wider ${compact ? "text-base" : "text-xl"}`}>SMART</span>
        <span className={`text-[#2b8a3e] tracking-tight ${compact ? "text-[11px]" : "text-xs"} font-bold mt-1`}>PREFAB PANEL</span>
      </div>
    </Link>
  );
}


