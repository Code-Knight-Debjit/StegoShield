import { AlertTriangle, KeyRound, LoaderCircle, ScanSearch, Unlock } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";

function DecodePanel() {
  const [stegoFile, setStegoFile] = useState(null);
  const [key, setKey] = useState("");
  const [isDecoding, setIsDecoding] = useState(false);
  const [status, setStatus] = useState(null);

  const canDecode = Boolean(stegoFile) && key.trim().length >= 6;

  const handleDecode = () => {
    if (!canDecode) {
      setStatus({
        type: "error",
        title: "Missing secure inputs",
        message: "Upload a stego-image and enter a valid decryption key to continue.",
      });
      return;
    }

    setIsDecoding(true);
    setStatus(null);

    window.setTimeout(() => {
      const validKey = key.trim().toUpperCase().startsWith("AES-") || key.trim().length >= 10;
      setStatus(
        validKey
          ? {
              type: "success",
              title: "Hidden message recovered",
              message:
                "Mock decode successful. The encrypted payload was identified, extracted, and decrypted with the supplied key.",
              secret:
                "Project demo message: secure communication can happen invisibly when encryption and steganography work together.",
            }
          : {
              type: "error",
              title: "Decryption failed",
              message:
                "The provided key could not validate the hidden payload. Use the original secure key or scan the shared QR code.",
            },
      );
      setIsDecoding(false);
    }, 1400);
  };

  return (
    <section className="glass-panel rounded-[2rem] p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300/80">
            Decode Section
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">Extract and Decrypt Hidden Data</h2>
        </div>
        <div className="rounded-2xl bg-sky-400/10 p-3 text-sky-300">
          <Unlock className="h-6 w-6" />
        </div>
      </div>

      <div className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">Upload stego-image</span>
          <div className="rounded-3xl border border-dashed border-sky-300/24 bg-sky-400/6 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="rounded-2xl bg-sky-400/10 p-3 text-sky-300">
                  <ScanSearch className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-white">
                    {stegoFile ? stegoFile.name : "Choose the stego-image you received"}
                  </p>
                  <p className="text-slate-400">The system will simulate payload extraction on decode.</p>
                </div>
              </div>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(event) => setStegoFile(event.target.files?.[0] ?? null)}
                className="block w-full max-w-xs cursor-pointer rounded-full border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300 file:mr-3 file:rounded-full file:border-0 file:bg-sky-400/15 file:px-4 file:py-2 file:text-sky-200"
              />
            </div>
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">Enter decryption key</span>
          <div className="relative">
            <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={key}
              onChange={(event) => setKey(event.target.value)}
              placeholder="Example: AES-841522-48"
              className="w-full rounded-3xl border border-white/10 bg-slate-950/70 py-4 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/60 focus:ring-2 focus:ring-sky-300/25"
            />
          </div>
        </label>

        <div className="rounded-3xl border border-white/8 bg-white/5 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
            Secure Decode Checklist
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Verify link and source image",
              "Supply correct AES decryption key",
              "Extract hidden payload",
              "Display plaintext to authorized user",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/8 bg-slate-950/70 px-4 py-3 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={handleDecode}
          disabled={isDecoding}
          className="w-full bg-gradient-to-r from-sky-300 via-cyan-300 to-teal-300 text-slate-950 hover:shadow-sky-400/25 sm:w-auto"
        >
          {isDecoding ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Decoding Secure Payload...
            </>
          ) : (
            "Decode Message"
          )}
        </Button>

        {status ? (
          <div
            className={`rounded-3xl border p-5 ${
              status.type === "success"
                ? "border-emerald-300/20 bg-emerald-400/8"
                : "border-rose-300/20 bg-rose-400/8"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`rounded-2xl p-3 ${
                  status.type === "success"
                    ? "bg-emerald-400/12 text-emerald-300"
                    : "bg-rose-400/12 text-rose-300"
                }`}
              >
                {status.type === "success" ? (
                  <Unlock className="h-5 w-5" />
                ) : (
                  <AlertTriangle className="h-5 w-5" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{status.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-200">{status.message}</p>
                {status.secret ? (
                  <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-4">
                    <span className="block text-xs uppercase tracking-[0.24em] text-slate-500">
                      Extracted Message
                    </span>
                    <p className="mt-2 text-sm leading-6 text-cyan-50">{status.secret}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default DecodePanel;
