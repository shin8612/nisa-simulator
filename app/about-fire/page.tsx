export default function FirePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-black">
          FIREとは？
        </h1>

        <div className="mt-8 space-y-6 text-slate-700 leading-8">
          <p>
            FIREとは
            「Financial Independence, Retire Early」
            の略です。
          </p>

          <p>
            日本語では
            「経済的自立と早期リタイア」
            と訳されます。
          </p>

          <p>
            資産運用によって生活費をまかなえる状態になり、
            働かなくても生活できることを目指す考え方です。
          </p>

          <h2 className="text-2xl font-bold">
            なぜFIREを目指す人が多いの？
          </h2>

          <p>
            お金のために働く時間を減らし、
            自分の好きなことに時間を使えるからです。
          </p>

          <h2 className="text-2xl font-bold">
            FIREに必要な資産
          </h2>

          <p>
            一般的には
            年間生活費の25倍
            が目安とされています。
          </p>

          <p>
            このサイトの診断も、
            この考え方を参考にしています。
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