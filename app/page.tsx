"use client";

import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Row = {
  year: number;
  principal: number;
  balance: number;
  profit: number;
};

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

  const data = useMemo(() => simulate(monthly, annualRate, years, current), [monthly, annualRate, years, current]);
  const last = data[data.length - 1];
  const fireTarget = yearlyCost * 25;
  const fireYears = calcFireYears(current, monthly, annualRate, yearlyCost);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-8 rounded-[2rem] bg-white/90 p-7 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100 sm:p-12">
          <p className="mb-3 text-sm font-bold text-emerald-700">ログイン不要・無料で試算</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            新NISA・FIRE
            <br />
            かんたんシミュレーター
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            毎月の積立額、想定年利、積立年数を入力すると、将来の資産額・元本・運用益・FIRE達成目安を確認できます。
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100">
            <h2 className="text-2xl font-black">条件を入力</h2>

            <div className="mt-6 space-y-5">
              <Input label="毎月積立額" value={monthly} setValue={setMonthly} suffix="円" min={0} step={1000} />
              <Input label="想定年利" value={annualRate} setValue={setAnnualRate} suffix="%" min={0} step={0.1} />
              <Input label="積立年数" value={years} setValue={setYears} suffix="年" min={1} step={1} />
              <Input label="現在の運用資産" value={current} setValue={setCurrent} suffix="円" min={0} step={10000} />
              <Input label="年間生活費" value={yearlyCost} setValue={setYearlyCost} suffix="円" min={0} step={100000} />
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100">
            <h2 className="text-2xl font-black">シミュレーション結果</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <ResultCard title="最終資産額" value={yen.format(last.balance)} strong />
              <ResultCard title="元本" value={yen.format(last.principal)} />
              <ResultCard title="運用益" value={yen.format(last.profit)} />
            </div>

            <div className="mt-5 rounded-3xl bg-slate-900 p-6 text-white">
              <p className="text-sm text-slate-300">FIRE目標額（年間生活費 × 25）</p>
              <p className="mt-2 text-3xl font-black">{yen.format(fireTarget)}</p>
              <p className="mt-4 text-lg font-bold text-emerald-300">
                {fireYears === 0
                  ? "すでにFIRE目標を達成しています"
                  : fireYears === null
                  ? "80年以内の達成は難しそうです"
                  : `あと約${fireYears}年でFIRE目標に到達`}
              </p>
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

            <p className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              このシミュレーションは将来の運用成果を保証するものではありません。税金、手数料、制度変更などは考慮していません。
            </p>
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
          value={value}
          min={min}
          step={step}
          onChange={(e) => setValue(Number(e.target.value))}
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