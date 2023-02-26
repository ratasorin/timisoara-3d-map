import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useActionData, useLocation } from "@remix-run/react";
import { useState } from "react";
import { MdClose } from "react-icons/md";
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
  const emailOrName = String(body.get("email-or-name"));
  const password = String(body.get("password"));
  const redirectBackQueryString = String(body.get("redirect-back-to"));
  const redirectBackTo =
    new URLSearchParams(redirectBackQueryString).get("redirect-back-to") || "/";

  console.log({ emailOrName, password });

  if (!emailOrName || !password)
    return { error: "Nu ați completat câmpurile cerute!" };
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: emailOrName,
          AND: {
            password,
          },
        },
        {
          name: emailOrName,
          AND: {
            password,
          },
        },
      ],
    },
    select: { id: true },
  });

  if (!user) return { error: "Ați greșit numele/emailul și parola!" };

  const { id: sessionId } = await prisma.session.create({
    data: { userId: user.id },
    select: { id: true },
  });

  const userSessionCookie = await putSessionInCookie(sessionId);

  throw redirect(redirectBackTo, {
    headers: {
      "Set-Cookie": userSessionCookie,
    },
  });
};

const Auth = () => {
  const location = useLocation();
  const data = useActionData<typeof action>();
  const [popupOpen, setPopupOpen] = useState(true);

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-12 px-6 lg:px-8">
      {data && popupOpen && (
        <div className="absolute inset-0 flex max-h-max w-full flex-row items-center justify-center bg-red-200 p-4 text-red-600">
          <span>{data.error}</span>
          <button
            className="mx-2 rounded-full p-1"
            onClick={() => setPopupOpen(false)}
          >
            <MdClose className="h-5 w-5" />
          </button>
        </div>
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-24 w-auto"
          src="/insurance.png"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-700">
          Autentifică-te
        </h2>
        <p className="max-w mt-2 text-center text-sm text-gray-600">
          Nu ești întrgistrat?
          <Link
            to={{
              pathname: "/register",
              search: location.search,
            }}
            className="m-1 rounded-md p-1 font-medium text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Înregistrează-te
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-lg bg-white py-8 px-6 shadow sm:px-10">
          <Form className="mb-0 space-y-6" action="#" method="post">
            <input
              type="text"
              defaultValue={location.search}
              hidden
              name="redirect-back-to"
            />

            <div>
              <label
                htmlFor="email-or-name"
                className="block text-sm font-medium text-zinc-600"
              >
                Nume sau email
              </label>
              <div className="mt-1">
                <input
                  name="email-or-name"
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border-2 border-zinc-500 py-2 px-3 focus:outline-blue-500"
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
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border-2 border-zinc-500 px-3 py-2 focus:outline-blue-500  "
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={() => setPopupOpen(true)}
                className="flex w-full justify-center rounded-lg border-2 border-zinc-300 py-2 px-4 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-100"
              >
                Autentifică
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
