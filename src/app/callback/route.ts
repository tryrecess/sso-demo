// This is where the user is redirected to after authenticating with Recess.
// This part of the code should run in your secured/server-side environment.
import jwt, { JwtPayload } from "jsonwebtoken";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return new Response("No token found", { status: 400 });
  }

  try {
    const decoded = jwt.verify(token, process.env.SSO_SECRET!) as JwtPayload;

    // Verify that the token is not expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      return new Response("Token expired", { status: 400 });
    }

    // Verify audience matches your client ID
    if (decoded.aud !== process.env.NEXT_PUBLIC_SSO_CLIENT_ID) {
      return new Response("Invalid token audience", { status: 400 });
    }

    /**
     * Here's where you should do something with the user's data, like saving it to your database.
     * After that, you can sign your own user token.
     *
     * Unless Recess users are your only users, you should not use Recess user IDs as your own user ID.
     */

    // for demo purposes, we store the entire user object in a cookie
    const recessUser = JSON.stringify(decoded);
    return new Response(null, {
      status: 302,
      headers: {
        "Set-Cookie": `recess-user=${recessUser}; Path=/; HttpOnly; Secure; SameSite=Strict`,
        Location: "/",
      },
    });
  } catch {
    return new Response("Invalid token", { status: 400 });
  }
}
