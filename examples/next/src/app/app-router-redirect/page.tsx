import Link from "next/link";

import { Metadata } from "next";
import { Form } from "./form";

export const metadata: Metadata = {
  title:
    "🔐 iron-session examples: App router using client components, redirects, route handlers and fetch",
};

export default function AppRouterRedirect() {
  return (
    <main className="p-10 space-y-5">
      <h1 className="text-2xl">
        🔐 iron-session examples: App router{" "}
        <span className="text-gray-500">
          (client component | route handler | redirect | fetch)
        </span>
      </h1>

      <Form />
      <HowItWorks />
      <p>
        <Link href="/" className="text-indigo-500 text-lg">
          ← All examples
        </Link>
      </p>
    </main>
  );
}

function HowItWorks() {
  return (
    <details className="max-w-2xl space-y-4">
      <summary className="cursor-pointer text-gray-700">How it works</summary>

      <ol className="list-decimal list-inside">
        <li>
          The form is submitted to /app-router-redirect/login (route handler)
          via a POST call (non-fetch). The route handler sets the session data
          and redirects back to /app-router (this page).
        </li>
        <li>
          The page gets the session data via a fetch call to
          /app-router-redirect/session (route handler). The route handler either
          return the session data (logged in) or a default session (not logged
          in).
        </li>
        <li>
          The logout is a regular link navigating to /app-router-redirect/logout
          which destroy the session and redirects back to /app-router-redirect
          (this page).
        </li>
      </ol>

      <p>
        <strong>Pros</strong>: Straightforward. It does not rely on too many
        APIs. This is what we would have implemented a few years ago and is good
        enough for many websites.
      </p>
      <p>
        <strong>Cons</strong>: No synchronization. The session is not updated
        between tabs and windows. If you login or logout in one window or tab,
        the others are still showing the previous state. Also, we rely on full
        page navigation and redirects for login and logout. We could remove them
        by using fetch instead.
      </p>
    </details>
  );
}
