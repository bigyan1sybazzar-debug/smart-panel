export const metadata = {
  title: "Admin Panel",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return <div className="min-h-screen bg-brand-cream">{children}</div>;
}
