/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { INITIAL_AUDIT_LOGS } from './data/periodizationAndCatalogData';
import { DailyAuditLog, calculateAuditKPIs } from './utils/biomechanicsMath';
import { Module1DailyProtocols } from './components/Module1DailyProtocols';
import { Module2PeriodizationMatrix } from './components/Module2PeriodizationMatrix';
import { Module3AuditDashboardAndCatalog } from './components/Module3AuditDashboardAndCatalog';
import { Module4MonthlyAuditAndScience } from './components/Module4MonthlyAuditAndScience';
import { OpenSourceInspectorModal } from './components/OpenSourceInspectorModal';

type ActiveModuleTab = 'MODULO_1' | 'MODULO_2' | 'MODULO_3' | 'MODULO_4';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveModuleTab>('MODULO_1');
  const [auditLogs, setAuditLogs] = useState<DailyAuditLog[]>(INITIAL_AUDIT_LOGS);
  const [completedExercises, setCompletedExercises] = useState<string[]>(['mat-01', 'mat-03']);
  const [selectedProteinSymbol, setSelectedProteinSymbol] = useState<string>('COL1A1');
  const [openLogFormOnTab3, setOpenLogFormOnTab3] = useState<boolean>(false);
  const [statusBanner, setStatusBanner] = useState<string>('');
  const [isSourceModalOpen, setIsSourceModalOpen] = useState<boolean>(false);

  const kpis = calculateAuditKPIs(auditLogs);

  const handleToggleExerciseComplete = (id: string) => {
    setCompletedExercises((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleLogCompletedShift = (shift: 'MANHA' | 'NOITE', adherencePct: number) => {
    const today = '2026-11-05';
    const latest = auditLogs[auditLogs.length - 1];
    const newEntry: DailyAuditLog = {
      id: `audit-${Date.now()}`,
      date: today,
      shift,
      adherencePct,
      morningStiffness: Math.max(1, (latest?.morningStiffness ?? 3) - 1),
      sleepQuality: 9,
      regionalPain: {
        craniofacialAtm: 1,
        cervicalSuboccipital: 2,
        thoracicScapular: 1,
        upperLimbsWrists: 1,
        lumbarPelvicSij: 3,
        hipKneeAnklePlantar: 1
      },
      romTests: {
        ankleDorsiflexionLeftCm: Number(((latest?.romTests.ankleDorsiflexionLeftCm ?? 10.4) + 0.3).toFixed(1)),
        ankleDorsiflexionRightCm: latest?.romTests.ankleDorsiflexionRightCm ?? 12.1,
        hipInternalRotationLeftDeg: (latest?.romTests.hipInternalRotationLeftDeg ?? 35) + 1,
        hipInternalRotationRightDeg: latest?.romTests.hipInternalRotationRightDeg ?? 41,
        thoracicRotationLeftDeg: (latest?.romTests.thoracicRotationLeftDeg ?? 53) + 1,
        thoracicRotationRightDeg: latest?.romTests.thoracicRotationRightDeg ?? 56,
        cervicalLateralFlexionLeftDeg: 44,
        cervicalLateralFlexionRightDeg: 45,
        tmjOpeningMm: 43,
        lumbarSchoberCm: 5.5
      },
      notes: `Sessão ${shift === 'MANHA' ? 'Matinal' : 'Noturna'} registrada automaticamente a partir do Módulo 1 (${adherencePct}% adesão).`
    };
    setAuditLogs((prev) => [...prev, newEntry]);
    setStatusBanner(
      `Sessão ${shift === 'MANHA' ? 'Matinal' : 'Noturna'} registrada no Banco de Auditoria (${auditLogs.length + 1} registros totais).`
    );
    setActiveTab('MODULO_3');
  };

  const handleInspectMolecularTarget = (symbol: string) => {
    const cleanSymbol = symbol.toUpperCase().trim();
    const validKey = ['COL1A1', 'PIEZO1', 'HAS2', 'CHRM2', 'ACAN'].includes(cleanSymbol)
      ? cleanSymbol
      : 'COL1A1';
    setSelectedProteinSymbol(validKey);
    setActiveTab('MODULO_4');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Strict 3-Zone Top Navigation Bar Contract */}
      <header className="flex items-center justify-between gap-8 px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-30">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('MODULO_1');
          }}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
        >
          Mobilidade Total
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav aria-label="Navegação Principal dos Módulos" className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => setActiveTab('MODULO_1')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeTab === 'MODULO_1' ? 'border-slate-900 text-slate-900 font-semibold' : 'border-transparent'
            }`}
          >
            01. Protocolos Diários
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('MODULO_2')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeTab === 'MODULO_2' ? 'border-slate-900 text-slate-900 font-semibold' : 'border-transparent'
            }`}
          >
            02. Periodização 4 Semanas
          </button>
          <button
            type="button"
            onClick={() => {
              setOpenLogFormOnTab3(false);
              setActiveTab('MODULO_3');
            }}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeTab === 'MODULO_3' ? 'border-slate-900 text-slate-900 font-semibold' : 'border-transparent'
            }`}
          >
            03. Dashboard & Catálogo
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('MODULO_4')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeTab === 'MODULO_4' ? 'border-slate-900 text-slate-900 font-semibold' : 'border-transparent'
            }`}
          >
            04. Auditoria Mensal & Biociência
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setOpenLogFormOnTab3(true);
              setActiveTab('MODULO_3');
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
          >
            Registrar Aferição ADM
          </button>
        </div>
      </header>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden flex overflow-x-auto bg-white border-b border-slate-200 px-4 py-2 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('MODULO_1')}
          className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 ${
            activeTab === 'MODULO_1' ? 'bg-slate-900 text-white' : 'text-slate-700'
          }`}
        >
          01. Protocolos
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('MODULO_2')}
          className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 ${
            activeTab === 'MODULO_2' ? 'bg-slate-900 text-white' : 'text-slate-700'
          }`}
        >
          02. Periodização
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('MODULO_3')}
          className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 ${
            activeTab === 'MODULO_3' ? 'bg-slate-900 text-white' : 'text-slate-700'
          }`}
        >
          03. Dashboard
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('MODULO_4')}
          className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 ${
            activeTab === 'MODULO_4' ? 'bg-slate-900 text-white' : 'text-slate-700'
          }`}
        >
          04. Auditoria & Biociência
        </button>
      </div>

      {/* Contextual Clinical Telemetry Summary Strip */}
      <div className="bg-slate-900 text-slate-200 px-6 py-2.5 text-xs font-mono border-b border-slate-800">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4 tabular-nums">
          <div className="flex flex-wrap items-center gap-3">
            <span>SISTEMA INTEGRADO DE REPROGRAMAÇÃO POSTURAL</span>
            <span aria-hidden="true">·</span>
            <span className="text-teal-400">SCORE POSTURAL: {kpis.posturalReprogrammingScore}/100</span>
            <span aria-hidden="true">·</span>
            <span>RIGIDEZ MATINAL: {kpis.morningStiffnessCurrent}/10 (Δ {kpis.morningStiffnessDelta})</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-slate-300">
            <span>TORNOZELO E/D: {kpis.ankleRomMeanCm} cm (Δ {kpis.ankleAsymmetryCm} cm)</span>
            <span aria-hidden="true">·</span>
            <span>QUADRIL RI: {kpis.hipInternalRotMeanDeg}°</span>
            <span aria-hidden="true">·</span>
            <span>ATM: {kpis.tmjOpeningCurrentMm} mm</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setIsSourceModalOpen(true)}
              className="text-teal-400 hover:underline font-semibold whitespace-nowrap shrink-0"
            >
              Ver Código-Fonte & GitHub →
            </button>
          </div>
        </div>
      </div>

      {statusBanner && (
        <div className="bg-teal-900 text-white px-6 py-2 text-xs font-mono flex items-center justify-between">
          <span>{statusBanner}</span>
          <button
            type="button"
            onClick={() => setStatusBanner('')}
            className="underline ml-4 whitespace-nowrap"
          >
            Fechar aviso
          </button>
        </div>
      )}

      {/* Main Workspace Viewport */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'MODULO_1' && (
          <Module1DailyProtocols
            completedExerciseIds={completedExercises}
            onToggleExerciseComplete={handleToggleExerciseComplete}
            onLogCompletedShift={handleLogCompletedShift}
            onInspectMolecularTarget={handleInspectMolecularTarget}
          />
        )}

        {activeTab === 'MODULO_2' && <Module2PeriodizationMatrix />}

        {activeTab === 'MODULO_3' && (
          <Module3AuditDashboardAndCatalog
            logs={auditLogs}
            onAddLog={(newLog) => {
              setAuditLogs((prev) => [...prev, newLog]);
              setStatusBanner(`Novo registro auditável (${newLog.date}) incorporado às métricas goniométricas.`);
            }}
            onInspectMolecularTarget={handleInspectMolecularTarget}
            showNewEntryModalInitially={openLogFormOnTab3}
          />
        )}

        {activeTab === 'MODULO_4' && (
          <Module4MonthlyAuditAndScience
            logs={auditLogs}
            selectedProteinSymbol={selectedProteinSymbol}
            onSelectProteinSymbol={setSelectedProteinSymbol}
          />
        )}
      </main>

      {/* Open-Source Code Inspector Modal */}
      <OpenSourceInspectorModal
        isOpen={isSourceModalOpen}
        onClose={() => setIsSourceModalOpen(false)}
      />

      {/* Quiet Editorial Footer */}
      <footer className="bg-white border-t border-slate-200 px-6 py-5 text-xs text-slate-500">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            Programa Mobilidade Total · Código-Fonte Aberto (Apache-2.0) · Biomecânica Clínica & Mecanobiologia
          </div>
          <div className="flex items-center gap-4 font-mono">
            <button
              type="button"
              onClick={() => setIsSourceModalOpen(true)}
              className="text-teal-700 font-semibold hover:underline"
            >
              Inspecionar Código-Fonte Completo
            </button>
            <span>·</span>
            <button type="button" onClick={() => setActiveTab('MODULO_1')} className="hover:text-slate-900">
              Módulo 1
            </button>
            <span>·</span>
            <button type="button" onClick={() => setActiveTab('MODULO_2')} className="hover:text-slate-900">
              Módulo 2
            </button>
            <span>·</span>
            <button type="button" onClick={() => setActiveTab('MODULO_3')} className="hover:text-slate-900">
              Módulo 3
            </button>
            <span>·</span>
            <button type="button" onClick={() => setActiveTab('MODULO_4')} className="hover:text-slate-900">
              Módulo 4
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
