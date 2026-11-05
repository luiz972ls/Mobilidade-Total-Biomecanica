import React, { useState } from 'react';
import {
  PERIODIZATION_MATRIX,
  calculateAutoregulatedPrescription,
  PeriodizationWeekSpec
} from '../utils/biomechanicsMath';
import { Sliders, Activity, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export const Module2PeriodizationMatrix: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<1 | 2 | 3 | 4>(1);
  const [morningStiffnessInput, setMorningStiffnessInput] = useState<number>(4);
  const [acutePainInput, setAcutePainInput] = useState<number>(3);
  const [daysStagnantInput, setDaysStagnantInput] = useState<number>(2);

  const weeks: PeriodizationWeekSpec[] = [
    PERIODIZATION_MATRIX[1],
    PERIODIZATION_MATRIX[2],
    PERIODIZATION_MATRIX[3],
    PERIODIZATION_MATRIX[4]
  ];

  const activeWeekSpec = PERIODIZATION_MATRIX[selectedWeek];
  const autoregulationResult = calculateAutoregulatedPrescription({
    week: selectedWeek,
    morningStiffness: morningStiffnessInput,
    acutePainMax: acutePainInput,
    daysStagnantRom: daysStagnantInput
  });

  return (
    <div className="space-y-8">
      {/* Module Header */}
      <div className="bg-white border border-slate-200 p-6">
        <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
          02. MÓDULO 2 · MODELO MATEMÁTICO E NEUROFISIOLÓGICO DE PROGRESSÃO (4 SEMANAS)
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mt-1">
          Matriz de Periodização Semanal & Algoritmo de Autorregulação de Carga
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-4xl">
          Estrutura de sobrecarga progressiva para remodelamento viscoelástico da matriz extracelular, tixotropia
          hialurônica, adição de sarcômeros em série no fim de curso (End-Range PAILs/RAILs) e consolidação cortical.
        </p>

        {/* Mathematical Equations Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200 font-mono text-xs">
          <div className="bg-slate-50 border border-slate-200 p-3.5">
            <div className="text-slate-500">EQUAÇÃO DE DENSIDADE DE TUT SEMANAL</div>
            <div className="text-slate-900 font-bold mt-1 tabular-nums">
              TUT_sem = Σ (Séries × TUT_base × M_semana)
            </div>
            <div className="text-[11px] text-slate-600 mt-1">
              M_semana: Sem 1 (1.00) · Sem 2 (1.35) · Sem 3 (1.65) · Sem 4 (0.75)
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5">
            <div className="text-slate-500">LIMIAR DE DEFORMAÇÃO PLÁSTICA COLAGENOSA</div>
            <div className="text-slate-900 font-bold mt-1 tabular-nums">
              TUT_efetivo &gt;= 120s acumulados / articulação
            </div>
            <div className="text-[11px] text-slate-600 mt-1">
              Transição da fase elástica (Titina) para fluência plástica (Colágeno I/III)
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5">
            <div className="text-slate-500">REGRA DE CORREÇÃO DE ASSIMETRIA BILATERAL</div>
            <div className="text-slate-900 font-bold mt-1 tabular-nums">
              Volume_Restrito : Volume_Dominante = 2 : 1
            </div>
            <div className="text-[11px] text-slate-600 mt-1">
              Ativada sempre que Δ Knee-to-Wall &gt;= 1.5 cm ou Δ Rotação &gt;= 5°
            </div>
          </div>
        </div>
      </div>

      {/* Master 4-Week Periodization Table */}
      <div className="bg-white border border-slate-200 overflow-x-auto">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Tabela Mestra de Periodização (Semanas 1 a 4) — Clique em uma Semana para Simular Autorregulação
          </h3>
          <span className="text-xs font-mono text-slate-500">UNIDADES PADRONIZADAS (TUT em segundos / CVM em %)</span>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-mono uppercase text-slate-600">
              <th className="py-3 px-4 min-w-[200px]">Semana / Fase</th>
              <th className="py-3 px-4 min-w-[240px]">Objetivo Clínico & Mecanismo</th>
              <th className="py-3 px-4 text-right">Multiplicador / TUT</th>
              <th className="py-3 px-4 text-right">Séries / Irradiação</th>
              <th className="py-3 px-4 min-w-[220px]">Cadência Respiratória (M / N)</th>
              <th className="py-3 px-4 min-w-[220px]">Protocolo End-Range & EVA Alvo</th>
              <th className="py-3 px-4 min-w-[200px]">Critério de Progressão</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs">
            {weeks.map((w) => {
              const isSelected = w.week === selectedWeek;
              return (
                <tr
                  key={w.week}
                  onClick={() => setSelectedWeek(w.week)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-teal-50/50' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-4 px-4 align-top">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-teal-800">SEMANA 0{w.week}</span>
                      {isSelected && (
                        <span className="text-[11px] font-mono text-teal-700 underline">Selecionada</span>
                      )}
                    </div>
                    <div className="font-bold text-slate-900 mt-1">{w.phaseName.split('—')[1]?.trim()}</div>
                    <div className="font-mono text-slate-500 mt-1 tabular-nums">
                      Volume Semanal: {w.weeklyTotalTutMinutes} min
                    </div>
                  </td>

                  <td className="py-4 px-4 align-top">
                    <div className="text-slate-900 font-medium">{w.clinicalObjective}</div>
                    <div className="text-slate-500 mt-1">{w.neurophysiologicalMechanism}</div>
                  </td>

                  <td className="py-4 px-4 align-top text-right font-mono tabular-nums">
                    <div className="text-sm font-bold text-slate-900">{w.baseTutSecondsPerSet}s / série</div>
                    <div className="text-teal-700 mt-0.5">Fator: {w.tutMultiplier.toFixed(2)}x</div>
                  </td>

                  <td className="py-4 px-4 align-top text-right font-mono tabular-nums">
                    <div className="text-sm font-bold text-slate-900">{w.setsPerExercise} séries</div>
                    <div className="text-slate-600 mt-0.5">Irradiação: {w.irradiationIntensityPct}% CVM</div>
                  </td>

                  <td className="py-4 px-4 align-top font-mono">
                    <div className="text-slate-900">M: {w.respiratoryCadenceMorning}</div>
                    <div className="text-slate-600 mt-1">N: {w.respiratoryCadenceEvening}</div>
                  </td>

                  <td className="py-4 px-4 align-top">
                    <div className="text-slate-900 font-medium">{w.endRangeIsometricProtocol}</div>
                    <div className="font-mono text-amber-800 mt-1">Desconforto: {w.targetDiscomfortRange}</div>
                  </td>

                  <td className="py-4 px-4 align-top text-slate-700">{w.progressionCriteria}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Interactive Autoregulation Simulator (Acute Stiffness vs Stagnation) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-white border border-slate-200 p-6 space-y-5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-600">
            <Sliders className="w-4 h-4 text-teal-700" />
            <span>SIMULADOR DE AUTORREGULAÇÃO DIÁRIA (RIGIDEZ AGUDA OU ESTAGNAÇÃO)</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Calibrar Variáveis do Dia para a Semana {selectedWeek}
          </h3>

          {/* Week Selector Buttons */}
          <div>
            <span className="block text-xs font-semibold text-slate-700 mb-2">Semana Ativa do Mesociclo</span>
            <div className="grid grid-cols-4 gap-2">
              {([1, 2, 3, 4] as const).map((wk) => (
                <button
                  key={wk}
                  type="button"
                  onClick={() => setSelectedWeek(wk)}
                  className={`py-2 text-xs font-mono font-semibold border transition-colors ${
                    selectedWeek === wk
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Sem {wk}
                </button>
              ))}
            </div>
          </div>

          {/* Morning Stiffness Slider */}
          <div>
            <div className="flex justify-between text-xs">
              <label htmlFor="stiffness-slider" className="font-semibold text-slate-700">
                Nível de Rigidez Matinal ao Acordar (1–10)
              </label>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{morningStiffnessInput} / 10</span>
            </div>
            <input
              id="stiffness-slider"
              type="range"
              min={1}
              max={10}
              value={morningStiffnessInput}
              onChange={(e) => setMorningStiffnessInput(Number(e.target.value))}
              className="w-full mt-2 accent-slate-900"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-0.5">
              <span>1 (Fluidez Total)</span>
              <span>7+ (Gatilho de Redução Protetora)</span>
              <span>10 (Bloqueio)</span>
            </div>
          </div>

          {/* Acute Pain Slider */}
          <div>
            <div className="flex justify-between text-xs">
              <label htmlFor="pain-slider" className="font-semibold text-slate-700">
                Dor ou Tensão Articular/Miofascial Máxima Hoje (0–10)
              </label>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{acutePainInput} / 10</span>
            </div>
            <input
              id="pain-slider"
              type="range"
              min={0}
              max={10}
              value={acutePainInput}
              onChange={(e) => setAcutePainInput(Number(e.target.value))}
              className="w-full mt-2 accent-slate-900"
            />
          </div>

          {/* Stagnant Days Slider */}
          <div>
            <div className="flex justify-between text-xs">
              <label htmlFor="stagnant-slider" className="font-semibold text-slate-700">
                Dias Consecutivos em Platô de ADM (Sem Ganho Goniométrico)
              </label>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{daysStagnantInput} dias</span>
            </div>
            <input
              id="stagnant-slider"
              type="range"
              min={0}
              max={14}
              value={daysStagnantInput}
              onChange={(e) => setDaysStagnantInput(Number(e.target.value))}
              className="w-full mt-2 accent-slate-900"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-0.5">
              <span>0 dias</span>
              <span>5+ dias (Gatilho Quebra de Platô)</span>
              <span>14 dias</span>
            </div>
          </div>

          {/* Quick Scenario Presets */}
          <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedWeek(2);
                setMorningStiffnessInput(8);
                setAcutePainInput(7);
                setDaysStagnantInput(1);
              }}
              className="px-3 py-1.5 text-xs font-mono border border-rose-300 text-rose-800 bg-rose-50 hover:bg-rose-100"
            >
              Simular Crise de Rigidez Aguda (EVA 8/10)
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedWeek(3);
                setMorningStiffnessInput(3);
                setAcutePainInput(2);
                setDaysStagnantInput(7);
              }}
              className="px-3 py-1.5 text-xs font-mono border border-amber-300 text-amber-900 bg-amber-50 hover:bg-amber-100"
            >
              Simular Estagnação de ADM (7 Dias em Platô)
            </button>
          </div>
        </div>

        {/* Autoregulation Output Panel */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="text-xs font-mono uppercase text-slate-500">
                  RESULTADO DO ALGORITMO DE AUTORREGULAÇÃO BIOMECÂNICA
                </div>
                <div className="text-lg font-bold text-slate-900 mt-1 flex items-center gap-2">
                  {autoregulationResult.status === 'REDUCAO_AGUDA_PROTECTIVA' ? (
                    <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                  ) : autoregulationResult.status === 'QUEBRA_PLATÔ_DENSIDADE' ? (
                    <Activity className="w-5 h-5 text-amber-600 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0" />
                  )}
                  <span>{autoregulationResult.statusLabel}</span>
                </div>
              </div>
              <div className="text-right font-mono">
                <div className="text-xs text-slate-500">FATOR DE CARGA</div>
                <div className="text-xl font-bold text-slate-900 tabular-nums">
                  {autoregulationResult.progressionFactor}x
                </div>
              </div>
            </div>

            {/* Recalculated Parameters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="bg-slate-50 border border-slate-200 p-4">
                <div className="text-[11px] font-mono text-slate-500 uppercase">TUT Recalibrado</div>
                <div className="text-2xl font-mono font-bold text-slate-900 tabular-nums mt-1">
                  {autoregulationResult.adjustedTutSeconds}s
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                  Base Sem {selectedWeek}: {activeWeekSpec.baseTutSecondsPerSet}s
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4">
                <div className="text-[11px] font-mono text-slate-500 uppercase">Séries por Alvo</div>
                <div className="text-2xl font-mono font-bold text-slate-900 tabular-nums mt-1">
                  {autoregulationResult.adjustedSets} séries
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                  Base Sem {selectedWeek}: {activeWeekSpec.setsPerExercise} séries
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4">
                <div className="text-[11px] font-mono text-slate-500 uppercase">Irradiação Neural</div>
                <div className="text-2xl font-mono font-bold text-teal-700 tabular-nums mt-1">
                  {autoregulationResult.adjustedIrradiationPct}%
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-0.5">Contração Isométrica</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4">
                <div className="text-[11px] font-mono text-slate-500 uppercase">Teto de Desconforto</div>
                <div className="text-xs font-mono font-bold text-slate-900 mt-1.5">
                  {autoregulationResult.maxAllowedDiscomfort}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="bg-slate-50 border border-slate-200 p-4">
                <div className="text-xs font-mono uppercase text-slate-500">
                  CADÊNCIA RESPIRATÓRIA PRESCRITA PARA O ESTADO ATUAL
                </div>
                <div className="text-sm font-mono font-bold text-slate-900 mt-1">
                  {autoregulationResult.recommendedCadence}
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4">
                <div className="text-xs font-mono uppercase text-slate-500">
                  DIRETIVA DE MODIFICAÇÃO BIOMECÂNICA IMEDIATA
                </div>
                <p className="text-xs text-slate-800 mt-1.5 leading-relaxed">
                  {autoregulationResult.biomechanicalAdjustmentDirective}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <span>Regra de Segurança: Nunca avançar para a Semana 3 (PAILs/RAILs 70%) se EVA articular &gt; 5/10.</span>
            <span className="font-mono text-slate-900 flex items-center gap-1">
              <span>Auditado em Tempo Real</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
