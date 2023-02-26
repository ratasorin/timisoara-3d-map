import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import tailwind from "./styles/tailwind.css";
import scrollbar from "./styles/scrollbar.css";
import lexicalImage from "library/lexical/components/image/index.css";
import focus from "./styles/focus.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { queryClient } from "./src/react-query";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwind },
    {
      rel: "stylesheet",
      href: "https://js.arcgis.com/4.25/@arcgis/core/assets/esri/themes/dark/main.css",
    },
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css",
    },
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css",
    },
    {
      rel: "stylesheet",
      href: scrollbar,
    },
    {
      rel: "stylesheet",
      href: focus,
    },
    {
      rel: "stylesheet",
      href: lexicalImage,
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

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
            <script> const global = globalThis; </script>
            <LiveReload />
          </body>
        </Provider>
      </QueryClientProvider>
    </html>
  );
}
