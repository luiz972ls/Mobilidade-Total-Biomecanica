import React, { useState } from 'react';
import { DailyAuditLog, calculateAuditKPIs } from '../utils/biomechanicsMath';
import { MASTER_BODY_CATALOG, DATABASE_SCHEMA_SPEC, BodyRegionCatalogItem } from '../data/periodizationAndCatalogData';
import { PlusCircle, Download, Database, Activity, Search, AlertCircle } from 'lucide-react';

interface Module3Props {
  logs: DailyAuditLog[];
  onAddLog: (newLog: DailyAuditLog) => void;
  onInspectMolecularTarget: (symbol: string) => void;
  showNewEntryModalInitially?: boolean;
}

export const Module3AuditDashboardAndCatalog: React.FC<Module3Props> = ({
  logs,
  onAddLog,
  onInspectMolecularTarget,
  showNewEntryModalInitially = false
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'DASHBOARD_LOGS' | 'CATALOGO_MESTRE' | 'SCHEMA_SQL'>('DASHBOARD_LOGS');
  const [regionFilter, setRegionFilter] = useState<string>('ALL');
  const [catalogSearch, setCatalogSearch] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(showNewEntryModalInitially);
  const [formError, setFormError] = useState<string>('');

  // Form state for adding a new Daily Audit Log
  const [logDate, setLogDate] = useState<string>('2026-11-05');
  const [shift, setShift] = useState<'MANHA' | 'NOITE' | 'AMBOS'>('AMBOS');
  const [adherencePct, setAdherencePct] = useState<string>('100');
  const [morningStiffness, setMorningStiffness] = useState<string>('2');
  const [sleepQuality, setSleepQuality] = useState<string>('9');
  const [ankleLeftCm, setAnkleLeftCm] = useState<string>('11.2');
  const [ankleRightCm, setAnkleRightCm] = useState<string>('12.2');
  const [hipLeftDeg, setHipLeftDeg] = useState<string>('38');
  const [hipRightDeg, setHipRightDeg] = useState<string>('41');
  const [thoracicLeftDeg, setThoracicLeftDeg] = useState<string>('54');
  const [thoracicRightDeg, setThoracicRightDeg] = useState<string>('56');
  const [tmjMm, setTmjMm] = useState<string>('44');
  const [schoberCm, setSchoberCm] = useState<string>('5.6');
  const [cervicalPain, setCervicalPain] = useState<string>('1');
  const [lumbarPain, setLumbarPain] = useState<string>('2');
  const [notes, setNotes] = useState<string>('');

  const kpis = calculateAuditKPIs(logs);
  const sortedLogs = [...logs].sort((a, b) => a.date.localeCompare(b.date));
  const latestLog = sortedLogs[sortedLogs.length - 1];

  const filteredCatalog: BodyRegionCatalogItem[] = MASTER_BODY_CATALOG.filter((item) => {
    const matchesRegion = regionFilter === 'ALL' || item.regionCategory === regionFilter;
    const matchesQuery =
      !catalogSearch.trim() ||
      item.regionLabel.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      item.clinicalSyndromeOrSymptom.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      item.primaryCorrectiveExerciseName.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      item.primaryAnatomicalStructures.toLowerCase().includes(catalogSearch.toLowerCase());
    return matchesRegion && matchesQuery;
  });

  const handleCreateLog = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!logDate.trim()) {
      setFormError('Informe uma data válida (YYYY-MM-DD).');
      return;
    }
    const adh = Number(adherencePct);
    const stiff = Number(morningStiffness);
    const sleep = Number(sleepQuality);
    const aL = Number(ankleLeftCm);
    const aR = Number(ankleRightCm);
    const hL = Number(hipLeftDeg);
    const hR = Number(hipRightDeg);

    if (
      Number.isNaN(adh) ||
      adh < 0 ||
      adh > 100 ||
      Number.isNaN(stiff) ||
      stiff < 1 ||
      stiff > 10 ||
      Number.isNaN(aL) ||
      aL <= 0 ||
      Number.isNaN(hL) ||
      hL <= 0
    ) {
      setFormError('Verifique os valores numéricos: Adesão (0–100%), Rigidez (1–10) e Goniometria (> 0).');
      return;
    }

    const newEntry: DailyAuditLog = {
      id: `audit-${Date.now()}`,
      date: logDate,
      shift,
      adherencePct: adh,
      morningStiffness: stiff,
      sleepQuality: sleep,
      regionalPain: {
        craniofacialAtm: 1,
        cervicalSuboccipital: Number(cervicalPain) || 1,
        thoracicScapular: 1,
        upperLimbsWrists: 1,
        lumbarPelvicSij: Number(lumbarPain) || 2,
        hipKneeAnklePlantar: 1
      },
      romTests: {
        ankleDorsiflexionLeftCm: aL,
        ankleDorsiflexionRightCm: aR,
        hipInternalRotationLeftDeg: hL,
        hipInternalRotationRightDeg: hR,
        thoracicRotationLeftDeg: Number(thoracicLeftDeg) || 54,
        thoracicRotationRightDeg: Number(thoracicRightDeg) || 56,
        cervicalLateralFlexionLeftDeg: 44,
        cervicalLateralFlexionRightDeg: 45,
        tmjOpeningMm: Number(tmjMm) || 43,
        lumbarSchoberCm: Number(schoberCm) || 5.5
      },
      notes: notes.trim() || 'Aferição goniométrica registrada manualmente no painel de auditoria.'
    };

    onAddLog(newEntry);
    setIsFormOpen(false);
    setNotes('');
  };

  const handleExportCsv = () => {
    const headers = [
      'Data',
      'Turno',
      'Adesao_%',
      'Rigidez_Matinal_1_10',
      'Qualidade_Sono_1_10',
      'Dorsiflexao_Esq_cm',
      'Dorsiflexao_Dir_cm',
      'Rot_Interna_Quadril_Esq_deg',
      'Rot_Interna_Quadril_Dir_deg',
      'Rot_Toracica_Esq_deg',
      'Rot_Toracica_Dir_deg',
      'Abertura_ATM_mm',
      'Schober_Lombar_cm',
      'Observacoes'
    ];
    const rows = sortedLogs.map((l) => [
      l.date,
      l.shift,
      l.adherencePct,
      l.morningStiffness,
      l.sleepQuality,
      l.romTests.ankleDorsiflexionLeftCm,
      l.romTests.ankleDorsiflexionRightCm,
      l.romTests.hipInternalRotationLeftDeg,
      l.romTests.hipInternalRotationRightDeg,
      l.romTests.thoracicRotationLeftDeg,
      l.romTests.thoracicRotationRightDeg,
      l.romTests.tmjOpeningMm,
      l.romTests.lumbarSchoberCm,
      `"${l.notes.replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'mobilidade_total_auditoria.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Module Header & Sub-Navigation */}
      <div className="bg-white border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-b border-slate-200 pb-6">
          <div>
            <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
              03. MÓDULO 3 · ARQUITETURA DO DASHBOARD AUDITÁVEL, CATÁLOGO MESTRE & BANCO DE DADOS
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Telemetria Goniométrica, Catálogo Corretivo por Região & Esquema de Dados
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Auditoria quantitativa de Amplitude de Movimento (cm, graus, mm), rastreamento de assimetrias bilaterais
              e matriz de correlação sintoma-exercício-alvo molecular.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start">
            <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveSubTab('DASHBOARD_LOGS')}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  activeSubTab === 'DASHBOARD_LOGS' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                KPIs & Registro Diário ({logs.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveSubTab('CATALOGO_MESTRE')}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  activeSubTab === 'CATALOGO_MESTRE'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Catálogo Mestre Corporal (12)
              </button>
              <button
                type="button"
                onClick={() => setActiveSubTab('SCHEMA_SQL')}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  activeSubTab === 'SCHEMA_SQL' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Esquema de Tabelas (DDL)
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveSubTab('DASHBOARD_LOGS');
                setIsFormOpen((prev) => !prev);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-teal-700 text-white hover:bg-teal-800 transition-colors whitespace-nowrap shrink-0"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{isFormOpen ? 'Fechar Formulário' : 'Nova Aferição Diária'}</span>
            </button>
          </div>
        </div>

        {/* 4 Core KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          <div>
            <div className="text-xs font-mono text-slate-500 uppercase">Índice de Reprogramação Postural</div>
            <div className="text-3xl font-mono font-bold text-slate-900 tabular-nums mt-1">
              {kpis.posturalReprogrammingScore}
              <span className="text-xs font-normal text-slate-500 ml-1">/ 100 PTS</span>
            </div>
            <div className="text-xs font-mono text-teal-700 mt-1">
              ● Nominal · Adesão Média: {kpis.meanAdherencePct}%
            </div>
          </div>

          <div>
            <div className="text-xs font-mono text-slate-500 uppercase">Evolução da Rigidez Matinal (1–10)</div>
            <div className="text-3xl font-mono font-bold text-slate-900 tabular-nums mt-1">
              {kpis.morningStiffnessCurrent}
              <span className="text-xs font-normal text-slate-500 ml-1">ATUAL (INICIAL: {kpis.morningStiffnessInitial})</span>
            </div>
            <div className="text-xs font-mono text-emerald-700 mt-1 tabular-nums">
              DELTA: {kpis.morningStiffnessDelta} pontos em 30 dias
            </div>
          </div>

          <div>
            <div className="text-xs font-mono text-slate-500 uppercase">Dorsiflexão Talocrural (Knee-to-Wall)</div>
            <div className="text-3xl font-mono font-bold text-slate-900 tabular-nums mt-1">
              {kpis.ankleRomMeanCm}
              <span className="text-xs font-normal text-slate-500 ml-1">CM MÉDIA</span>
            </div>
            <div className="text-xs font-mono text-amber-800 mt-1 tabular-nums">
              ▲ Assimetria Esq/Dir: {kpis.ankleAsymmetryCm} cm (Alvo &lt; 1.0 cm)
            </div>
          </div>

          <div>
            <div className="text-xs font-mono text-slate-500 uppercase">Rotação Interna Quadril & ATM</div>
            <div className="text-3xl font-mono font-bold text-slate-900 tabular-nums mt-1">
              {kpis.hipInternalRotMeanDeg}°
              <span className="text-xs font-normal text-slate-500 ml-1">| ATM {kpis.tmjOpeningCurrentMm} MM</span>
            </div>
            <div className="text-xs font-mono text-slate-600 mt-1 tabular-nums">
              Schober Lombar: +{kpis.lumbarSchoberCurrentCm} cm (Alvo &gt;= 5.5 cm)
            </div>
          </div>
        </div>
      </div>

      {/* Interactive New Daily Log Form */}
      {isFormOpen && (
        <form onSubmit={handleCreateLog} className="bg-white border border-slate-900 p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              Registrar Nova Aferição Diária Goniométrica e Neurofisiológica
            </h3>
            <span className="text-xs font-mono text-slate-500">ATUALIZAÇÃO IMEDIATA DE GRÁFICOS & PROMPT MENSAL</span>
          </div>

          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-300 text-xs text-rose-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-700 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            <div>
              <label htmlFor="log-date" className="block font-semibold text-slate-700 mb-1">
                Data da Sessão
              </label>
              <input
                id="log-date"
                type="date"
                value={logDate}
                onChange={(e) => setLogDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 font-mono"
              />
            </div>

            <div>
              <label htmlFor="log-shift" className="block font-semibold text-slate-700 mb-1">
                Turno Executado
              </label>
              <select
                id="log-shift"
                value={shift}
                onChange={(e) => setShift(e.target.value as 'MANHA' | 'NOITE' | 'AMBOS')}
                className="w-full px-3 py-2 border border-slate-300 bg-white font-mono"
              >
                <option value="AMBOS">AMBOS (Manhã + Noite)</option>
                <option value="MANHA">MANHÃ (Ativação)</option>
                <option value="NOITE">NOITE (Vagal / FNP)</option>
              </select>
            </div>

            <div>
              <label htmlFor="log-adherence" className="block font-semibold text-slate-700 mb-1">
                Adesão Prescrita (%)
              </label>
              <input
                id="log-adherence"
                type="number"
                min={0}
                max={100}
                value={adherencePct}
                onChange={(e) => setAdherencePct(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 font-mono tabular-nums"
              />
            </div>

            <div>
              <label htmlFor="log-stiffness" className="block font-semibold text-slate-700 mb-1">
                Rigidez Matinal (1–10)
              </label>
              <input
                id="log-stiffness"
                type="number"
                min={1}
                max={10}
                value={morningStiffness}
                onChange={(e) => setMorningStiffness(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 font-mono tabular-nums"
              />
            </div>

            <div>
              <label htmlFor="log-sleep" className="block font-semibold text-slate-700 mb-1">
                Qualidade do Sono (1–10)
              </label>
              <input
                id="log-sleep"
                type="number"
                min={1}
                max={10}
                value={sleepQuality}
                onChange={(e) => setSleepQuality(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 font-mono tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-xs pt-2">
            <div>
              <label htmlFor="rom-ankle-l" className="block font-semibold text-slate-700 mb-1">
                Tornozelo Esq (cm)
              </label>
              <input
                id="rom-ankle-l"
                type="number"
                step="0.1"
                value={ankleLeftCm}
                onChange={(e) => setAnkleLeftCm(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 font-mono tabular-nums"
              />
            </div>
            <div>
              <label htmlFor="rom-ankle-r" className="block font-semibold text-slate-700 mb-1">
                Tornozelo Dir (cm)
              </label>
              <input
                id="rom-ankle-r"
                type="number"
                step="0.1"
                value={ankleRightCm}
                onChange={(e) => setAnkleRightCm(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 font-mono tabular-nums"
              />
            </div>
            <div>
              <label htmlFor="rom-hip-l" className="block font-semibold text-slate-700 mb-1">
                Quadril RI Esq (°)
              </label>
              <input
                id="rom-hip-l"
                type="number"
                value={hipLeftDeg}
                onChange={(e) => setHipLeftDeg(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 font-mono tabular-nums"
              />
            </div>
            <div>
              <label htmlFor="rom-hip-r" className="block font-semibold text-slate-700 mb-1">
                Quadril RI Dir (°)
              </label>
              <input
                id="rom-hip-r"
                type="number"
                value={hipRightDeg}
                onChange={(e) => setHipRightDeg(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 font-mono tabular-nums"
              />
            </div>
            <div>
              <label htmlFor="rom-thor-l" className="block font-semibold text-slate-700 mb-1">
                Torácica Esq (°)
              </label>
              <input
                id="rom-thor-l"
                type="number"
                value={thoracicLeftDeg}
                onChange={(e) => setThoracicLeftDeg(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 font-mono tabular-nums"
              />
            </div>
            <div>
              <label htmlFor="rom-thor-r" className="block font-semibold text-slate-700 mb-1">
                Torácica Dir (°)
              </label>
              <input
                id="rom-thor-r"
                type="number"
                value={thoracicRightDeg}
                onChange={(e) => setThoracicRightDeg(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 font-mono tabular-nums"
              />
            </div>
            <div>
              <label htmlFor="rom-tmj" className="block font-semibold text-slate-700 mb-1">
                ATM Abertura (mm)
              </label>
              <input
                id="rom-tmj"
                type="number"
                value={tmjMm}
                onChange={(e) => setTmjMm(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 font-mono tabular-nums"
              />
            </div>
            <div>
              <label htmlFor="rom-schober" className="block font-semibold text-slate-700 mb-1">
                Schober Lombar (cm)
              </label>
              <input
                id="rom-schober"
                type="number"
                step="0.1"
                value={schoberCm}
                onChange={(e) => setSchoberCm(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 font-mono tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label htmlFor="pain-cervical" className="block font-semibold text-slate-700 mb-1">
                Dor/Tensão Cervical & Suboccipital (0–10)
              </label>
              <input
                id="pain-cervical"
                type="number"
                min={0}
                max={10}
                value={cervicalPain}
                onChange={(e) => setCervicalPain(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 font-mono tabular-nums"
              />
            </div>
            <div>
              <label htmlFor="pain-lumbar" className="block font-semibold text-slate-700 mb-1">
                Dor/Tensão Lombo-Pélvica & SIJ (0–10)
              </label>
              <input
                id="pain-lumbar"
                type="number"
                min={0}
                max={10}
                value={lumbarPain}
                onChange={(e) => setLumbarPain(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 font-mono tabular-nums"
              />
            </div>
            <div>
              <label htmlFor="log-notes" className="block font-semibold text-slate-700 mb-1">
                Observações Biomecânicas da Sessão
              </label>
              <input
                id="log-notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Destravamento audível indolor em SIJ direita após MET..."
                className="w-full px-3 py-2 border border-slate-300"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 text-xs font-semibold border border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800"
            >
              Salvar Aferição Auditável
            </button>
          </div>
        </form>
      )}

      {/* SUBTAB 1: DASHBOARD CHARTS & LOGS TABLE */}
      {activeSubTab === 'DASHBOARD_LOGS' && (
        <div className="space-y-8">
          {/* Two Precision SVG Visual KPI Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Rigidez Matinal vs Qualidade do Sono Vagal (SVG Curve) */}
            <div className="bg-white border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-mono text-slate-500 uppercase">
                    CURVA DE CONVERGÊNCIA NEUROFISIOLÓGICA (30 DIAS)
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                    Queda da Rigidez Matinal (1–10) vs. Ganho de Recuperação Vagal / Sono (1–10)
                  </h3>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                  <span className="text-rose-700 whitespace-nowrap shrink-0">● Rigidez Matinal</span>
                  <span className="text-teal-700 whitespace-nowrap shrink-0">--- Sono Vagal</span>
                </div>
              </div>

              <div className="w-full overflow-x-auto">
                <svg viewBox="0 0 520 200" className="w-full h-48 border border-slate-100 bg-slate-50/50">
                  {/* Horizontal Grid Lines */}
                  {[2, 4, 6, 8, 10].map((val) => {
                    const y = 180 - (val / 10) * 150;
                    return (
                      <g key={val}>
                        <line x1={40} y1={y} x2={490} y2={y} stroke="#E2E8F0" strokeDasharray="3 3" />
                        <text x={12} y={y + 4} className="text-[10px] fill-slate-400 font-mono">
                          {val}/10
                        </text>
                      </g>
                    );
                  })}

                  {/* Plot Lines */}
                  {sortedLogs.length > 1 && (
                    <>
                      {/* Stiffness Solid Line */}
                      <polyline
                        fill="none"
                        stroke="#BE123C"
                        strokeWidth="2.5"
                        points={sortedLogs
                          .map((l, idx) => {
                            const x = 60 + (idx / (sortedLogs.length - 1)) * 410;
                            const y = 180 - (l.morningStiffness / 10) * 150;
                            return `${x},${y}`;
                          })
                          .join(' ')}
                      />
                      {/* Sleep Quality Dashed Line */}
                      <polyline
                        fill="none"
                        stroke="#0F766E"
                        strokeWidth="2.5"
                        strokeDasharray="6 4"
                        points={sortedLogs
                          .map((l, idx) => {
                            const x = 60 + (idx / (sortedLogs.length - 1)) * 410;
                            const y = 180 - (l.sleepQuality / 10) * 150;
                            return `${x},${y}`;
                          })
                          .join(' ')}
                      />
                    </>
                  )}

                  {/* Data Nodes */}
                  {sortedLogs.map((l, idx) => {
                    const x = sortedLogs.length > 1 ? 60 + (idx / (sortedLogs.length - 1)) * 410 : 260;
                    const yStiff = 180 - (l.morningStiffness / 10) * 150;
                    const ySleep = 180 - (l.sleepQuality / 10) * 150;
                    return (
                      <g key={l.id}>
                        <circle cx={x} cy={yStiff} r={4} fill="#BE123C" />
                        <circle cx={x} cy={ySleep} r={4} fill="#0F766E" />
                        <text x={x - 18} y={195} className="text-[9px] fill-slate-500 font-mono">
                          {l.date.slice(5)}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Chart 2: Bilateral Goniometric Asymmetry & Target Audit */}
            <div className="bg-white border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-mono text-slate-500 uppercase">
                    AUDITORIA DE SIMETRIA BILATERAL & ALVO CLÍNICO (ÚLTIMA AFERIÇÃO)
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                    Comparativo Hemicorpo Esquerdo vs. Direito vs. Norma Biomecânica
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-500">META = 100%</span>
              </div>

              {latestLog && (
                <div className="space-y-4 text-xs font-mono tabular-nums">
                  {/* Ankle Dorsiflexion */}
                  <div>
                    <div className="flex justify-between text-slate-800">
                      <span className="font-sans font-semibold">Dorsiflexão Tornozelo (Alvo &gt;= 12.0 cm)</span>
                      <span>
                        Esq: {latestLog.romTests.ankleDorsiflexionLeftCm} cm · Dir:{' '}
                        {latestLog.romTests.ankleDorsiflexionRightCm} cm
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                      <div className="bg-slate-100 h-3 overflow-hidden">
                        <div
                          className="bg-amber-600 h-full"
                          style={{
                            width: `${Math.min(100, (latestLog.romTests.ankleDorsiflexionLeftCm / 12) * 100)}%`
                          }}
                        />
                      </div>
                      <div className="bg-slate-100 h-3 overflow-hidden">
                        <div
                          className="bg-teal-700 h-full"
                          style={{
                            width: `${Math.min(100, (latestLog.romTests.ankleDorsiflexionRightCm / 12) * 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hip Internal Rotation */}
                  <div>
                    <div className="flex justify-between text-slate-800">
                      <span className="font-sans font-semibold">Rotação Interna Quadril (Alvo &gt;= 40.0°)</span>
                      <span>
                        Esq: {latestLog.romTests.hipInternalRotationLeftDeg}° · Dir:{' '}
                        {latestLog.romTests.hipInternalRotationRightDeg}°
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                      <div className="bg-slate-100 h-3 overflow-hidden">
                        <div
                          className="bg-amber-600 h-full"
                          style={{
                            width: `${Math.min(100, (latestLog.romTests.hipInternalRotationLeftDeg / 40) * 100)}%`
                          }}
                        />
                      </div>
                      <div className="bg-slate-100 h-3 overflow-hidden">
                        <div
                          className="bg-teal-700 h-full"
                          style={{
                            width: `${Math.min(100, (latestLog.romTests.hipInternalRotationRightDeg / 40) * 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Thoracic Rotation */}
                  <div>
                    <div className="flex justify-between text-slate-800">
                      <span className="font-sans font-semibold">Rotação Torácica Bloqueada (Alvo &gt;= 55.0°)</span>
                      <span>
                        Esq: {latestLog.romTests.thoracicRotationLeftDeg}° · Dir:{' '}
                        {latestLog.romTests.thoracicRotationRightDeg}°
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                      <div className="bg-slate-100 h-3 overflow-hidden">
                        <div
                          className="bg-blue-700 h-full"
                          style={{
                            width: `${Math.min(100, (latestLog.romTests.thoracicRotationLeftDeg / 55) * 100)}%`
                          }}
                        />
                      </div>
                      <div className="bg-slate-100 h-3 overflow-hidden">
                        <div
                          className="bg-teal-700 h-full"
                          style={{
                            width: `${Math.min(100, (latestLog.romTests.thoracicRotationRightDeg / 55) * 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* TMJ & Schober */}
                  <div className="pt-2 border-t border-slate-200 flex flex-wrap justify-between gap-2 text-slate-700">
                    <span>Abertura Interincisal ATM: {latestLog.romTests.tmjOpeningMm} mm (Meta &gt;= 42 mm)</span>
                    <span>Schober Lombar L1-S1: +{latestLog.romTests.lumbarSchoberCm} cm (Meta &gt;= +5.5 cm)</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Historical Daily Audit Log Table */}
          <div className="bg-white border border-slate-200 overflow-x-auto">
            <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Planilha Mestra de Auditoria Diária (Goniometria, Rigidez & Dor Regional)
                </h3>
                <p className="text-xs text-slate-500">
                  Dados estruturados prontos para exportação e alimentar o Prompt de Fechamento Mensal (Módulo 4).
                </p>
              </div>
              <button
                type="button"
                onClick={handleExportCsv}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold border border-slate-300 text-slate-800 hover:bg-slate-100 self-start"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CSV</span>
              </button>
            </div>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-mono uppercase text-slate-600">
                  <th className="py-3 px-3">Data / Turno</th>
                  <th className="py-3 px-3 text-right">Adesão</th>
                  <th className="py-3 px-3 text-right">Rigidez / Sono</th>
                  <th className="py-3 px-3 text-right">Tornozelo E/D (cm)</th>
                  <th className="py-3 px-3 text-right">Quadril RI E/D (°)</th>
                  <th className="py-3 px-3 text-right">Torácica E/D (°)</th>
                  <th className="py-3 px-3 text-right">ATM / Schober</th>
                  <th className="py-3 px-3 text-right">Dor Cerv / Lomb</th>
                  <th className="py-3 px-4 min-w-[240px]">Notas Clínicas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs font-mono tabular-nums">
                {sortedLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{log.date}</div>
                      <div className="text-[11px] text-slate-500">{log.shift}</div>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-teal-700">{log.adherencePct}%</td>
                    <td className="py-3 px-3 text-right">
                      <span className="text-rose-700 font-semibold">{log.morningStiffness}/10</span> ·{' '}
                      <span className="text-teal-700">{log.sleepQuality}/10</span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      {log.romTests.ankleDorsiflexionLeftCm} / {log.romTests.ankleDorsiflexionRightCm} cm
                    </td>
                    <td className="py-3 px-3 text-right">
                      {log.romTests.hipInternalRotationLeftDeg}° / {log.romTests.hipInternalRotationRightDeg}°
                    </td>
                    <td className="py-3 px-3 text-right">
                      {log.romTests.thoracicRotationLeftDeg}° / {log.romTests.thoracicRotationRightDeg}°
                    </td>
                    <td className="py-3 px-3 text-right">
                      {log.romTests.tmjOpeningMm} mm · +{log.romTests.lumbarSchoberCm} cm
                    </td>
                    <td className="py-3 px-3 text-right">
                      C:{log.regionalPain.cervicalSuboccipital} · L:{log.regionalPain.lumbarPelvicSij}
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-700">{log.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 2: MASTER BODY REGION CATALOG */}
      {activeSubTab === 'CATALOGO_MESTRE' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 border border-slate-200">
              {[
                { id: 'ALL', label: 'Todas as Cadeias (12)' },
                { id: 'CRANIOFACIAL_CERVICAL', label: 'Craniofacial, ATM & Cervical' },
                { id: 'TORACICA_ESCAPULAR_MMSS', label: 'Torácica, Escapular, Diafragma & MMSS' },
                { id: 'LOMBO_PELVICO_QUADRIL', label: 'Lombo-Pélvico, Psoas, SIJ & Quadril' },
                { id: 'MEMBROS_INFERIORES', label: 'Tornozelo, Joelho & Fáscia Plantar' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setRegionFilter(tab.id)}
                  className={`px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    regionFilter === tab.id ? 'bg-slate-900 text-white' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                aria-label="Buscar sintoma ou região corporal no catálogo mestre"
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                placeholder="Buscar sintoma, SIJ, bruxismo..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-mono uppercase text-slate-600">
                  <th className="py-3 px-4 min-w-[200px]">Região / Síndrome Clínica</th>
                  <th className="py-3 px-4 min-w-[230px]">Estruturas & Causa Raiz Biomecânica</th>
                  <th className="py-3 px-4 min-w-[240px]">Prescrição Corretiva Primária & Sinergista</th>
                  <th className="py-3 px-4 min-w-[210px]">Vetor Mecânico & KPI de Auditoria</th>
                  <th className="py-3 px-4 min-w-[180px]">Biociência Molecular (UniProt)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {filteredCatalog.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-4 px-4 align-top">
                      <div className="font-mono text-[11px] text-teal-700 font-semibold">{item.regionLabel}</div>
                      <div className="font-bold text-slate-900 mt-0.5 text-sm">{item.clinicalSyndromeOrSymptom}</div>
                    </td>

                    <td className="py-4 px-4 align-top">
                      <div className="text-slate-900 font-medium">{item.primaryAnatomicalStructures}</div>
                      <div className="text-slate-600 mt-1">{item.biomechanicalRootCause}</div>
                    </td>

                    <td className="py-4 px-4 align-top">
                      <div className="font-bold text-slate-900">1º: {item.primaryCorrectiveExerciseName}</div>
                      <div className="text-slate-600 mt-1">Sinergista: {item.secondarySynergistExerciseName}</div>
                    </td>

                    <td className="py-4 px-4 align-top">
                      <div className="text-slate-800">{item.targetVectorAndTechnique}</div>
                      <div className="font-mono text-teal-800 font-semibold mt-1.5 tabular-nums">
                        KPI: {item.auditKpiMetric} ({item.clinicalTargetValue})
                      </div>
                    </td>

                    <td className="py-4 px-4 align-top">
                      <div className="font-mono font-bold text-slate-900">
                        {item.associatedGeneOrProteinTarget.symbol} ({item.associatedGeneOrProteinTarget.uniprotId})
                      </div>
                      <div className="text-slate-600 mt-0.5">{item.associatedGeneOrProteinTarget.biologicalRole}</div>
                      <button
                        type="button"
                        onClick={() => onInspectMolecularTarget(item.associatedGeneOrProteinTarget.symbol)}
                        className="mt-2 inline-flex items-center gap-1 text-[11px] font-mono text-blue-700 hover:underline"
                      >
                        <Activity className="w-3 h-3" />
                        <span>Inspecionar Proteína 3D/Vias →</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 3: DATABASE SCHEMA SPECIFICATION */}
      {activeSubTab === 'SCHEMA_SQL' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {DATABASE_SCHEMA_SPEC.map((table) => (
              <div key={table.tableName} className="bg-white border border-slate-200 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-teal-700 font-bold">
                    <Database className="w-4 h-4" />
                    <span>TABLE: {table.tableName}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{table.description}</p>

                  <div className="mt-4 divide-y divide-slate-200 border-t border-slate-200 text-xs">
                    {table.columns.map((col) => (
                      <div key={col.name} className="py-2.5">
                        <div className="flex items-center justify-between font-mono">
                          <span className="font-bold text-slate-900">{col.name}</span>
                          <span className="text-[11px] text-slate-500">{col.type}</span>
                        </div>
                        <div className="text-[11px] font-mono text-teal-700 mt-0.5">{col.constraint}</div>
                        <div className="text-slate-600 mt-0.5">{col.auditRole}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
