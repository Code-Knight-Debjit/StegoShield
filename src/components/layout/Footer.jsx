import { Github, Linkedin, Mail, ShieldCheck } from "lucide-react";

function Footer() {
  return (
    <footer id="contact" className="relative z-10 border-t border-white/8">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="glass-panel rounded-3xl p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-2xl bg-teal-400/10 p-2 text-teal-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">Let’s Build Secure Communication</h3>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-slate-300">
                This project website presents a modern concept for protected message exchange
                through image steganography, AES encryption, and secure sharing workflows.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-slate-200">
              <a
                href="mailto:contact@stegoshield.dev"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 hover:border-cyan-300/40 hover:bg-cyan-400/8"
              >
                <Mail className="h-4 w-4" />
                contact@stegoshield.dev
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 hover:border-cyan-300/40 hover:bg-cyan-400/8"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 hover:border-cyan-300/40 hover:bg-cyan-400/8"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-white/8 pt-6 text-xs uppercase tracking-[0.28em] text-slate-500">
            Hide Secret Messages Inside Image • Cybersecurity Project Showcase
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
