import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <span className="text-brand-orange font-bold text-sm uppercase tracking-widest">
        404 - Page Not Found
      </span>
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-blue-dark mt-2">
        Page Does Not Exist
      </h1>
      <p className="text-gray-600 text-sm max-w-md mt-3">
        The page you are looking for might have been moved, removed, or is temporarily unavailable.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
        <Link href="/products" className="btn-outline">
          View Products
        </Link>
      </div>
    </div>
  );
}
