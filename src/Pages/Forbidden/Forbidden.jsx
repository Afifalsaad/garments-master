import React from "react";
import { Link, useNavigate } from "react-router";

export default function ForbiddenPage({
  title = "403 — Forbidden",
  subtitle = "You don't have permission to access this page.",
  showHome = true,
  onBack,
}) {
  const navigate = useNavigate?.() || null;

  const handleBack = () => {
    if (typeof onBack === "function") return onBack();
    if (navigate) return navigate(-1);
    // fallback
    window.history.back();
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-gray-200 dark:border-slate-700 rounded-2xl shadow-lg p-8 sm:p-12">
        <div className="flex items-center gap-8">
          <div className="shrink-0 w-36 h-36 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center">
            {/* Lock / Forbidden SVG */}
            <svg
              className="w-20 h-20 text-red-600 dark:text-red-400"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 15v2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="3"
                y="11"
                width="18"
                height="10"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 11V8a5 5 0 0 1 10 0v3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {title}
            </h1>

            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              {subtitle}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Go back
              </button>

              {showHome && (
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">
                  Home
                </Link>
              )}

              <a
                href="/support"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-500 hover:underline">
                Contact support
              </a>
            </div>

            <div className="mt-6 text-sm text-slate-400">
              <p>
                If you think this is an error, please contact your administrator
                or try signing in with an account that has the required
                permissions.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-dashed border-slate-100 dark:border-slate-700 pt-6 text-xs text-slate-400">
          <div>
            Reference code:{" "}
            <span className="text-slate-600 dark:text-slate-200 font-mono">
              ERR_FORBIDDEN_403
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
