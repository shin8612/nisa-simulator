export default function RulePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-black">
          4%ルールとは？
        </h1>

        <div className="mt-8 space-y-6 text-slate-700 leading-8">
          <p>
            FIREで有名な考え方です。
          </p>

          <p>
            資産の4%以内で生活できれば、
            長期間資産が尽きにくいとされています。
          </p>

          <h2 className="text-2xl font-bold">
            例
          </h2>

          <p>
            年間生活費300万円なら、
            必要資産は約7500万円です。
          </p>

          <p>
            300万円 ÷ 4%
            =
            7500万円
          </p>

          <p>
            このサイトのFIRE目標額も、
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