import { Copy, Download, ImageUp, Link2, LoaderCircle, QrCode, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import Button from "../ui/Button";

function EncodePanel() {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEncoding, setIsEncoding] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const canEncode = message.trim().length > 0 && selectedFile;

  const mockPayload = useMemo(() => {
    if (!selectedFile) {
      return null;
    }

    const stamp = Date.now().toString().slice(-6);
    return {
      key: `AES-${stamp}-${message.trim().length || 12}`,
      fileName: `stego-${selectedFile.name}`,
      link: `https://secure-share.local/stego/${stamp}`,
      expires: "24 hours",
    };
  }, [message, selectedFile]);

  const handleEncode = () => {
    if (!canEncode || !mockPayload) {
      return;
    }

    setIsEncoding(true);
    setResult(null);

    window.setTimeout(() => {
      setResult({
        ...mockPayload,
        note: "Message encrypted, embedded, and prepared for secure delivery.",
      });
      setIsEncoding(false);
    }, 1500);
  };

  const handleCopy = async () => {
    if (!result) {
      return;
    }

    try {
      await navigator.clipboard.writeText(`${result.link} | Key: ${result.key}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const handleDownload = () => {
    if (!result) {
      return;
    }

    const blob = new Blob(
      [
        `Mock stego-image package\nFile: ${result.fileName}\nKey: ${result.key}\nShare Link: ${result.link}\nExpiry: ${result.expires}\n`,
      ],
      { type: "text/plain;charset=utf-8" },
    );
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${result.fileName}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="glass-panel rounded-[2rem] p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-300/80">
            Encode Section
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">Encrypt and Embed Message</h2>
        </div>
        <div className="rounded-2xl bg-teal-400/10 p-3 text-teal-300">
          <Sparkles className="h-6 w-6" />
        </div>
      </div>

      <div className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">Secret message</span>
          <textarea
            rows="5"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Type the confidential message you want to hide inside the image..."
            className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/25"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">Upload cover image</span>
          <div className="rounded-3xl border border-dashed border-cyan-300/24 bg-cyan-400/6 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
                  <ImageUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-white">
                    {selectedFile ? selectedFile.name : "Choose a PNG or JPG image"}
                  </p>
                  <p className="text-slate-400">Your original image remains visually unchanged.</p>
                </div>
              </div>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
                className="block w-full max-w-xs cursor-pointer rounded-full border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300 file:mr-3 file:rounded-full file:border-0 file:bg-cyan-400/15 file:px-4 file:py-2 file:text-cyan-200"
              />
            </div>
          </div>
        </label>

        <div className="rounded-3xl border border-white/8 bg-white/5 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
              Mock Secure Pipeline
            </h3>
            <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
              Frontend Demo
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {["AES Encryption", "Image Embedding", "Share Package"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/8 bg-slate-950/70 px-4 py-3 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleEncode} disabled={!canEncode || isEncoding} className="w-full sm:w-auto">
          {isEncoding ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Encrypting and Encoding...
            </>
          ) : (
            "Encrypt + Encode"
          )}
        </Button>

        {result ? (
          <div className="glass-panel rounded-3xl border border-teal-300/20 p-5">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-300/80">
                  Stego Package Ready
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">{result.fileName}</h3>
                <p className="mt-2 text-sm text-slate-300">{result.note}</p>
              </div>
              <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                Success
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
              <div className="space-y-3">
                <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-slate-200">
                  <span className="block text-xs uppercase tracking-[0.24em] text-slate-500">Decryption Key</span>
                  <span className="mt-2 block font-medium text-white">{result.key}</span>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-slate-200">
                  <span className="block text-xs uppercase tracking-[0.24em] text-slate-500">Secure Share Link</span>
                  <span className="mt-2 block break-all text-white">{result.link}</span>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-slate-200">
                  <span className="block text-xs uppercase tracking-[0.24em] text-slate-500">Expiry</span>
                  <span className="mt-2 block text-white">One-time access • {result.expires}</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleDownload} variant="secondary">
                    <Download className="mr-2 h-4 w-4" />
                    Download Stego-Image
                  </Button>
                  <Button onClick={handleCopy} variant="secondary">
                    <Copy className="mr-2 h-4 w-4" />
                    {copied ? "Copied" : "Copy Share Link"}
                  </Button>
                  <Button href={result.link} variant="secondary">
                    <Link2 className="mr-2 h-4 w-4" />
                    Share Preview
                  </Button>
                </div>
              </div>

              <div className="rounded-3xl border border-cyan-300/14 bg-slate-950/75 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-cyan-200">
                  <QrCode className="h-4 w-4" />
                  QR Key Share
                </div>
                <div className="mx-auto grid w-36 grid-cols-6 gap-1 rounded-2xl bg-white p-3">
                  {Array.from({ length: 36 }).map((_, index) => (
                    <div
                      key={index}
                      className={`aspect-square rounded-[2px] ${
                        [0, 1, 4, 5, 6, 11, 12, 17, 18, 19, 24, 29, 30, 31, 34].includes(index)
                          ? "bg-slate-950"
                          : "bg-cyan-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                  Mock QR layout representing a secure key-sharing handoff.
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default EncodePanel;
