"use client";
import React, { useMemo, useState } from "react";

type Props = {
  defaultTrainingCost?: number; // optional, e.g. 20000
};

export default function RoiCalculator({ defaultTrainingCost = 0 }: Props) {
  const [teamSize, setTeamSize] = useState(8);
  const [hourlyCost, setHourlyCost] = useState(220); // ZAR per hour
  const [hoursSavedPerWeek, setHoursSavedPerWeek] = useState(1.5);
  const [weeksMeasured, setWeeksMeasured] = useState(12);
  const [toolingCost, setToolingCost] = useState(0);
  const [trainingCost, setTrainingCost] = useState(defaultTrainingCost);

  const savings = useMemo(() => {
    const gross =
      teamSize * hourlyCost * hoursSavedPerWeek * weeksMeasured;
    const net = gross - toolingCost - trainingCost;
    const roiPct = trainingCost > 0 ? (net / trainingCost) * 100 : 0;
    return { gross, net, roiPct };
  }, [teamSize, hourlyCost, hoursSavedPerWeek, weeksMeasured, toolingCost, trainingCost]);

  const currency = (n: number) =>
    n.toLocaleString(undefined, { style: "currency", currency: "ZAR", maximumFractionDigits: 0 });

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6">
      <h4 className="text-lg font-semibold text-white">ROI Calculator</h4>
      <p className="mt-1 text-slate-300">Estimate time savings from AI enablement.</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="text-sm text-slate-400">Team size</span>
          <input 
            type="number" 
            className="w-full rounded-lg bg-slate-800 p-2 text-white border border-slate-700 focus:border-cyan-500 focus:outline-none"
            value={teamSize} 
            onChange={(e)=>setTeamSize(+e.target.value)} 
            min={1}
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-400">Average hourly cost (ZAR)</span>
          <input 
            type="number" 
            className="w-full rounded-lg bg-slate-800 p-2 text-white border border-slate-700 focus:border-cyan-500 focus:outline-none"
            value={hourlyCost} 
            onChange={(e)=>setHourlyCost(+e.target.value)} 
            min={50}
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-400">Hours saved per person / week</span>
          <input 
            type="number" 
            step="0.5" 
            className="w-full rounded-lg bg-slate-800 p-2 text-white border border-slate-700 focus:border-cyan-500 focus:outline-none"
            value={hoursSavedPerWeek} 
            onChange={(e)=>setHoursSavedPerWeek(+e.target.value)} 
            min={0}
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-400">Weeks measured</span>
          <input 
            type="number" 
            className="w-full rounded-lg bg-slate-800 p-2 text-white border border-slate-700 focus:border-cyan-500 focus:outline-none"
            value={weeksMeasured} 
            onChange={(e)=>setWeeksMeasured(+e.target.value)} 
            min={1}
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-400">Tooling cost (ZAR)</span>
          <input 
            type="number" 
            className="w-full rounded-lg bg-slate-800 p-2 text-white border border-slate-700 focus:border-cyan-500 focus:outline-none"
            value={toolingCost} 
            onChange={(e)=>setToolingCost(+e.target.value)} 
            min={0}
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-400">Training cost (ZAR)</span>
          <input 
            type="number" 
            className="w-full rounded-lg bg-slate-800 p-2 text-white border border-slate-700 focus:border-cyan-500 focus:outline-none"
            value={trainingCost} 
            onChange={(e)=>setTrainingCost(+e.target.value)} 
            min={0}
          />
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-slate-800/50 p-4 border border-slate-700">
          <div className="text-xs text-slate-400 uppercase">Gross Savings</div>
          <div className="mt-1 text-xl font-semibold text-green-400">{currency(savings.gross)}</div>
        </div>
        <div className="rounded-xl bg-slate-800/50 p-4 border border-slate-700">
          <div className="text-xs text-slate-400 uppercase">Net Benefit</div>
          <div className="mt-1 text-xl font-semibold text-cyan-400">{currency(savings.net)}</div>
        </div>
        <div className="rounded-xl bg-slate-800/50 p-4 border border-slate-700">
          <div className="text-xs text-slate-400 uppercase">ROI %</div>
          <div className="mt-1 text-xl font-semibold text-purple-400">
            {isFinite(savings.roiPct) ? `${savings.roiPct.toFixed(0)}%` : "—"}
          </div>
        </div>
      </div>
    </div>
  );
}
