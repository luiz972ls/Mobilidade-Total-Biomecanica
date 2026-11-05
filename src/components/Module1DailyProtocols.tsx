import React, { useState, useEffect } from 'react';
import { DAILY_PROTOCOLS_DATA, ExerciseProtocolItem } from '../data/protocolsData';
import { Play, Pause, RotateCcw, CheckSquare, Square, ChevronDown, ChevronUp, ShieldAlert, Wind, Compass } from 'lucide-react';

interface Module1Props {
  completedExerciseIds: string[];
  onToggleExerciseComplete: (id: string) => void;
  onLogCompletedShift: (shift: 'MANHA' | 'NOITE', adherencePct: number) => void;
  onInspectMolecularTarget: (symbol: string) => void;
}

export const Module1DailyProtocols: React.FC<Module1Props> = ({
  completedExerciseIds,
  onToggleExerciseComplete,
  onLogCompletedShift,
  onInspectMolecularTarget
}) => {
  const [selectedShift, setSelectedShift] = useState<'MANHA' | 'NOITE'>('MANHA');
  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>('mat-01');
  const [searchQuery, setSearchQuery] = useState('');

  // Guided Respiratory & TUT Timer State
  const [activeTimerExercise, setActiveTimerExercise] = useState<ExerciseProtocolItem>(DAILY_PROTOCOLS_DATA[0]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTutSec, setElapsedTutSec] = useState(0);

  const shiftExercises = DAILY_PROTOCOLS_DATA.filter((item) => {
    const matchesShift = item.shift === selectedShift;
    const matchesSearch =
      !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.anatomicalTarget.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clinicalConcept.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesShift && matchesSearch;
  });

  const allShiftExercises = DAILY_PROTOCOLS_DATA.filter((i) => i.shift === selectedShift);
  const completedInShiftCount = allShiftExercises.filter((i) => completedExerciseIds.includes(i.id)).length;
  const shiftAdherencePct =
    allShiftExercises.length > 0 ? Math.round((completedInShiftCount / allShiftExercises.length) * 100) : 0;
  const totalShiftMinutes = Math.round(
    allShiftExercises.reduce((acc, item) => acc + item.tutSeconds * item.sets, 0) / 60
  );

  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = window.setInterval(() => {
      setElapsedTutSec((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isTimerRunning]);

  // Compute current respiratory phase from elapsed seconds
  const resp = activeTimerExercise.respiratoryPattern;
  const cycleTotalSec = Math.max(1, resp.inhaleSec + resp.holdFullSec + resp.exhaleSec + resp.holdEmptySec);
  const secInCycle = elapsedTutSec % cycleTotalSec;

  let currentRespPhase = 'INSPIRAÇÃO NASAL 360°';
  let phaseRemainingSec = resp.inhaleSec - secInCycle;
  if (secInCycle >= resp.inhaleSec && secInCycle < resp.inhaleSec + resp.holdFullSec) {
    currentRespPhase = 'APNEIA CHEIA (PRESSURIZAÇÃO / PIA)';
    phaseRemainingSec = resp.inhaleSec + resp.holdFullSec - secInCycle;
  } else if (
    secInCycle >= resp.inhaleSec + resp.holdFullSec &&
    secInCycle < resp.inhaleSec + resp.holdFullSec + resp.exhaleSec
  ) {
    currentRespPhase = 'EXPIRAÇÃO CONTROLADA (RELAXAMENTO / GANHO ADM)';
    phaseRemainingSec = resp.inhaleSec + resp.holdFullSec + resp.exhaleSec - secInCycle;
  } else if (secInCycle >= resp.inhaleSec + resp.holdFullSec + resp.exhaleSec) {
    currentRespPhase = 'APNEIA VAZIA (COSTELAS BAIXAS)';
    phaseRemainingSec = cycleTotalSec - secInCycle;
  }

  const handleSelectTimerExercise = (item: ExerciseProtocolItem) => {
    setActiveTimerExercise(item);
    setElapsedTutSec(0);
    setIsTimerRunning(true);
  };

  return (
    <div className="space-y-8">
      {/* Header & Shift Selector */}
      <div className="bg-white border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-b border-slate-200 pb-6">
          <div>
            <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
              01. MÓDULO 1 · PRESCRIÇÃO BIOMECÂNICA DIÁRIA AUDITÁVEL
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Protocolos Diários: Manhã (Ativação & Hidratação) e Noite (Downregulation Vagal)
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Tradução clínica de ajustes articulares em técnicas autoguiadas de Auto-Mobilização com Movimento
              (Conceitos Mulligan MWM/SNAG e Maitland), descompressão axial ativa (ELDOA), drenagem linfática
              craniofacial (Vodder) e facilitação neuromuscular proprioceptiva (FNP CRAC).
            </p>
          </div>

          {/* Interactive Shift Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 self-start">
            <button
              type="button"
              onClick={() => {
                setSelectedShift('MANHA');
                setExpandedExerciseId('mat-01');
              }}
              className={`px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                selectedShift === 'MANHA'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Protocolo Matinal (15–20 min)
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedShift('NOITE');
                setExpandedExerciseId('not-01');
              }}
              className={`px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                selectedShift === 'NOITE'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Protocolo Noturno (15–20 min)
            </button>
          </div>
        </div>

        {/* Shift Summary Telemetry & Pacer Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6">
          <div>
            <div className="text-xs font-mono text-slate-500 uppercase">Foco Fisiológico do Turno</div>
            <div className="text-sm font-semibold text-slate-900 mt-1">
              {selectedShift === 'MANHA'
                ? 'Hidratação Fascial, Drenagem Craniofacial, ZOA 360° & Descompressão Axial'
                : 'Downregulation Parassimpática Vagal, Pin & Stretch Miofascial & Tração SIJ/FNP'}
            </div>
          </div>

          <div>
            <div className="text-xs font-mono text-slate-500 uppercase">Tempo Total Sob Tensão (Volume)</div>
            <div className="text-2xl font-mono font-bold text-slate-900 tabular-nums mt-1">
              {totalShiftMinutes} <span className="text-xs font-normal text-slate-500">MINUTOS PRESCRITOS</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-mono text-slate-500 uppercase">Adesão da Sessão Atual</div>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-2xl font-mono font-bold text-teal-700 tabular-nums">{shiftAdherencePct}%</span>
              <span className="text-xs font-mono text-slate-500 tabular-nums">
                ({completedInShiftCount}/{allShiftExercises.length} blocos concluídos)
              </span>
            </div>
          </div>

          <div className="flex items-center justify-start md:justify-end">
            <button
              type="button"
              onClick={() => onLogCompletedShift(selectedShift, shiftAdherencePct || 100)}
              className="px-4 py-2.5 text-xs font-semibold bg-teal-700 text-white hover:bg-teal-800 transition-colors whitespace-nowrap shrink-0"
            >
              Registrar Turno no Dashboard ({selectedShift === 'MANHA' ? 'Manhã' : 'Noite'})
            </button>
          </div>
        </div>
      </div>

      {/* Live Biomechanical Cadence & Respiratory Pacer Console */}
      <div className="bg-white border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-700 uppercase">
              <Wind className="w-4 h-4" />
              <span>MARCAPASSO BIOMECÂNICO DE CADÊNCIA RESPIRATÓRIA & TEMPO SOB TENSÃO (TUT)</span>
            </div>
            <div className="text-base font-bold text-slate-900">{activeTimerExercise.name}</div>
            <div className="text-xs text-slate-600">
              Padrão Ativo: <span className="font-mono font-semibold text-slate-900">{resp.cadenceLabel}</span> ·{' '}
              {resp.biomechanicalRationale}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 min-w-[230px]">
              <div className="text-[11px] font-mono text-slate-500 uppercase">{currentRespPhase}</div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-xl font-mono font-bold text-slate-900 tabular-nums">
                  {phaseRemainingSec}s <span className="text-xs font-normal text-slate-500">fase</span>
                </span>
                <span className="text-xs font-mono text-teal-700 tabular-nums">
                  TUT: {elapsedTutSec}s / {activeTimerExercise.tutSeconds}s
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={isTimerRunning ? 'Pausar temporizador biomecânico' : 'Iniciar temporizador biomecânico'}
                onClick={() => setIsTimerRunning((prev) => !prev)}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isTimerRunning ? 'Pausar Cadência' : 'Iniciar Cadência'}</span>
              </button>
              <button
                type="button"
                aria-label="Zerar temporizador biomecânico"
                onClick={() => {
                  setIsTimerRunning(false);
                  setElapsedTutSec(0);
                }}
                className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Zerar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Input */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-sm font-semibold text-slate-900">
          Ficha Técnica Estruturada ({shiftExercises.length} Protocolos Sequenciais)
        </div>
        <div className="w-full sm:w-80">
          <label htmlFor="protocol-filter-input" className="sr-only">
            Filtrar exercício por músculo, articulação ou técnica
          </label>
          <input
            id="protocol-filter-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrar por músculo, ATM, psoas, Mulligan..."
            className="w-full px-3 py-2 text-xs bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900"
          />
        </div>
      </div>

      {/* Dense Master Protocol Table */}
      <div className="bg-white border border-slate-200 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-mono uppercase text-slate-600">
              <th className="py-3 px-4 w-12">Status</th>
              <th className="py-3 px-4 min-w-[240px]">Exercício / Conceito Clínico</th>
              <th className="py-3 px-4 min-w-[220px]">Alvo Anatômico & Trilho Fascial</th>
              <th className="py-3 px-4 min-w-[240px]">Vetor de Força & Ancoragem</th>
              <th className="py-3 px-4 min-w-[190px]">Padrão Respiratório (IN:HOLD:EX)</th>
              <th className="py-3 px-4 min-w-[170px] text-right">TUT / Volume / Tensão</th>
              <th className="py-3 px-4 w-28 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs">
            {shiftExercises.map((item) => {
              const isCompleted = completedExerciseIds.includes(item.id);
              const isExpanded = expandedExerciseId === item.id;
              const geneSymbol = item.molecularMechanobiologyTag.split('/')[0].trim().split(' ')[0];

              return (
                <React.Fragment key={item.id}>
                  <tr className={`hover:bg-slate-50/80 transition-colors ${isCompleted ? 'bg-teal-50/30' : ''}`}>
                    <td className="py-4 px-4 align-top">
                      <button
                        type="button"
                        aria-label={`Marcar ${item.name} como concluído`}
                        onClick={() => onToggleExerciseComplete(item.id)}
                        className="text-slate-700 hover:text-teal-700 transition-colors"
                      >
                        {isCompleted ? (
                          <CheckSquare className="w-4 h-4 text-teal-700" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                    </td>

                    <td className="py-4 px-4 align-top">
                      <div className="text-[11px] font-mono text-teal-700">{item.blockTitle}</div>
                      <div className="font-bold text-slate-900 mt-0.5 text-sm">{item.name}</div>
                      <div className="text-slate-500 mt-1">{item.clinicalConcept}</div>
                    </td>

                    <td className="py-4 px-4 align-top">
                      <div className="text-slate-900 font-medium">{item.anatomicalTarget}</div>
                      <div className="text-slate-500 mt-1">
                        Trilho: <span className="text-slate-700">{item.fascialChain}</span>
                      </div>
                      <div className="mt-1.5">
                        <button
                          type="button"
                          onClick={() => onInspectMolecularTarget(geneSymbol)}
                          className="text-[11px] font-mono text-blue-700 hover:underline text-left"
                        >
                          Alvo Molecular: {item.molecularMechanobiologyTag} →
                        </button>
                      </div>
                    </td>

                    <td className="py-4 px-4 align-top">
                      <div className="text-slate-800">{item.forceVector}</div>
                      <div className="text-slate-500 mt-1">
                        <span className="font-semibold text-slate-700">Ancoragem:</span> {item.anchorPoints}
                      </div>
                    </td>

                    <td className="py-4 px-4 align-top">
                      <div className="font-mono font-semibold text-slate-900 tabular-nums">
                        {item.respiratoryPattern.cadenceLabel}
                      </div>
                      <div className="text-slate-500 mt-1">{item.respiratoryPattern.biomechanicalRationale}</div>
                    </td>

                    <td className="py-4 px-4 align-top text-right font-mono tabular-nums">
                      <div className="text-sm font-bold text-slate-900">
                        {item.sets}x {item.tutSeconds}s TUT
                      </div>
                      <div className="text-slate-600 mt-0.5">{item.repsOrCycles}</div>
                      <div className="text-slate-500 mt-0.5">Cadência: {item.executionCadence}</div>
                      <div className="text-amber-700 font-semibold mt-1">EVA Alvo: {item.discomfortScaleTarget}</div>
                    </td>

                    <td className="py-4 px-4 align-top text-right">
                      <div className="flex flex-col items-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setExpandedExerciseId(isExpanded ? null : item.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold border border-slate-300 text-slate-800 hover:bg-slate-100 whitespace-nowrap shrink-0"
                        >
                          <span>{isExpanded ? 'Ocultar Mecânica' : 'Passo a Passo'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelectTimerExercise(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono text-teal-700 hover:bg-teal-50 whitespace-nowrap shrink-0"
                        >
                          <Play className="w-3 h-3" />
                          <span>Guiar TUT</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Step-by-Step Biomechanical Execution & Contraindications */}
                  {isExpanded && (
                    <tr className="bg-slate-50/90 border-b border-slate-200">
                      <td colSpan={7} className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="lg:col-span-2 space-y-3">
                            <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-700 font-semibold">
                              <Compass className="w-4 h-4 text-teal-700" />
                              <span>PROTOCOLO DE EXECUÇÃO CINEMÁTICA PASSO A PASSO</span>
                            </div>
                            <ol className="space-y-2 text-xs text-slate-800 leading-relaxed">
                              {item.stepByStepExecution.map((step, idx) => (
                                <li key={idx} className="bg-white border border-slate-200 p-3">
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>

                          <div className="space-y-4">
                            <div className="bg-white border border-slate-200 p-4">
                              <div className="text-xs font-mono uppercase text-slate-500">
                                META DE AMPLITUDE DE MOVIMENTO (ADM AUDITÁVEL)
                              </div>
                              <div className="text-sm font-bold text-slate-900 mt-1 font-mono tabular-nums">
                                {item.targetAdmMetric}
                              </div>
                            </div>

                            <div className="bg-amber-50/60 border border-amber-200 p-4">
                              <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-amber-900 font-semibold">
                                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                                <span>SEGURANÇA ARTICULAR & CONTRAINDICAÇÕES</span>
                              </div>
                              <p className="text-xs text-amber-950 mt-1.5 leading-relaxed">
                                {item.contraindicationsAndSafety}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
