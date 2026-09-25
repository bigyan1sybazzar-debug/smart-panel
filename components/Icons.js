export function PhoneIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function PinIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function ChevronDown(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function MenuIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

/* =========================================================
   SOCIAL ICONS
   ========================================================= */

const socialPaths = {
  facebook:
    "M14.5 8H17V4.5c-.45-.06-1.98-.2-3.77-.2-3.73 0-6.29 2.28-6.29 6.46V13H4v3.5h2.94V22h3.6v-5.5h3.22l.51-3.5h-3.73v-1.97c0-1.01.27-1.7 1.67-1.7h2.29z",

  instagram:
    "M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Z M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z M18 5.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z",

  twitter:
    "M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.4L6.47 22H3.36l7.24-8.28L2.8 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.9h1.73L8.27 3.99H6.41L17.8 19.9Z",

  youtube:
    "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.55 3.5 12 3.5 12 3.5s-7.55 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.85.6 9.4.6 9.4.6s7.55 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.8V8.2l6.5 3.8-6.5 3.8Z",

  tiktok:
    "M15.5 2h3.1c.15 1.53.78 2.84 1.86 3.83A6.34 6.34 0 0 0 24 7.25v3.1a9.4 9.4 0 0 1-4.93-1.38v6.42a6.61 6.61 0 1 1-5.7-6.55v3.22a3.36 3.36 0 1 0 2.13 3.13V2Z",
};

export function SocialIcon({ name, ...props }) {
  const d = socialPaths[name];

  if (!d) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      {...props}
    >
      <path d={d} />
    </svg>
  );
}

/* =========================================================
   ADVANTAGE ICONS — NOW USING UNSPLASH IMAGES
   ========================================================= */

const advantageImages = {
  /* Prefab / insulated home */
  heat: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=200&h=200&fit=crop&q=80",

  /* Feather / lightweight */
  feather: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=200&h=200&fit=crop&q=80",

  /* Sound / acoustic */
  sound: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=200&fit=crop&q=80",

  /* Wrench / installation */
  wrench: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=200&h=200&fit=crop&q=80",

  /* Earthquake / structural */
  quake: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&q=80",

  /* Space / room */
  space: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=200&fit=crop&q=80",

  /* Cost / savings */
  cost: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=200&fit=crop&q=80",

  /* Fire / fast construction */
  fire: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=200&h=200&fit=crop&q=80",

  /* Shield / durability */
  shield: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop&q=80",
};

/**
 * AdvantageIcon
 * Renders a circular Unsplash image for the given advantage name.
 *
 * @param {string} name - one of: heat, feather, sound, wrench, quake, space, cost, fire, shield
 * @param {number} size - pixel size (default 28)
 */
export function AdvantageIcon({ name, size = 28, className = "", style, ...props }) {
  const src = advantageImages[name] || advantageImages.cost;

  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={className}
      style={{
        objectFit: "cover",
        borderRadius: "50%",
        display: "block",
        flexShrink: 0,
        ...(style || {}),
      }}
      {...props}
    />
  );
}