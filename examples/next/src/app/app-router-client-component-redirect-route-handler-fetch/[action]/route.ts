import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { defaultSession, sessionOptions } from "../lib";
import { redirect } from "next/navigation";
import { sleep, SessionData } from "../lib";

// /app-router-client-component-redirect-route-handler-fetch/login
export async function POST(
  request: NextRequest,
  { params }: { params: { action: string } },
) {
  if (params.action !== "login") {
    return new Response("Unknown path", { status: 404 });
  }

  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  const formData = await request.formData();

  session.isLoggedIn = true;
  session.username = (formData.get("username") as string) ?? "No username";
  await session.save();

  // simulate looking up the user in db
  await sleep(250);

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303
  // not using redirect() yet: https://github.com/vercel/next.js/issues/51592#issuecomment-1810212676
  return Response.redirect(
    `${request.nextUrl.origin}/app-router-client-component-redirect-route-handler-fetch`,
    303,
  );
}

// /app-router-client-component-redirect-route-handler-fetch/session
// /app-router-client-component-redirect-route-handler-fetch/logout
export async function GET(
  _request: NextRequest,
  { params }: { params: { action: string } },
) {
  if (params.action !== "session" && params.action !== "logout") {
    return new Response("Unknown path", { status: 404 });
  }

  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  // /app-router-client-component-redirect-route-handler-fetch/logout
  if (params.action === "logout") {
    await session.destroy();
    return redirect(
      "/app-router-client-component-redirect-route-handler-fetch",
    );
  }

  // simulate looking up the user in db
  await sleep(250);

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession);
  }

  return Response.json(session);
}
