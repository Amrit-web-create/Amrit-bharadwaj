import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/cn";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/studio", label: "Studio" },
  { to: "/templates", label: "Templates" },
] as const;

function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-ink", className)}>
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="currentColor" />
        <rect x="6" y="6" width="8" height="8" rx="1.5" fill="var(--color-cream)" />
        <rect x="18" y="6" width="8" height="8" rx="1.5" fill="var(--color-cream)" />
        <rect x="6" y="18" width="8" height="8" rx="1.5" fill="var(--color-cream)" />
        <rect x="20" y="20" width="4" height="4" fill="var(--color-sand)" />
      </svg>
      <span className="display text-2xl leading-none">Aurel</span>
    </span>
  );
}

export function Header() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-40 border-b border-linen/80 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" aria-label="Aurel home" className="shrink-0">
          <Wordmark />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Primary">
          {LINKS.map((link) => {
            const active = path === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200",
                  active ? "bg-ink text-cream" : "text-rose hover:bg-linen hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-linen">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Wordmark />
          <p className="mt-3 max-w-sm text-sm text-rose">
            A studio for marks that still scan. Drawn in the browser, exported as PNG or JPG, ready for a card, a menu, a window.
          </p>
        </div>
        <p className="text-xs tracking-widest text-blush uppercase">Dusty rose · Quiet type · Real codes</p>
      </div>
    </footer>
  );
}
