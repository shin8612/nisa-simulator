export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-black">運営者情報</h1>

        <div className="mt-6 space-y-6 text-sm leading-7 text-slate-700">
          <section>
            <h2 className="font-bold text-slate-900">サイト名</h2>
            <p>新NISA・FIREかんたん診断</p>
          </section>

          <section>
            <h2 className="font-bold text-slate-900">運営者</h2>
            <p>個人開発者</p>
          </section>

          <section>
            <h2 className="font-bold text-slate-900">サイトの目的</h2>
            <p>
              新NISAやFIREに関心がある方向けに、将来資産やFIRE達成年齢の目安を簡単に確認できるツールを提供しています。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-slate-900">注意事項</h2>
            <p>
              当サイトの結果は簡易的なシミュレーションです。投資判断や金融商品の選択については、必ず公式情報や専門家の情報も確認してください。
            </p>
          </section>
        </div>

        <a href="/" className="mt-8 inline-block text-sm font-bold text-emerald-700 underline">
          トップへ戻る
        </a>
      </div>
    </main>
  );
}