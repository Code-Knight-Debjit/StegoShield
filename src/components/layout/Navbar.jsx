import { Menu, Shield, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "#workflow", label: "How It Works" },
  { href: "#stack", label: "Tech Stack" },
  { href: "#workspace", label: "Workspace" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-white/6 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-3 text-white">
          <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-2 text-cyan-300">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
              Stego Shield
            </p>
            <p className="text-sm text-slate-300">Hide Secret Messages Inside Image</p>
          </div>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate-300 transition hover:text-cyan-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="rounded-xl border border-white/10 p-2 text-slate-200 md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-white/8 bg-slate-950/95 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-slate-300 transition hover:text-cyan-200"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;
