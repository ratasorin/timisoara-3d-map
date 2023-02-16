import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    {
      rel: "stylesheet",
      href: "https://js.arcgis.com/4.25/@arcgis/core/assets/esri/themes/dark/main.css",
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

const queryClient = new QueryClient();

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <body className="h-full">
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </body>
        </Provider>
      </QueryClientProvider>
    </html>
  );
}
