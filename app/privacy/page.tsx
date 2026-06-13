export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-black">プライバシーポリシー</h1>

        <div className="mt-6 space-y-6 text-sm leading-7 text-slate-700">
          <p>
            当サイト「新NISA・FIREかんたん診断」では、ユーザーの個人情報を入力・送信する機能はありません。
          </p>

          <section>
            <h2 className="font-bold text-slate-900">入力データについて</h2>
            <p>
              年齢、積立額、想定年利などの入力データは、お使いのブラウザ内に保存される場合があります。
              これらの情報は当サイト運営者には送信されません。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-slate-900">アクセス解析・広告について</h2>
            <p>
              今後、当サイトではアクセス解析ツールや広告サービス、アフィリエイトプログラムを利用する場合があります。
              その際、Cookie等を使用して情報を取得する場合があります。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-slate-900">免責事項</h2>
            <p>
              当サイトのシミュレーション結果は、将来の運用成果を保証するものではありません。
              投資判断はご自身の責任で行ってください。
            </p>
          </section>

          <p>制定日：2026年6月</p>
        </div>

        <a href="/" className="mt-8 inline-block text-sm font-bold text-emerald-700 underline">
          トップへ戻る
        </a>
      </div>
    </main>
  );
}