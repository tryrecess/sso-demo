import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import { logoutUser } from "./actions";
import { LogOutButton } from "@/components/utils/LogOutButton";

export const dynamic = "force-dynamic"; // Ensure the page renders dynamically

export default async function Home() {
  const cookieStore = await cookies();
  const recessUserCookie = cookieStore.get("recess-user");
  const recessUser = recessUserCookie
    ? JSON.parse(recessUserCookie.value)
    : null;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const ssoBaseUrl = process.env.NEXT_PUBLIC_SSO_BASE_URL;
  const ssoClientId = process.env.NEXT_PUBLIC_SSO_CLIENT_ID;

  if (!appUrl || !ssoBaseUrl || !ssoClientId) {
    throw new Error(
      "Required environment variables are missing. Please set NEXT_PUBLIC_APP_URL, NEXT_PUBLIC_SSO_BASE_URL, and NEXT_PUBLIC_SSO_CLIENT_ID."
    );
  }

  const ssoUrl = new URL(ssoBaseUrl);
  ssoUrl.searchParams.append("client_id", ssoClientId);
  ssoUrl.searchParams.append("redirect_uri", `${appUrl}/callback`);

  return (
    <main className="max-w-xl mx-auto text-center p-20">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Demo App</h1>

        {recessUser ? (
          <div className="space-y-4 mx-auto">
            <div className="p-4 rounded-md text-sm">
              <p>
                <strong>Recess ID:</strong> {recessUser.sub}
              </p>
              <p>
                <strong>Name:</strong> {recessUser.firstName}{" "}
                {recessUser.lastNameInitial}
              </p>
              <p>
                <strong>Family ID:</strong> {recessUser.familyId}
              </p>
            </div>

            <LogOutButton />
          </div>
        ) : (
          <Button asChild>
            <Link href={ssoUrl.toString()}>Log in with Recess &rarr;</Link>
          </Button>
        )}
      </div>
    </main>
  );
}
