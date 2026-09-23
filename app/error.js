"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <span className="text-red-500 font-bold text-sm uppercase tracking-widest">
        Something Went Wrong
      </span>
      <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-blue-dark mt-2">
        An Unexpected Error Occurred
      </h1>
      <p className="text-gray-600 text-sm max-w-md mt-3">
        We apologize for the inconvenience. Please try again or return to the homepage.
      </p>
      <div className="mt-6 flex gap-3">
        <button onClick={() => reset()} className="btn-primary">
          Try Again
        </button>
        <Link href="/" className="btn-outline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
