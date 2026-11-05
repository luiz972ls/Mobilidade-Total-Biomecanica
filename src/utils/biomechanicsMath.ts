export interface DailyAuditLog {
  id: string;
  date: string; // YYYY-MM-DD
  shift: 'MANHA' | 'NOITE' | 'AMBOS';
  adherencePct: number; // 0 - 100
  morningStiffness: number; // 1 - 10
  sleepQuality: number; // 1 - 10
  regionalPain: {
    craniofacialAtm: number; // 0 - 10
    cervicalSuboccipital: number; // 0 - 10
    thoracicScapular: number; // 0 - 10
    upperLimbsWrists: number; // 0 - 10
    lumbarPelvicSij: number; // 0 - 10
    hipKneeAnklePlantar: number; // 0 - 10
  };
  romTests: {
    ankleDorsiflexionLeftCm: number; // Knee-to-wall test (cm), target >= 12.0 cm
    ankleDorsiflexionRightCm: number;
    hipInternalRotationLeftDeg: number; // Goniometry (deg), target >= 40 deg
    hipInternalRotationRightDeg: number;
    thoracicRotationLeftDeg: number; // Seated lumbar-locked (deg), target >= 55 deg
    thoracicRotationRightDeg: number;
    cervicalLateralFlexionLeftDeg: number; // Target >= 45 deg
    cervicalLateralFlexionRightDeg: number;
    tmjOpeningMm: number; // Interincisal distance (mm), target >= 42 mm
    lumbarSchoberCm: number; // Modified Schober excursion (cm), target >= 5.5 cm
  };
  notes: string;
}

export interface PeriodizationWeekSpec {
  week: 1 | 2 | 3 | 4;
  phaseName: string;
  clinicalObjective: string;
  neurophysiologicalMechanism: string;
  tutMultiplier: number;
  baseTutSecondsPerSet: number;
  setsPerExercise: number;
  respiratoryCadenceMorning: string;
  respiratoryCadenceEvening: string;
  targetDiscomfortRange: string;
  irradiationIntensityPct: number;
  endRangeIsometricProtocol: string;
  weeklyTotalTutMinutes: number;
  progressionCriteria: string;
}

export interface AutoregulationInput {
  week: 1 | 2 | 3 | 4;
  morningStiffness: number; // 1 - 10
  acutePainMax: number; // 0 - 10
  daysStagnantRom: number; // 0 - 30
}

export interface AutoregulatedOutput {
  status: 'PROGRESSAO_PADRAO' | 'REDUCAO_AGUDA_PROTECTIVA' | 'QUEBRA_PLATÔ_DENSIDADE' | 'DELOAD_INTEGRATIVO';
  statusLabel: string;
  adjustedTutSeconds: number;
  adjustedSets: number;
  adjustedIrradiationPct: number;
  maxAllowedDiscomfort: string;
  recommendedCadence: string;
  biomechanicalAdjustmentDirective: string;
  progressionFactor: number;
}

export interface AuditKPIReport {
  totalLogs: number;
  meanAdherencePct: number;
  morningStiffnessInitial: number;
  morningStiffnessCurrent: number;
  morningStiffnessDelta: number;
  sleepQualityMean: number;
  ankleRomMeanCm: number;
  ankleAsymmetryCm: number;
  hipInternalRotMeanDeg: number;
  hipAsymmetryDeg: number;
  thoracicRotMeanDeg: number;
  thoracicAsymmetryDeg: number;
  tmjOpeningCurrentMm: number;
  lumbarSchoberCurrentCm: number;
  posturalReprogrammingScore: number; // 0 - 100
  criticalAsymmetries: string[];
  accommodatedRegions: string[];
}

export const PERIODIZATION_MATRIX: Record<1 | 2 | 3 | 4, PeriodizationWeekSpec> = {
  1: {
    week: 1,
    phaseName: 'Semana 1 — Adaptação Neural, Hidratação Fascial & Mapeamento de Restrições',
    clinicalObjective: 'Restaurar o deslizamento inter-fascial dependente de ácido hialurônico, mapear barreiras artrocinemáticas e calibrar a Zona de Aposição Diafragmática (ZOA).',
    neurophysiologicalMechanism: 'Redução do tônus simpático basal via mecanorreceptores de Ruffini e corpúsculos de Pacini; tixotropia da matriz extracelular.',
    tutMultiplier: 1.0,
    baseTutSecondsPerSet: 45,
    setsPerExercise: 2,
    respiratoryCadenceMorning: '4s IN : 2s HOLD : 6s EX : 0s HOLD (Expansão Costal 360°)',
    respiratoryCadenceEvening: '4s IN : 4s HOLD : 6s EX : 2s HOLD (Bradicardia Reflexa)',
    targetDiscomfortRange: '3.0 a 4.0 / 10 (Tensão terapêutica leve, zero espasmo protetor)',
    irradiationIntensityPct: 25,
    endRangeIsometricProtocol: 'CARs Articulares Puros + Mobilização com Movimento (Mulligan MWM Grau II)',
    weeklyTotalTutMinutes: 210,
    progressionCriteria: 'Adesão >= 85%, ausência de dor articular aguda (> 5/10) após 24h e domínio da pressurização intra-abdominal sem elevação de trapézio superior.'
  },
  2: {
    week: 2,
    phaseName: 'Semana 2 — Aumento de Tempo Sob Tensão (TUT) & Desbloqueio Miofascial por Cisalhamento',
    clinicalObjective: 'Dissolver densificações colagenosas cruzadas (cross-links) nos pontos-gatilho miofasciais e ampliar a excursão capsular com tração axial Grau III.',
    neurophysiologicalMechanism: 'Inibição autogênica via Órgãos Tendinosos de Golgi (OTG) após > 60s de tensão contínua e hiperemia reativa pós-compressão isquêmica.',
    tutMultiplier: 1.35,
    baseTutSecondsPerSet: 60,
    setsPerExercise: 3,
    respiratoryCadenceMorning: '4s IN : 3s HOLD : 6s EX : 1s HOLD (Pressurização Intra-Abdominal Ativa)',
    respiratoryCadenceEvening: '4s IN : 6s HOLD : 8s EX : 0s HOLD (Estímulo Vagal Profundo)',
    targetDiscomfortRange: '4.5 a 6.0 / 10 (Desconforto miofascial controlado com dissolução progressiva)',
    irradiationIntensityPct: 45,
    endRangeIsometricProtocol: 'Pin & Stretch Miofascial + FNP Contração-Relaxamento (6s isometria a 40% CVM / 20s ganho passivo)',
    weeklyTotalTutMinutes: 285,
    progressionCriteria: 'Redução >= 1.5 pontos na rigidez matinal em relação à Semana 1 e simetria bilateral de dorsiflexão com diferença < 1.5 cm.'
  },
  3: {
    week: 3,
    phaseName: 'Semana 3 — Ganho de Amplitude Ativa no Fim de Curso (End-Range PAILs/RAILs & ELDOA)',
    clinicalObjective: 'Converter amplitude passiva recém-adquirida em controle neuromuscular ativo no extremo articular (End-Range) e descomprimir segmentos vertebrais L5-S1 / C0-C2.',
    neurophysiologicalMechanism: 'Sarcômeros em série (mecanotransdução via integrinas/Piezo1), inibição recíproca máxima (RAILs) e decoaptação facetária axial ativa.',
    tutMultiplier: 1.65,
    baseTutSecondsPerSet: 75,
    setsPerExercise: 3,
    respiratoryCadenceMorning: '3s IN Costal : 4s PIA Máxima : 6s EX Forçada Labial (Estabilização End-Range)',
    respiratoryCadenceEvening: '4s IN : 7s HOLD : 8s EX : 2s HOLD (Downregulation Pós-Isometria Intensa)',
    targetDiscomfortRange: '5.5 a 7.0 / 10 (Esforço isométrico de fim de curso sem dor articular em pinçamento)',
    irradiationIntensityPct: 70,
    endRangeIsometricProtocol: 'PAILs (15s rampa progressiva até 70% CVM) + RAILs (15s contração agonista de encurtamento) + ELDOA 60s',
    weeklyTotalTutMinutes: 345,
    progressionCriteria: 'Ganho mensurável >= 10% em rotação interna de quadril e rotação torácica sem compensação lombar.'
  },
  4: {
    week: 4,
    phaseName: 'Semana 4 — Deload Neural, Integração Postural Dinâmica & Reavaliação Auditável',
    clinicalObjective: 'Consolidar o remodelamento da matriz extracelular (colágeno tipo I/III), dissipar fadiga do SNC e auditar os deltas goniométricos de 30 dias.',
    neurophysiologicalMechanism: 'Supercompensação tecidual fibroblástica, integração sensório-motora cortical e recalibração do reflexo miotático em nova ADM basal.',
    tutMultiplier: 0.75,
    baseTutSecondsPerSet: 40,
    setsPerExercise: 2,
    respiratoryCadenceMorning: '5s IN 360° : 2s HOLD : 5s EX Fluida (Coerência Cardiorrespiratória)',
    respiratoryCadenceEvening: 'Duplo Suspiro Fisiológico + 4s IN : 4s HOLD : 8s EX (Recuperação Parassimpática)',
    targetDiscomfortRange: '2.0 a 3.5 / 10 (Fluidez articular, zero fadiga residual)',
    irradiationIntensityPct: 30,
    endRangeIsometricProtocol: 'CARs Encadeados Multiarticulares + Deslizamento Neurodinâmico (Sliders) + Bateria Goniométrica Final',
    weeklyTotalTutMinutes: 160,
    progressionCriteria: 'Fechamento de ciclo de 30 dias com geração do Relatório de Auditoria e recalibração de estímulos acomodados.'
  }
};

export function calculateAutoregulatedPrescription(input: AutoregulationInput): AutoregulatedOutput {
  const baseSpec = PERIODIZATION_MATRIX[input.week];

  // Protocol 1: Acute stiffness or articular/myofascial flare-up (Pain >= 7 or Morning Stiffness >= 7)
  if (input.acutePainMax >= 7 || input.morningStiffness >= 7) {
    const adjustedTut = Math.max(30, Math.round(baseSpec.baseTutSecondsPerSet * 0.65));
    return {
      status: 'REDUCAO_AGUDA_PROTECTIVA',
      statusLabel: 'Alerta de Sensibilização Central/Periférica — Regressão Protetora Ativada (-35% TUT)',
      adjustedTutSeconds: adjustedTut,
      adjustedSets: 2,
      adjustedIrradiationPct: 15,
      maxAllowedDiscomfort: 'Máximo 3.0 / 10 (Proibido atingir dor ou espasmo)',
      recommendedCadence: '4s IN Nasal : 0s Apneia : 8s EX Lenta (Estímulo Vagal Analgésico)',
      biomechanicalAdjustmentDirective:
        'Suspender imediatamente PAILs/RAILs de alta intensidade e compressão isquêmica direta com esfera rígida sobre a região sensibilizada. Substituir por Oscilação Articular Maitland Grau I-II, Deslizamento Neurodinâmico "Slider" (sem tensão nas duas extremidades) e Drenagem Linfática Proximal-Distal.',
      progressionFactor: 0.65
    };
  }

  // Protocol 2: Week 4 Deload
  if (input.week === 4) {
    return {
      status: 'DELOAD_INTEGRATIVO',
      statusLabel: 'Fase de Deload & Supercompensação Fascial (Semana 4)',
      adjustedTutSeconds: baseSpec.baseTutSecondsPerSet,
      adjustedSets: baseSpec.setsPerExercise,
      adjustedIrradiationPct: baseSpec.irradiationIntensityPct,
      maxAllowedDiscomfort: baseSpec.targetDiscomfortRange,
      recommendedCadence: baseSpec.respiratoryCadenceMorning,
      biomechanicalAdjustmentDirective:
        'Manter volume reduzido (-25% em relação à Semana 1) priorizando velocidade angular constante nos CARs, controle motor escapulotorácico/lombo-pélvico e aferição rigorosa dos testes de ADM para o fechamento mensal.',
      progressionFactor: baseSpec.tutMultiplier
    };
  }

  // Protocol 3: ROM Stagnation >= 5 days without acute pain
  if (input.daysStagnantRom >= 5 && input.acutePainMax <= 5) {
    const adjustedTut = Math.round(baseSpec.baseTutSecondsPerSet * 1.25);
    return {
      status: 'QUEBRA_PLATÔ_DENSIDADE',
      statusLabel: 'Protocolo Quebra de Platô Artrocinemático (+25% TUT + MWM + Excêntrico de Fim de Curso)',
      adjustedTutSeconds: adjustedTut,
      adjustedSets: baseSpec.setsPerExercise + 1,
      adjustedIrradiationPct: Math.min(85, baseSpec.irradiationIntensityPct + 15),
      maxAllowedDiscomfort: '5.5 a 6.5 / 10 (Tensão mecânica de remodelamento plástico)',
      recommendedCadence: '3s IN : 5s HOLD (PIA Alta) : 7s EX com Contração Agonista End-Range',
      biomechanicalAdjustmentDirective:
        'A restrição é capsular/ligamentar ou por bloqueio artrocinemático acessórios. Adicionar Mobilização com Movimento (Mulligan MWM) com faixa de tração perpendicular ao plano de movimento antes do alongamento, aumentar o tempo sob tensão passivo para > 90s totais por série e introduzir 2 ciclos extras de FNP CRAC.',
      progressionFactor: Number((baseSpec.tutMultiplier * 1.25).toFixed(2))
    };
  }

  // Standard Progression
  return {
    status: 'PROGRESSAO_PADRAO',
    statusLabel: `Progressão Linear Calibrada — ${baseSpec.phaseName.split('—')[0].trim()}`,
    adjustedTutSeconds: baseSpec.baseTutSecondsPerSet,
    adjustedSets: baseSpec.setsPerExercise,
    adjustedIrradiationPct: baseSpec.irradiationIntensityPct,
    maxAllowedDiscomfort: baseSpec.targetDiscomfortRange,
    recommendedCadence: baseSpec.respiratoryCadenceMorning,
    biomechanicalAdjustmentDirective:
      'Executar o protocolo conforme prescrito na matriz da semana atual. Garantir ancoragem proximal rígida antes de aplicar vetores rotacionais ou de descompressão axial.',
    progressionFactor: baseSpec.tutMultiplier
  };
}

export function calculateAuditKPIs(logs: DailyAuditLog[]): AuditKPIReport {
  if (logs.length === 0) {
    return {
      totalLogs: 0,
      meanAdherencePct: 0,
      morningStiffnessInitial: 0,
      morningStiffnessCurrent: 0,
      morningStiffnessDelta: 0,
      sleepQualityMean: 0,
      ankleRomMeanCm: 0,
      ankleAsymmetryCm: 0,
      hipInternalRotMeanDeg: 0,
      hipAsymmetryDeg: 0,
      thoracicRotMeanDeg: 0,
      thoracicAsymmetryDeg: 0,
      tmjOpeningCurrentMm: 0,
      lumbarSchoberCurrentCm: 0,
      posturalReprogrammingScore: 0,
      criticalAsymmetries: [],
      accommodatedRegions: []
    };
  }

  const sorted = [...logs].sort((a, b) => a.date.localeCompare(b.date));
  const first = sorted[0];
  const latest = sorted[sorted.length - 1];

  const meanAdherencePct = Number(
    (sorted.reduce((acc, item) => acc + item.adherencePct, 0) / sorted.length).toFixed(1)
  );
  const sleepQualityMean = Number(
    (sorted.reduce((acc, item) => acc + item.sleepQuality, 0) / sorted.length).toFixed(1)
  );

  const morningStiffnessInitial = first.morningStiffness;
  const morningStiffnessCurrent = latest.morningStiffness;
  const morningStiffnessDelta = Number((morningStiffnessCurrent - morningStiffnessInitial).toFixed(1));

  const ankleRomMeanCm = Number(
    ((latest.romTests.ankleDorsiflexionLeftCm + latest.romTests.ankleDorsiflexionRightCm) / 2).toFixed(1)
  );
  const ankleAsymmetryCm = Number(
    Math.abs(latest.romTests.ankleDorsiflexionLeftCm - latest.romTests.ankleDorsiflexionRightCm).toFixed(1)
  );

  const hipInternalRotMeanDeg = Number(
    ((latest.romTests.hipInternalRotationLeftDeg + latest.romTests.hipInternalRotationRightDeg) / 2).toFixed(1)
  );
  const hipAsymmetryDeg = Number(
    Math.abs(latest.romTests.hipInternalRotationLeftDeg - latest.romTests.hipInternalRotationRightDeg).toFixed(1)
  );

  const thoracicRotMeanDeg = Number(
    ((latest.romTests.thoracicRotationLeftDeg + latest.romTests.thoracicRotationRightDeg) / 2).toFixed(1)
  );
  const thoracicAsymmetryDeg = Number(
    Math.abs(latest.romTests.thoracicRotationLeftDeg - latest.romTests.thoracicRotationRightDeg).toFixed(1)
  );

  const criticalAsymmetries: string[] = [];
  if (ankleAsymmetryCm >= 1.5) {
    const restrictedSide =
      latest.romTests.ankleDorsiflexionLeftCm < latest.romTests.ankleDorsiflexionRightCm ? 'Esquerdo' : 'Direito';
    criticalAsymmetries.push(
      `Assimetria Talocrural (Tornozelo ${restrictedSide} restrito em ${ankleAsymmetryCm} cm no Knee-to-Wall)`
    );
  }
  if (hipAsymmetryDeg >= 5) {
    const restrictedSide =
      latest.romTests.hipInternalRotationLeftDeg < latest.romTests.hipInternalRotationRightDeg ? 'Esquerdo' : 'Direito';
    criticalAsymmetries.push(
      `Assimetria Coxofemoral em Rotação Interna (Quadril ${restrictedSide} com déficit de ${hipAsymmetryDeg}°)`
    );
  }
  if (thoracicAsymmetryDeg >= 6) {
    const restrictedSide =
      latest.romTests.thoracicRotationLeftDeg < latest.romTests.thoracicRotationRightDeg ? 'Esquerdo' : 'Direito';
    criticalAsymmetries.push(
      `Assimetria de Rotação Torácica (Hemitórax ${restrictedSide} com déficit de ${thoracicAsymmetryDeg}°)`
    );
  }

  const accommodatedRegions: string[] = [];
  if (latest.regionalPain.cervicalSuboccipital >= 4) {
    accommodatedRegions.push('Complexo Cervical / Suboccipital (Tensão residual >= 4/10)');
  }
  if (latest.regionalPain.lumbarPelvicSij >= 4) {
    accommodatedRegions.push('Complexo Lombo-Pélvico / SIJ (Tensão residual >= 4/10)');
  }
  if (latest.regionalPain.craniofacialAtm >= 4) {
    accommodatedRegions.push('ATM / Masseter / Pterigoideos (Tensão residual >= 4/10)');
  }
  if (latest.romTests.ankleDorsiflexionLeftCm < 10.5 || latest.romTests.ankleDorsiflexionRightCm < 10.5) {
    accommodatedRegions.push('Dorsiflexão de Tornozelo (< 10.5 cm — requer MWM com tração posterior de tálus)');
  }

  // Composite Postural Reprogramming Index (0-100)
  const adherenceComponent = Math.min(100, meanAdherencePct) * 0.25;
  const stiffnessComponent = Math.max(0, (10 - morningStiffnessCurrent) * 10) * 0.25;
  const romNormalized =
    Math.min(100, (ankleRomMeanCm / 12.5) * 100) * 0.15 +
    Math.min(100, (hipInternalRotMeanDeg / 40) * 100) * 0.15 +
    Math.min(100, (thoracicRotMeanDeg / 55) * 100) * 0.1 +
    Math.min(100, (latest.romTests.tmjOpeningMm / 44) * 100) * 0.1;

  const posturalReprogrammingScore = Math.round(
    Math.min(100, Math.max(0, adherenceComponent + stiffnessComponent + romNormalized))
  );

  return {
    totalLogs: sorted.length,
    meanAdherencePct,
    morningStiffnessInitial,
    morningStiffnessCurrent,
    morningStiffnessDelta,
    sleepQualityMean,
    ankleRomMeanCm,
    ankleAsymmetryCm,
    hipInternalRotMeanDeg,
    hipAsymmetryDeg,
    thoracicRotMeanDeg,
    thoracicAsymmetryDeg,
    tmjOpeningCurrentMm: latest.romTests.tmjOpeningMm,
    lumbarSchoberCurrentCm: latest.romTests.lumbarSchoberCm,
    posturalReprogrammingScore,
    criticalAsymmetries,
    accommodatedRegions
  };
}

export function generateMonthlyAuditPrompt(
  logs: DailyAuditLog[],
  completedMesocycleNumber: number,
  subjectiveFeedback: string
): string {
  const kpis = calculateAuditKPIs(logs);
  const sorted = [...logs].sort((a, b) => a.date.localeCompare(b.date));
  const first = sorted[0];
  const latest = sorted[sorted.length - 1];

  const dAnkleL = first && latest ? (latest.romTests.ankleDorsiflexionLeftCm - first.romTests.ankleDorsiflexionLeftCm).toFixed(1) : '0.0';
  const dAnkleR = first && latest ? (latest.romTests.ankleDorsiflexionRightCm - first.romTests.ankleDorsiflexionRightCm).toFixed(1) : '0.0';
  const dHipL = first && latest ? (latest.romTests.hipInternalRotationLeftDeg - first.romTests.hipInternalRotationLeftDeg).toFixed(1) : '0.0';
  const dHipR = first && latest ? (latest.romTests.hipInternalRotationRightDeg - first.romTests.hipInternalRotationRightDeg).toFixed(1) : '0.0';
  const dThorL = first && latest ? (latest.romTests.thoracicRotationLeftDeg - first.romTests.thoracicRotationLeftDeg).toFixed(1) : '0.0';
  const dThorR = first && latest ? (latest.romTests.thoracicRotationRightDeg - first.romTests.thoracicRotationRightDeg).toFixed(1) : '0.0';

  return `[AUDITORIA E RECALIBRAÇÃO MENSAL — PROGRAMA MOBILIDADE TOTAL | MESOCICLO #${completedMesocycleNumber}]

Atue como Especialista Sênior em Biomecânica Clínica, Fisioterapia Esportiva e Osteopatia Funcional. Analise os dados auditados abaixo referentes aos últimos 30 dias (${kpis.totalLogs} sessões registradas) e recalibre meu protocolo para o Mesociclo #${completedMesocycleNumber + 1}.

1. MÉTRICAS GLOBAIS DE ADESÃO E NEUROFISIOLOGIA:
- Taxa de Adesão Média (Manhã + Noite): ${kpis.meanAdherencePct}%
- Rigidez Matinal Basal (Dia 1 -> Dia Atual): ${kpis.morningStiffnessInitial}/10 -> ${kpis.morningStiffnessCurrent}/10 (Delta: ${kpis.morningStiffnessDelta})
- Qualidade Média do Sono (Recuperação Vagal): ${kpis.sleepQualityMean}/10
- Índice Composto de Reprogramação Postural: ${kpis.posturalReprogrammingScore}/100

2. EVOLUÇÃO GONIOMÉTRICA E DELTAS DE AMPLITUDE DE MOVIMENTO (ADM):
- Dorsiflexão Talocrural (Knee-to-Wall):
  • Esquerdo: ${latest?.romTests.ankleDorsiflexionLeftCm ?? 0} cm (Delta: +${dAnkleL} cm) | Direito: ${latest?.romTests.ankleDorsiflexionRightCm ?? 0} cm (Delta: +${dAnkleR} cm) | Assimetria Bilateral: ${kpis.ankleAsymmetryCm} cm (Alvo Clínico: >= 12.0 cm, assimetria < 1.0 cm)
- Rotação Interna Coxofemoral (90° Flexão):
  • Esquerdo: ${latest?.romTests.hipInternalRotationLeftDeg ?? 0}° (Delta: +${dHipL}°) | Direito: ${latest?.romTests.hipInternalRotationRightDeg ?? 0}° (Delta: +${dHipR}°) | Assimetria Bilateral: ${kpis.hipAsymmetryDeg}° (Alvo Clínico: >= 40.0°, assimetria < 3.0°)
- Rotação Torácica Sentado com Bloqueio Lombar:
  • Esquerdo: ${latest?.romTests.thoracicRotationLeftDeg ?? 0}° (Delta: +${dThorL}°) | Direito: ${latest?.romTests.thoracicRotationRightDeg ?? 0}° (Delta: +${dThorR}°) | Assimetria Bilateral: ${kpis.thoracicAsymmetryDeg}° (Alvo Clínico: >= 55.0°, assimetria < 4.0°)
- Abertura Interincisal da ATM: ${kpis.tmjOpeningCurrentMm} mm (Alvo Clínico: >= 42.0 mm sem desvio em S/C)
- Teste de Schober Modificado (Flexão Lombar L1-S1): +${kpis.lumbarSchoberCurrentCm} cm (Alvo Clínico: >= +5.5 cm)

3. MAPA ATUAL DE DOR/TENSÃO RESIDUAL POR CADEIA CINÉTICA (0-10):
- Craniofacial / ATM / Masseter / Hioideos: ${latest?.regionalPain.craniofacialAtm ?? 0}/10
- Cervical / Suboccipitais / Escalenos: ${latest?.regionalPain.cervicalSuboccipital ?? 0}/10
- Torácica / Escapular / Peitoral Menor: ${latest?.regionalPain.thoracicScapular ?? 0}/10
- Membros Superiores (Punhos / Cotovelos / Neurodinâmica): ${latest?.regionalPain.upperLimbsWrists ?? 0}/10
- Complexo Lombo-Pélvico / Psoas / Piriforme / SIJ: ${latest?.regionalPain.lumbarPelvicSij ?? 0}/10
- Membros Inferiores (Joelhos / Tornozelos / Fáscia Plantar): ${latest?.regionalPain.hipKneeAnklePlantar ?? 0}/10

4. ASSIMETRIAS CRÍTICAS E REGIÕES COM ACOMODAÇÃO DE ESTÍMULO DETECTADAS:
- Assimetrias Ativas: ${kpis.criticalAsymmetries.length > 0 ? kpis.criticalAsymmetries.join(' | ') : 'Nenhuma assimetria crítica acima do limiar clínico.'}
- Regiões Estagnadas / Acomodadas: ${kpis.accommodatedRegions.length > 0 ? kpis.accommodatedRegions.join(' | ') : 'Nenhuma região com acomodação crítica.'}

5. RELATO CLÍNICO E PERCEPÇÃO BIOMECÂNICA DO PRATICANTE:
"${subjectiveFeedback.trim() || 'Boa tolerância ao protocolo matinal de expansão costal 360°, porém percebo resistência residual no final de curso da rotação interna do quadril esquerdo e leve tensão massetérica noturna em dias de alto estresse cognitivo.'}"

SOLICITAÇÃO DE RECALIBRAÇÃO TÉCNICA PARA O PRÓXIMO MESOCICLO (30 DIAS):
1. Substituição de Estímulos Acomodados: Indique quais exercícios atuais sofreram acomodação neural/viscoelástica e substitua-os por variações biomecânicas mais específicas (especificando vetor de força, ancoragem e cadência).
2. Correção de Assimetrias Bilaterais: Prescreva a proporção exata de volume assimétrico (ex: 2:1 ou 3:2 para o lado restrito) com técnicas Mulligan MWM/SNAG ou PAILs/RAILs direcionadas.
3. Ajuste da Matriz de Periodização (Semanas 5 a 8): Recalibre o Tempo Sob Tensão (TUT), séries e cadência respiratória matinal/noturna.`;
}
