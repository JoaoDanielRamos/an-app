import CreateNote from "@/components/CreateNote";
import Header from "@/components/Layout/Header";
import MobileNavigation from "@/components/Layout/MobileNavigation";
import NotFound from "@/components/Layout/NotFound";
import appCss from "@/styles/app.css?url";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import ClerkProvider from "../integrations/clerk/provider";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Notes",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap",
      },
    ],
  }),

  shellComponent: RootDocument,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ClerkProvider>
          <SignedIn>
            <Header />
            <main className="[view-transition-name:main-content] max-lg:pb-16">
              {children}
            </main>
            <MobileNavigation />
            {/* <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        /> */}
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>

          <CreateNote />
        </ClerkProvider>

        <Scripts />
      </body>
    </html>
  );
}
