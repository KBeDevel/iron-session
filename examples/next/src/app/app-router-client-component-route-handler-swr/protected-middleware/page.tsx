import { Title } from "@/app/title";
import * as css from "@/app/css";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "../lib";
import Link from "next/link";

// Broken: None of these parameters is working, thus we have caching issues
// TODO fix this
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return session;
}

export default function ProtectedServer() {
  return (
    <main className="p-10 space-y-5">
      <Title subtitle="Protected page" />
      <Content />
      <p>
        <Link
          href="/app-router-client-component-route-handler-swr"
          className={css.link}
        >
          ← Back
        </Link>
      </p>
    </main>
  );
}

async function Content() {
  const session = await getSession();

  return (
    <div className="max-w-xl space-y-2">
      <p>
        Hello <strong>{session.username}!</strong>
      </p>
      <p>
        This page is protected and can only be accessed if you are logged in.
        Otherwise you will be redirected to the login page.
      </p>
      <p>The check is done via a middleware.</p>
    </div>
  );
}
