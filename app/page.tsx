"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Row = {
  year: number;
  principal: number;
  balance: number;
  profit: number;
};

const SITE_URL = "https://nisa-simulator-six.vercel.app/";

const yen = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0,
});

function simulate(monthly: number, annualRate: number, years: number, current: number): Row[] {
  const monthlyRate = annualRate / 100 / 12;
  let balance = current;
  let principal = current;
  const rows: Row[] = [{ year: 0, principal, balance, profit: balance - principal }];

  for (let month = 1; month <= years * 12; month++) {
    balance = balance * (1 + monthlyRate) + monthly;
    principal += monthly;

    if (month % 12 === 0) {
      rows.push({
        year: month / 12,
        principal: Math.round(principal),
        balance: Math.round(balance),
        profit: Math.round(balance - principal),
      });
    }
  }

  return rows;
}

function calcFireYears(current: number, monthly: number, annualRate: number, yearlyCost: number) {
  const target = yearlyCost * 25;
  const monthlyRate = annualRate / 100 / 12;
  let balance = current;

  if (balance >= target) return 0;

  for (let month = 1; month <= 80 * 12; month++) {
    balance = balance * (1 + monthlyRate) + monthly;
    if (balance >= target) return Math.ceil(month / 12);
  }

  return null;
}

export default function Home() {
  const [monthly, setMonthly] = useState(50000);
  const [annualRate, setAnnualRate] = useState(5);
  const [years, setYears] = useState(20);
  const [current, setCurrent] = useState(0);
  const [yearlyCost, setYearlyCost] = useState(3000000);
  const [age, setAge] = useState(35);

  useEffect(() => {
    const saved = localStorage.getItem("nisa-fire-inputs");
    if (!saved) return;

    try {
      const values = JSON.parse(saved);
      setMonthly(Number(values.monthly ?? 50000));
      setAnnualRate(Number(values.annualRate ?? 5));
      setYears(Number(values.years ?? 20));
      setCurrent(Number(values.current ?? 0));
      setYearlyCost(Number(values.yearlyCost ?? 3000000));
      setAge(Number(values.age ?? 35));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "nisa-fire-inputs",
      JSON.stringify({ monthly, annualRate, years, current, yearlyCost, age })
    );
  }, [monthly, annualRate, years, current, yearlyCost, age]);

  const data = useMemo(
    () => simulate(monthly, annualRate, years, current),
    [monthly, annualRate, years, current]
  );

  const last = data[data.length - 1];
  const fireTarget = yearlyCost * 25;
  const fireYears = calcFireYears(current, monthly, annualRate, yearlyCost);
  const fireAge = fireYears === null ? null : age + fireYears;

  const remainingAmount = Math.max(0, fireTarget - last.balance);
  const fireProgress = Math.min(100, Math.round((last.balance / fireTarget) * 100));

  const recommendedMonthly = Math.round(monthly * 1.5);
  const recommendedFireYears = calcFireYears(current, recommendedMonthly, annualRate, yearlyCost);
  const recommendedFireAge = recommendedFireYears === null ? null : age + recommendedFireYears;

  const shortenedYears =
    fireYears !== null && recommendedFireYears !== null
      ? Math.max(0, fireYears - recommendedFireYears)
      : null;

  const shareText = [
    "新NISA・FIRE診断をやってみた",
    "",
    `現在${age}歳`,
    `毎月積立：${monthly.toLocaleString()}円`,
    `FIRE予想年齢：${fireAge === null ? "未達成" : `${fireAge}歳`}`,
    `目標まであと：${yen.format(remainingAmount)}`,
    "",
    SITE_URL,
  ].join("\n");

  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-8 rounded-[2rem] bg-white/90 p-7 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100 sm:p-12">
          <p className="mb-3 text-sm font-bold text-emerald-700">ログイン不要・無料で試算</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            新NISA・FIRE
            <br />
            かんたん診断
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            毎月の積立額、年齢、年間生活費を入力すると、あなたが何歳でFIREできそうかをかんたんに診断できます。
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100">
            <h2 className="text-2xl font-black">条件を入力</h2>

            <div className="mt-6 space-y-5">
              <Input label="現在の年齢" value={age} setValue={setAge} suffix="歳" min={18} step={1} />
              <Input label="毎月積立額" value={monthly} setValue={setMonthly} suffix="円" min={0} step={1000} />

              <div className="rounded-2xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
                新NISAの年間投資枠は最大360万円です。本シミュレーターでは、FIRE試算のためNISA枠を超える積立額も入力できます。
              </div>

              <Input label="想定年利" value={annualRate} setValue={setAnnualRate} suffix="%" min={0} step={0.1} />
              <Input label="積立年数" value={years} setValue={setYears} suffix="年" min={1} step={1} />
              <Input label="現在の運用資産" value={current} setValue={setCurrent} suffix="円" min={0} step={10000} />
              <Input label="年間生活費" value={yearlyCost} setValue={setYearlyCost} suffix="円" min={0} step={100000} />
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100">
            <h2 className="text-2xl font-black">診断結果</h2>

            <div className="mt-6 rounded-3xl bg-slate-900 p-6 text-white">
              <p className="text-sm text-slate-300">あなたのFIRE予想年齢</p>
              <p className="mt-2 text-5xl font-black text-emerald-300">
                {fireAge === null ? "未達成" : `${fireAge}歳`}
              </p>

              <p className="mt-4 text-lg font-bold">
                {fireYears === 0
                  ? "すでにFIRE目標を達成しています"
                  : fireYears === null
                  ? "現在の条件では80年以内の達成は難しそうです"
                  : `あと約${fireYears}年でFIRE目標に到達する見込みです`}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <MiniCard title="FIRE目標額" value={yen.format(fireTarget)} />
                <MiniCard title="予想資産" value={yen.format(last.balance)} />
                <MiniCard title="あと必要な金額" value={yen.format(remainingAmount)} />
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                <p className="text-sm font-bold text-emerald-300">改善アドバイス</p>
                {recommendedFireAge === null ? (
                  <p className="mt-2 text-sm leading-7 text-slate-200">
                    毎月積立を増やす、年間生活費を下げる、運用期間を長くすることでFIRE達成に近づきます。
                  </p>
                ) : (
                  <p className="mt-2 text-sm leading-7 text-slate-200">
                    毎月積立を
                    <span className="font-bold text-white"> {monthly.toLocaleString()}円 </span>
                    から
                    <span className="font-bold text-emerald-300"> {recommendedMonthly.toLocaleString()}円 </span>
                    に増やすと、
                    <span className="font-bold text-white"> {recommendedFireAge}歳 </span>
                    でFIREできる可能性があります。
                    {shortenedYears !== null && shortenedYears > 0 && (
                      <span className="font-bold text-emerald-300">
                        {" "}
                        現在より約{shortenedYears}年短縮できます。
                      </span>
                    )}
                  </p>
                )}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <MiniCard title="達成率" value={`${fireProgress}%`} />
                <MiniCard title="改善後のFIRE年齢" value={recommendedFireAge === null ? "未達成" : `${recommendedFireAge}歳`} />
                <MiniCard title="短縮効果" value={shortenedYears === null ? "計算不可" : `${shortenedYears}年`} />
              </div>

              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block rounded-2xl bg-white px-5 py-4 text-center text-sm font-black text-slate-900 transition hover:bg-emerald-100"
              >
                結果をXで共有する
              </a>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <ResultCard title="最終資産額" value={yen.format(last.balance)} strong />
              <ResultCard title="元本" value={yen.format(last.principal)} />
              <ResultCard title="運用益" value={yen.format(last.profit)} />
            </div>

            <div className="mt-8 h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" tickFormatter={(v) => `${v}年`} />
                  <YAxis tickFormatter={(v) => `${Math.round(Number(v) / 10000)}万`} />
                  <Tooltip formatter={(value) => yen.format(Number(value))} labelFormatter={(label) => `${label}年後`} />
                  <Area type="monotone" dataKey="balance" name="資産額" strokeWidth={3} fillOpacity={0.22} />
                  <Area type="monotone" dataKey="principal" name="元本" strokeWidth={2} fillOpacity={0.08} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <h2 className="text-xl font-black">この診断について</h2>

              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
                <p>
                  この診断は、FIRE（経済的自立・早期リタイア）の考え方として広く知られている「4%ルール」を参考に計算しています。
                </p>

                <p>
                  FIRE目標額は「年間生活費 × 25倍」として算出しています。
                </p>

                <p>
                  想定年利や将来の市場環境によって結果は大きく変動するため、実際の運用成果を保証するものではありません。
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a href="/about-fire" className="rounded-xl bg-slate-100 px-4 py-2 font-semibold hover:bg-slate-200">
                    FIREとは？
                  </a>

                  <a href="/about-nisa" className="rounded-xl bg-slate-100 px-4 py-2 font-semibold hover:bg-slate-200">
                    新NISAとは？
                  </a>

                  <a href="/about-rule" className="rounded-xl bg-slate-100 px-4 py-2 font-semibold hover:bg-slate-200">
                    4%ルールとは？
                  </a>
                </div>
              </div>
            </section>

            <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-bold text-emerald-700">次にやること</p>
              <h3 className="mt-2 text-2xl font-black">新NISAを始める準備をする</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                FIREを目指すなら、まずは少額から積立を始めるのが現実的です。証券口座をまだ持っていない場合は、新NISAに対応した証券会社を比較してみましょう。
              </p>
              <a
                href="https://www.fsa.go.jp/policy/nisa2/know/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-2xl bg-emerald-600 px-5 py-4 text-sm font-black text-white transition hover:bg-emerald-700"
              >
                新NISAについて確認する
              </a>
            </section>

            <p className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              このシミュレーションは将来の運用成果を保証するものではありません。税金、手数料、制度変更などは考慮していません。
            </p>

            <footer className="mt-6 flex gap-4 text-sm text-slate-500">
              <a href="/privacy" className="underline">プライバシーポリシー</a>
              <a href="/about" className="underline">運営者情報</a>
            </footer>
          </section>
        </div>
      </div>
    </main>
  );
}

function Input({
  label,
  value,
  setValue,
  suffix,
  min,
  step,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
  suffix: string;
  min: number;
  step: number;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <div className="mt-2 flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-100">
        <input
          className="w-full bg-transparent text-lg font-bold outline-none"
          type="number"
          value={value === 0 ? "" : value}
          min={min}
          step={step}
          onFocus={(e) => e.target.select()}
          onChange={(e) => {
            const nextValue = e.target.value;
            setValue(nextValue === "" ? 0 : Number(nextValue));
          }}
        />
        <span className="ml-2 text-slate-500">{suffix}</span>
      </div>
    </label>
  );
}

function ResultCard({ title, value, strong = false }: { title: string; value: string; strong?: boolean }) {
  return (
    <div className={strong ? "rounded-3xl bg-emerald-600 p-5 text-white shadow-lg" : "rounded-3xl bg-slate-100 p-5"}>
      <p className={strong ? "text-sm text-emerald-50" : "text-sm text-slate-500"}>{title}</p>
      <p className="mt-2 text-2xl font-black tracking-tight">{value}</p>
    </div>
  );
}

function MiniCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-xs text-slate-300">{title}</p>
      <p className="mt-2 text-lg font-black">{value}</p>
    </div>
  );
}