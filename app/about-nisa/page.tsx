export default function NisaPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-black">
          新NISAとは？
        </h1>

        <div className="mt-8 space-y-6 text-slate-700 leading-8">
          <p>
            新NISAは、
            投資で得た利益が非課税になる制度です。
          </p>

          <p>
            通常は利益に約20%の税金がかかりますが、
            NISA口座では税金がかかりません。
          </p>

          <h2 className="text-2xl font-bold">
            年間投資枠
          </h2>

          <p>
            新NISAの年間投資枠は
            最大360万円です。
          </p>

          <h2 className="text-2xl font-bold">
            なぜ人気なの？
          </h2>

          <p>
            長期投資と非常に相性が良く、
            FIREを目指す人にも人気があります。
          </p>
        </div>

        <a
          href="/"
          className="mt-8 inline-block font-bold text-emerald-700 underline"
        >
          トップへ戻る
        </a>
      </div>
    </main>
  );
}