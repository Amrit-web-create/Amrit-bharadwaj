import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Footer, Header } from "@/components/chrome";
import appCss from "../styles.css?url";

const APP_NAME = "Aurel";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "description", content: "Aurel is a QR atelier. Paste a link, dress the mark, and export a real PNG or JPG that still scans." },
      { name: "theme-color", content: "#F7EFE7" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600;1,9..144,700&family=Outfit:wght@300;400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <div className="boot" aria-hidden="true">
            <div className="boot-mark">
              <p className="display text-5xl text-ink">Aurel</p>
              <div className="boot-rule" />
              <p className="mt-4 text-xs tracking-widest text-rose uppercase">Atelier</p>
            </div>
          </div>
          <Header />
          <Outlet />
          <Footer />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
