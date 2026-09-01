"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="cs">
      <body className="flex min-h-screen items-center justify-center bg-zinc-100 p-6">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-zinc-900">Došlo k chybě</h1>
          <p className="mt-3 text-sm text-zinc-600">
            Omlouváme se, něco se pokazilo. Zkuste stránku načíst znovu.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-full bg-[#e85d04] px-6 py-2.5 text-sm font-semibold text-white"
          >
            Zkusit znovu
          </button>
        </div>
      </body>
    </html>
  );
}
