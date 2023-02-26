import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useLocation } from "@remix-run/react";
import { prisma } from "~/db.server";
import {
  getSessionFromCookie,
  putSessionInCookie,
  validateSession,
} from "~/src/server/session-cookies.server";

export const loader = async ({ request }: LoaderArgs) => {
  const sessionId = await getSessionFromCookie(request);
  if (!sessionId) return null;

  const isValidSession = await validateSession(sessionId);
  if (!isValidSession) return null;

  throw redirect("/");
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const name = String(body.get("name"));
  const email = String(body.get("email"));
  const password = String(body.get("password"));
  const redirectBackQueryString = String(body.get("redirect-back-to"));
  const redirectBackTo =
    new URLSearchParams(redirectBackQueryString).get("redirect-back-to") || "/";

  if (!name || !email || !password)
    throw new Error("Missing fields! Please fill all the form");

  const { id: userId } = await prisma.user.create({
    data: { email, name, password },
    select: { id: true },
  });

  const { id: sessionId } = await prisma.session.create({
    data: { userId },
    select: { id: true },
  });

  console.log({ redirectBackTo });

  const userSessionCookie = await putSessionInCookie(sessionId);

  return redirect(redirectBackTo, {
    headers: {
      "Set-Cookie": userSessionCookie,
    },
  });
};

const Register = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-20 w-auto" src="/user.png" alt="Workflow" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-700">
          Înregistrează-te"
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          Ai deja cont?
          <Link
            to={{
              pathname: "/auth",
              search: location.search,
            }}
            className="m-1 rounded-md p-1 font-medium text-indigo-600   hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Autentifică-te
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-lg bg-white py-8 px-6 shadow sm:px-10">
          <Form className="mb-0 space-y-6" action="" method="post">
            <input
              type="text"
              defaultValue={location.search}
              hidden
              name="redirect-back-to"
            />
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-600"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border-2 border-zinc-500 px-3 py-2 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-600"
              >
                Nume
              </label>
              <div className="mt-1">
                <input
                  name="name"
                  autoComplete="name"
                  required
                  className="w-full rounded-lg border-2 border-zinc-500 px-3 py-2 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-600"
              >
                Parola
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border-2 border-zinc-500 px-3 py-2 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg border-2 border-zinc-300 py-2 px-4 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-100"
              >
                Înregistrează
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
