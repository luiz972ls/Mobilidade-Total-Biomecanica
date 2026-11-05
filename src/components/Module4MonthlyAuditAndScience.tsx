import React, { useState, useEffect } from 'react';
import { DailyAuditLog, generateMonthlyAuditPrompt } from '../utils/biomechanicsMath';
import {
  fetchMechanobiologyTargetLive,
  searchBiomedicalLiterature,
  PRESET_MECHANOBIOLOGY_TARGETS,
  MechanobiologyProteinTarget,
  ScientificPaperItem,
  ClinicalTrialItem
} from '../services/scienceAndAiService';
import { Copy, Check, Sparkles, Search, ExternalLink, Dna, BookOpen, RefreshCw } from 'lucide-react';

interface Module4Props {
  logs: DailyAuditLog[];
  selectedProteinSymbol: string;
  onSelectProteinSymbol: (symbol: string) => void;
}

export const Module4MonthlyAuditAndScience: React.FC<Module4Props> = ({
  logs,
  selectedProteinSymbol,
  onSelectProteinSymbol
}) => {
  // Module 4 Monthly Prompt & High Thinking AI Recalibration State
  const [mesocycleNumber, setMesocycleNumber] = useState<number>(1);
  const [subjectiveFeedback, setSubjectiveFeedback] = useState<string>(
    'Excelente resposta na redução da rigidez matinal (7/10 para 3/10) e melhora do sono com respiração vagal 4-7-8. Contudo, sinto estagnação no final de curso da dorsiflexão do tornozelo esquerdo (10.4 cm vs 12.1 cm no direito) e resistência na rotação interna do quadril esquerdo.'
  );
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [isRecalibrating, setIsRecalibrating] = useState<boolean>(false);
  const [recalibrationResult, setRecalibrationResult] = useState<{
    modelUsed: string;
    thinkingLevel: string;
    analysisText: string;
    apiNotice?: string;
  } | null>(null);

  // Bioscience & Search Grounding State
  const [activeProtein, setActiveProtein] = useState<MechanobiologyProteinTarget>(
    PRESET_MECHANOBIOLOGY_TARGETS[selectedProteinSymbol] ?? PRESET_MECHANOBIOLOGY_TARGETS.COL1A1
  );
  const [isLoadingProtein, setIsLoadingProtein] = useState<boolean>(false);

  const [litQuery, setLitQuery] = useState<string>('Mulligan mobilization ankle dorsiflexion myofascial release');
  const [papers, setPapers] = useState<ScientificPaperItem[]>([]);
  const [trials, setTrials] = useState<ClinicalTrialItem[]>([]);
  const [isLoadingLit, setIsLoadingLit] = useState<boolean>(false);

  const [groundingQuery, setGroundingQuery] = useState<string>(
    'Protocolo Mulligan MWM dorsiflexão talocrural e PAILs RAILs rotação interna de quadril evidências'
  );
  const [isSearchingGrounding, setIsSearchingGrounding] = useState<boolean>(false);
  const [groundingResult, setGroundingResult] = useState<{
    modelUsed: string;
    text: string;
    sources: Array<{ uri: string; title: string }>;
  } | null>(null);

  const generatedPrompt = generateMonthlyAuditPrompt(logs, mesocycleNumber, subjectiveFeedback);

  useEffect(() => {
    let cancelled = false;
    setIsLoadingProtein(true);
    fetchMechanobiologyTargetLive(selectedProteinSymbol)
      .then((target) => {
        if (!cancelled) {
          setActiveProtein(target);
          setIsLoadingProtein(false);
        }
      })
      .catch(() => {
        if (!cancelled) setIsLoadingProtein(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedProteinSymbol]);

  useEffect(() => {
    handleSearchLiterature('Mulligan mobilization ankle dorsiflexion myofascial release');
  }, []);

  const handleSearchLiterature = async (q: string) => {
    setIsLoadingLit(true);
    const res = await searchBiomedicalLiterature(q);
    setPapers(res.papers);
    setTrials(res.trials);
    setIsLoadingLit(false);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  const handleRunHighThinkingRecalibration = async () => {
    setIsRecalibrating(true);
    try {
      const response = await fetch('/api/ai/recalibrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auditPrompt: generatedPrompt })
      });
      const data = await response.json();
      setRecalibrationResult(data);
    } catch (err: unknown) {
      setRecalibrationResult({
        modelUsed: 'Erro de Conexão',
        thinkingLevel: 'HIGH',
        analysisText: err instanceof Error ? err.message : 'Falha na requisição ao servidor.'
      });
    } finally {
      setIsRecalibrating(false);
    }
  };

  const handleRunSearchGrounding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groundingQuery.trim()) return;
    setIsSearchingGrounding(true);
    try {
      const response = await fetch('/api/ai/search-evidence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: groundingQuery })
      });
      const data = await response.json();
      setGroundingResult(data);
    } catch (err: unknown) {
      setGroundingResult({
        modelUsed: 'Erro na Busca',
        text: err instanceof Error ? err.message : 'Falha ao consultar endpoint de Search Grounding.',
        sources: []
      });
    } finally {
      setIsSearchingGrounding(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* ============================================================================
          SECTION 1: MODULE 4 — MONTHLY AUDIT & HIGH-THINKING RECALIBRATION PROTOCOL
         ============================================================================ */}
      <div className="bg-white border border-slate-200 p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
              04. MÓDULO 4 · PROTOCOLO DE AUDITORIA E RECALIBRAÇÃO MENSAL (CICLO DE 30 DIAS)
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Gerador de Prompt de Fechamento de Mês & Recalibração Clínica (High Thinking)
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Template dinâmico autopreenchido com os deltas goniométricos, assimetrias bilaterais e escores de
              rigidez do seu Dashboard para recalibração de cargas e substituição de estímulos acomodados.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start">
            <button
              type="button"
              onClick={handleCopyPrompt}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border border-slate-300 text-slate-800 hover:bg-slate-100 whitespace-nowrap shrink-0"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5 text-teal-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt ? 'Prompt Copiado!' : 'Copiar Prompt de 30 Dias'}</span>
            </button>

            <button
              type="button"
              disabled={isRecalibrating}
              onClick={handleRunHighThinkingRecalibration}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60 whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>
                {isRecalibrating
                  ? 'Processando Raciocínio Clínico (Thinking HIGH)...'
                  : 'Executar Recalibração Mensal (Gemini 4 Argon)'}
              </span>
            </button>
          </div>
        </div>

        {/* Inputs to Customize the Monthly Prompt */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-4">
            <div>
              <label htmlFor="mesocycle-num" className="block text-xs font-semibold text-slate-700 mb-1">
                Número do Mesociclo Concluído (Ciclo de 30 Dias)
              </label>
              <input
                id="mesocycle-num"
                type="number"
                min={1}
                max={24}
                value={mesocycleNumber}
                onChange={(e) => setMesocycleNumber(Number(e.target.value) || 1)}
                className="w-full px-3 py-2 text-xs border border-slate-300 font-mono tabular-nums"
              />
            </div>

            <div>
              <label htmlFor="subjective-feedback" className="block text-xs font-semibold text-slate-700 mb-1">
                Relato Subjetivo de Sensações Articulares, Estagnações e Rotina
              </label>
              <textarea
                id="subjective-feedback"
                rows={6}
                value={subjectiveFeedback}
                onChange={(e) => setSubjectiveFeedback(e.target.value)}
                className="w-full p-3 text-xs border border-slate-300 leading-relaxed"
              />
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 text-xs space-y-1.5">
              <div className="font-mono font-bold text-slate-800 uppercase">
                COMO UTILIZAR A CADA 30 DIAS:
              </div>
              <p className="text-slate-600 leading-relaxed">
                1. Registre suas aferições semanais no Módulo 3 (Knee-to-Wall, Rotação de Quadril/Torácica, ATM e Schober).
              </p>
              <p className="text-slate-600 leading-relaxed">
                2. Preencha seu relato subjetivo acima; o template ao lado consolida todas as métricas automaticamente.
              </p>
              <p className="text-slate-600 leading-relaxed">
                3. Clique em <strong>Executar Recalibração Mensal</strong> ou copie o prompt estruturado.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-1.5">
              <span>TEMPLATE AUDITÁVEL DE PROMPT DE FECHAMENTO DE MÊS (SINCRONIZADO COM O DASHBOARD)</span>
              <span>{logs.length} SESSÕES INTEGRADAS</span>
            </div>
            <pre className="w-full h-[340px] overflow-y-auto p-4 bg-slate-900 text-slate-100 text-xs font-mono leading-relaxed whitespace-pre-wrap border border-slate-800">
              {generatedPrompt}
            </pre>
          </div>
        </div>

        {/* High-Thinking AI Recalibration Output */}
        {recalibrationResult && (
          <div className="border-t border-slate-200 pt-6">
            <div className="bg-slate-50 border border-slate-200 p-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div className="text-xs font-mono uppercase text-teal-800 font-bold">
                  PRESCRIÇÃO DE RECALIBRAÇÃO GERADA · MODELO: {recalibrationResult.modelUsed} · THINKING:{' '}
                  {recalibrationResult.thinkingLevel}
                </div>
              </div>
              <div className="text-xs text-slate-800 font-mono whitespace-pre-wrap leading-relaxed">
                {recalibrationResult.analysisText}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================================
          SECTION 2: BIOSCIENCE WORKBENCH (ALPHAFOLD DB, UNIPROT, REACTOME, PUBMED & GOOGLE SEARCH GROUNDING)
         ============================================================================ */}
      <div className="bg-white border border-slate-200 p-6 space-y-6">
        <div className="border-b border-slate-200 pb-5">
          <div className="text-xs font-mono text-blue-700 uppercase tracking-wider">
            05. BANCADA DE BIOCIÊNCIA MOLECULAR & LITERATURA CLÍNICA (ALPHAFOLD DB · UNIPROT · REACTOME · PUBMED)
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            Mecanobiologia da Fáscia, Canais Mecanossensíveis & Evidência Científica em Tempo Real
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-4xl">
            Inspeção direta das proteínas estruturais e receptores mecanossensíveis modulados pelos protocolos do
            programa Mobilidade Total, integrada a artigos indexados no PubMed / Europe PMC, ClinicalTrials.gov e
            busca fundamentada via Google Search (`gemini-3.8-flash`).
          </p>

          {/* Top Quick-Try Example Bar (Mandatory per Science Skill) */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-500 mr-1">Alvos Moleculares (Quick-Try):</span>
            {Object.values(PRESET_MECHANOBIOLOGY_TARGETS).map((target) => {
              const isSelected = activeProtein.symbol === target.symbol;
              return (
                <button
                  key={target.symbol}
                  type="button"
                  onClick={() => onSelectProteinSymbol(target.symbol)}
                  className={`px-3 py-1.5 text-xs font-mono font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {target.symbol} · {target.uniprotAccession}
                </button>
              );
            })}
          </div>
        </div>

        {/* Split Interactive Molecular Inspector + Pathways */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Dna className="w-4 h-4 text-blue-700" />
                <span className="text-sm font-bold text-slate-900 font-mono">
                  {activeProtein.symbol} — {activeProtein.proteinName}
                </span>
              </div>
              <span className="text-xs font-mono text-blue-800 font-semibold">
                {activeProtein.provenanceBadge} · UniProt {activeProtein.uniprotAccession}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">{activeProtein.functionSummary}</p>

            <div className="bg-white border border-slate-200 p-4">
              <div className="text-[11px] font-mono uppercase text-teal-800 font-semibold">
                CORRELAÇÃO COM O PROGRAMA MOBILIDADE TOTAL (MECANOTRANSDUÇÃO CLÍNICA)
              </div>
              <p className="text-xs text-slate-800 mt-1 leading-relaxed">{activeProtein.biomechanicalRelevance}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono tabular-nums">
              <div className="bg-white border border-slate-200 p-3">
                <div className="text-slate-500 text-[11px]">COMPRIMENTO SEQUÊNCIA</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{activeProtein.sequenceLength} aa</div>
              </div>
              <div className="bg-white border border-slate-200 p-3">
                <div className="text-slate-500 text-[11px]">ALPHAFOLD ENTRY</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{activeProtein.alphafoldEntryId}</div>
              </div>
              <div className="bg-white border border-slate-200 p-3">
                <div className="text-slate-500 text-[11px]">CONFIANÇA pLDDT</div>
                <div className="text-sm font-bold text-blue-700 mt-0.5">{activeProtein.meanPlddtConfidenceBand}</div>
              </div>
            </div>

            {/* Canonical 4-Band AlphaFold pLDDT Confidence Scale */}
            <div className="bg-white border border-slate-200 p-3.5">
              <div className="text-[11px] font-mono uppercase text-slate-500 mb-2">
                ESCALA CANÔNICA DE CONFIANÇA ESTRUTURAL ALPHAFOLD (pLDDT 0–100)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 inline-block shrink-0" style={{ backgroundColor: '#0053D6' }} />
                  <span>&gt;90 Muito Alta</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 inline-block shrink-0" style={{ backgroundColor: '#65CBF3' }} />
                  <span>70–90 Confiante</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 inline-block shrink-0" style={{ backgroundColor: '#FFDB13' }} />
                  <span>50–70 Baixa</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 inline-block shrink-0" style={{ backgroundColor: '#FF7D45' }} />
                  <span>&lt;50 Desordenada</span>
                </div>
              </div>
            </div>

            {/* Outbound Authoritative Database Links */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono">
              <a
                href={`https://www.uniprot.org/uniprotkb/${activeProtein.uniprotAccession}/entry`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-blue-700 hover:underline"
              >
                <span>Registro Oficial UniProtKB</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={`https://alphafold.ebi.ac.uk/entry/${activeProtein.uniprotAccession}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-blue-700 hover:underline"
              >
                <span>Estrutura 3D AlphaFold DB</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={activeProtein.alphafoldCifUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-teal-700 hover:underline"
              >
                <span>Download Coordenadas mmCIF (.cif)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Pane: Reactome Pathways & PAE Domain Matrix */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-slate-600 font-semibold">
                  VIAS BIOLÓGICAS CURADAS (REACTOME PATHWAY DATABASE)
                </span>
                {isLoadingProtein && <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-700" />}
              </div>

              <div className="mt-3 space-y-2">
                {activeProtein.reactomePathways.map((pw) => (
                  <div key={pw.stId} className="bg-white border border-slate-200 p-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{pw.displayName}</div>
                      <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                        Estável ID: {pw.stId} · [Literature curated]
                      </div>
                    </div>
                    <a
                      href={`https://reactome.org/PathwayBrowser/#/${pw.stId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-blue-700 hover:underline shrink-0 ml-2"
                    >
                      Abrir Via →
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-4">
              <div className="text-[11px] font-mono uppercase text-slate-500">
                MATRIZ PAE (PREDICTED ALIGNED ERROR) & TOPOLOGIA DE DOMÍNIOS
              </div>
              <div className="text-xs text-slate-700 mt-1">
                Coordenadas dinâmicas resolvidas via API AlphaFold v6 (`{activeProtein.alphafoldEntryId}`). Baixo erro
                PAE (&lt; 5 Å) confirma empacotamento globular rígido nos domínios catalíticos/mecanossensíveis.
              </div>
            </div>
          </div>
        </div>

        {/* Google Search Grounding (gemini-3.8-flash) + Live PubMed / ClinicalTrials.gov */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
          {/* Left: Google Search Grounding with gemini-3.8-flash */}
          <div className="bg-slate-50 border border-slate-200 p-5 space-y-4">
            <div className="text-xs font-mono uppercase text-teal-800 font-bold">
              PESQUISA CLÍNICA FUNDAMENTADA (GEMINI-3.8-FLASH + GOOGLE SEARCH GROUNDING)
            </div>
            <form onSubmit={handleRunSearchGrounding} className="flex gap-2">
              <input
                type="text"
                aria-label="Pesquisar diretrizes clínicas com Google Search Grounding"
                value={groundingQuery}
                onChange={(e) => setGroundingQuery(e.target.value)}
                placeholder="Ex: Evidências ELDOA L5-S1 ou Mulligan SNAG cervical..."
                className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300"
              />
              <button
                type="submit"
                disabled={isSearchingGrounding}
                className="px-4 py-2 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 whitespace-nowrap shrink-0"
              >
                {isSearchingGrounding ? 'Buscando...' : 'Pesquisar Web'}
              </button>
            </form>

            {groundingResult ? (
              <div className="bg-white border border-slate-200 p-4 space-y-3 text-xs">
                <div className="font-mono text-[11px] text-slate-500">{groundingResult.modelUsed}</div>
                <div className="text-slate-800 whitespace-pre-wrap leading-relaxed">{groundingResult.text}</div>
                {groundingResult.sources.length > 0 && (
                  <div className="pt-2 border-t border-slate-200">
                    <div className="font-mono text-[11px] text-slate-500 uppercase mb-1">
                      Fontes Web Verificadas (Grounding Chunks):
                    </div>
                    <ul className="space-y-1">
                      {groundingResult.sources.map((src, idx) => (
                        <li key={idx}>
                          <a
                            href={src.uri}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-700 hover:underline inline-flex items-center gap-1"
                          >
                            <span>{src.title}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 p-4 text-xs text-slate-600">
                Execute uma consulta acima para sintetizar protocolos clínicos atualizados via{' '}
                <code className="font-mono">gemini-3.8-flash</code> com ferramenta <code className="font-mono">googleSearch</code>.
              </div>
            )}
          </div>

          {/* Right: PubMed / Europe PMC & ClinicalTrials.gov Live Feed */}
          <div className="bg-slate-50 border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-blue-800 font-bold">
                <BookOpen className="w-4 h-4" />
                <span>LITERATURA BIOMÉDICA (PUBMED / EUROPE PMC & CLINICALTRIALS.GOV)</span>
              </div>
              {isLoadingLit && <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-700" />}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                aria-label="Buscar estudos no PubMed e ClinicalTrials.gov"
                value={litQuery}
                onChange={(e) => setLitQuery(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300"
              />
              <button
                type="button"
                onClick={() => handleSearchLiterature(litQuery)}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold border border-slate-300 bg-white hover:bg-slate-100 whitespace-nowrap shrink-0"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Consultar PubMed</span>
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {papers.map((p) => (
                <div key={p.id} className="bg-white border border-slate-200 p-3 text-xs">
                  <div className="flex items-center justify-between font-mono text-[11px] text-slate-500">
                    <span>
                      {p.id} · {p.journalTitle} ({p.pubYear}) · Citações: {p.citedByCount}
                    </span>
                    <span className="text-teal-700">{p.provenanceBadge}</span>
                  </div>
                  <div className="font-bold text-slate-900 mt-1">{p.title}</div>
                  <div className="flex items-center justify-between mt-1.5 text-[11px] text-slate-600">
                    <span className="truncate max-w-xs">{p.authorString}</span>
                    <a
                      href={p.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-blue-700 hover:underline shrink-0 ml-2"
                    >
                      PubMed →
                    </a>
                  </div>
                </div>
              ))}

              {trials.map((t) => (
                <div key={t.nctId} className="bg-white border border-slate-200 p-3 text-xs">
                  <div className="flex items-center justify-between font-mono text-[11px] text-slate-500">
                    <span>ClinicalTrials.gov · {t.nctId}</span>
                    <span className="text-emerald-700 font-semibold">{t.overallStatus}</span>
                  </div>
                  <div className="font-bold text-slate-900 mt-1">{t.briefTitle}</div>
                  <div className="flex items-center justify-between mt-1 text-[11px] text-slate-600">
                    <span>Intervenções: {t.interventions.join(', ')}</span>
                    <a
                      href={t.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-blue-700 hover:underline shrink-0 ml-2"
                    >
                      Estudo NCT →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
