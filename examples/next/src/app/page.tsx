import Link from "next/link";
import * as css from "@/app/css";
import { Title } from "./title";

export default function Home() {
  return (
    <main className="p-10 space-y-5">
      <Title subtitle="" category="Home" />
      <p>
        This website showcase different ways to use the iron-session library.
      </p>
      <ul className="list-disc list-inside">
        <li>
          <Link
            className={css.link.concat(" text-lg")}
            href="/app-router-client-component-route-handler-swr"
          >
            App router + client components, route handlers, and swr
          </Link>{" "}
          🤩
          <ul className="list-disc list-inside indent-10 text-md text-gray-700">
            <li>
              This the most advanced example and the one we currently recommend.
            </li>
          </ul>
        </li>
        <li>
          <Link
            className={css.link.concat(" text-lg")}
            href="/app-router-server-component-and-action"
            // prefetch = false to avoid caching issues when navigating between tabs/windows
            prefetch={false}
          >
            App router + server components, and server actions
          </Link>
        </li>
        <li>
          <Link
            className={css.link.concat(" text-lg")}
            href="/app-router-client-component-redirect-route-handler-fetch"
          >
            App router + client components, route handlers, redirects, and fetch
          </Link>
        </li>
        <li>OAuth login example (swr) (Help needed)</li>
        <li>Pages + API routes, redirects, and fetch (Help needed)</li>
        <li>Pages + API routes, and swr (Help needed)</li>
        <li>Pages + getServerSideProps, and redirects (Help needed)</li>
        <li>Magic links (Help needed)</li>
        <li>req.session wrappers (Help needed)</li>
      </ul>
    </main>
  );
}
