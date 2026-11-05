import { DailyAuditLog } from '../utils/biomechanicsMath';

export interface BodyRegionCatalogItem {
  id: string;
  regionCategory: 'CRANIOFACIAL_CERVICAL' | 'TORACICA_ESCAPULAR_MMSS' | 'LOMBO_PELVICO_QUADRIL' | 'MEMBROS_INFERIORES';
  regionLabel: string;
  clinicalSyndromeOrSymptom: string;
  primaryAnatomicalStructures: string;
  biomechanicalRootCause: string;
  primaryCorrectiveProtocolId: string;
  primaryCorrectiveExerciseName: string;
  secondarySynergistExerciseName: string;
  targetVectorAndTechnique: string;
  auditKpiMetric: string;
  clinicalTargetValue: string;
  associatedGeneOrProteinTarget: {
    symbol: string;
    uniprotId: string;
    biologicalRole: string;
  };
}

export const MASTER_BODY_CATALOG: BodyRegionCatalogItem[] = [
  {
    id: 'cat-01',
    regionCategory: 'CRANIOFACIAL_CERVICAL',
    regionLabel: 'Craniofacial & Linfático Periorbital/Submandibular',
    clinicalSyndromeOrSymptom: 'Retenção Hídrica Facial Matinal, Congestão Periorbital e Empastamento Submandibular',
    primaryAnatomicalStructures: 'Ângulo Venoso (Pirogoff/Terminus), Linfonodos Submandibulares/Parotídeos, M. Orbicular dos Olhos e ECOM',
    biomechanicalRootCause: 'Hipertonicidade do ECOM e fáscia cervical média comprimindo a drenagem linfática jugular durante o decúbito prolongado.',
    primaryCorrectiveProtocolId: 'mat-01',
    primaryCorrectiveExerciseName: 'Desobstrução Linfática de Terminus, Cadeia Submandibular e Eflorescência Periorbital',
    secondarySynergistExerciseName: 'Respiração Diafragmática Biomecânica 360° (Bomba Torácica Linfática)',
    targetVectorAndTechnique: 'Pressão tangencial intermitente de 30–40 mmHg iniciando pelas fossas supraclaviculares (proximais) antes das cadeias faciais distais.',
    auditKpiMetric: 'Tensão/Congestão Craniofacial (0–10)',
    clinicalTargetValue: '<= 1.5 / 10 ao acordar',
    associatedGeneOrProteinTarget: {
      symbol: 'PROX1',
      uniprotId: 'Q92786',
      biologicalRole: 'Fator de transcrição mestre da integridade endotelial linfática e válvulas coletoras.'
    }
  },
  {
    id: 'cat-02',
    regionCategory: 'CRANIOFACIAL_CERVICAL',
    regionLabel: 'ATM, Masseter, Temporal & Cadeia Hioidea',
    clinicalSyndromeOrSymptom: 'Bruxismo de Vigília/Noturno, Estalido Articular de ATM, Dor Miofascial Massetérica e Disfonia Tensional',
    primaryAnatomicalStructures: 'Disco Articular da ATM, M. Masseter, M. Temporal, M. Pterigoideo Lateral/Medial e Osso Hioide',
    biomechanicalRootCause: 'Anteriorização cefálica (protrusão cervical) que traciona os músculos supra/infrahioideos para trás e comprime o côndilo mandibular na zona bilaminar.',
    primaryCorrectiveProtocolId: 'mat-02',
    primaryCorrectiveExerciseName: 'Auto-Mobilização da ATM + Liberação de Masseter/Temporal e Hioideos com SNAG C1-C2',
    secondarySynergistExerciseName: 'Inibição Suboccipital Noturna (C0-C2) com Reflexo Vestíbulo-Ocular',
    targetVectorAndTechnique: 'Descompressão condilar caudal-anterior + ancoragem lingual no palato + deslizamento horizontal anterior em C1-C2 (SNAG).',
    auditKpiMetric: 'Abertura Interincisal da ATM (mm)',
    clinicalTargetValue: '>= 42.0 mm sem desvio lateral',
    associatedGeneOrProteinTarget: {
      symbol: 'COL1A1',
      uniprotId: 'P02452',
      biologicalRole: 'Colágeno Tipo I estrutural da fibrocartilagem do disco da ATM e aponeurose massetérica.'
    }
  },
  {
    id: 'cat-03',
    regionCategory: 'CRANIOFACIAL_CERVICAL',
    regionLabel: 'Cervical Alta (C0-C2) & Triângulo Suboccipital',
    clinicalSyndromeOrSymptom: 'Cefaleia Cervicogênica, Tensão Suboccipital, Rigidez Rotacional do Pescoço e Fadiga Visual',
    primaryAnatomicalStructures: 'Mm. Reto Posterior Maior/Menor da Cabeça (Ponte Miodural), Oblíquos da Cabeça e Nervo Occipital Maior',
    biomechanicalRootCause: 'Hiperextensão atlanto-occipital crônica associada à fixação do olhar em telas, gerando tração da dura-máter via ponte miodural.',
    primaryCorrectiveProtocolId: 'not-01',
    primaryCorrectiveExerciseName: 'Inibição Suboccipital (C0-C2) com Reflexo Vestíbulo-Ocular',
    secondarySynergistExerciseName: 'SNAG Cervical Superior C1-C2 (Mulligan) + CARs Cervicais',
    targetVectorAndTechnique: 'Compressão isquêmica sustentada na linha nucal inferior (90s) combinada a movimentos oculares horizontais lentos sem mover o crânio.',
    auditKpiMetric: 'Inclinação Lateral Cervical Bilateral (°)',
    clinicalTargetValue: '>= 45.0° (Assimetria < 3°)',
    associatedGeneOrProteinTarget: {
      symbol: 'CHRM2',
      uniprotId: 'P08172',
      biologicalRole: 'Receptor muscarínico de acetilcolina M2 mediador da bradicardia e tônus parassimpático vagal.'
    }
  },
  {
    id: 'cat-04',
    regionCategory: 'TORACICA_ESCAPULAR_MMSS',
    regionLabel: 'Cintura Escapular, Peitoral Menor & Trapézio Superior',
    clinicalSyndromeOrSymptom: 'Ombros Protraídos (Anteriorizados), Discinesia Escapular (Alamento Inferior) e Tensão em Trapézio',
    primaryAnatomicalStructures: 'M. Peitoral Menor (Processo Coracoide), M. Serrátil Anterior, M. Elevador da Escápula e Trapézio',
    biomechanicalRootCause: 'Encurtamento adaptativo do peitoral menor inclinando anteriormente a escápula e inibindo o trapézio inferior e o serrátil anterior.',
    primaryCorrectiveProtocolId: 'not-01',
    primaryCorrectiveExerciseName: 'Pin & Stretch de Peitoral Menor e Elevador da Escápula na Parede',
    secondarySynergistExerciseName: 'CARs Escapulotorácicos e Glenoumerais com Irradiação de 30%',
    targetVectorAndTechnique: 'Compressão oblíqua medial ao processo coracoide com flexão e rotação externa ativa do ombro deslizando na parede.',
    auditKpiMetric: 'Dor/Tensão Torácica & Escapular (0–10)',
    clinicalTargetValue: '<= 2.0 / 10 e Acrômio Neutro',
    associatedGeneOrProteinTarget: {
      symbol: 'HAS2',
      uniprotId: 'Q92819',
      biologicalRole: 'Hialuronano Sintase 2 — síntese de ácido hialurônico lubrificante entre camadas fasciais peitorais.'
    }
  },
  {
    id: 'cat-05',
    regionCategory: 'TORACICA_ESCAPULAR_MMSS',
    regionLabel: 'Coluna Torácica (T1-T12) & Caixa Costal',
    clinicalSyndromeOrSymptom: 'Rigidez Torácica em Hipercifose, Restrição de Extensão/Rotação Torácica e Sobrecarga Cervical/Lombar',
    primaryAnatomicalStructures: 'Facetas Torácicas, Articulações Costovertebrais/Costotransversas e Fáscia Endotorácica',
    biomechanicalRootCause: 'Hipomobilidade das costelas verdadeiras e bloqueio em flexão de T4-T9, forçando a coluna cervical e lombar a hipermobilidade compensatória.',
    primaryCorrectiveProtocolId: 'mat-05',
    primaryCorrectiveExerciseName: 'Abertura Torácica ("Book Opener") em Base 90/90 com Expansão Costal',
    secondarySynergistExerciseName: 'ELDOA Descompressivo Axial e Respiração 360°',
    targetVectorAndTechnique: 'Rotação axial de T4-T10 com pelve bloqueada em 90/90 e inspiração direcionada ao hemitórax aberto.',
    auditKpiMetric: 'Rotação Torácica Sentado com Bloqueio Lombar (°)',
    clinicalTargetValue: '>= 55.0° bilateral (Assimetria < 4°)',
    associatedGeneOrProteinTarget: {
      symbol: 'ELN',
      uniprotId: 'P15502',
      biologicalRole: 'Elastina — complacência elástica das cápsulas costovertebrais e ligamentos amarelos.'
    }
  },
  {
    id: 'cat-06',
    regionCategory: 'TORACICA_ESCAPULAR_MMSS',
    regionLabel: 'Membros Superiores (Punhos, Cotovelos & Túnel do Carpo)',
    clinicalSyndromeOrSymptom: 'Rigidez de Punho/Antebraço por Digitação, Epicondilalgia Lateral/Medial e Tensão do Nervo Mediano/Ulnar',
    primaryAnatomicalStructures: 'Articulação Radiocarpal, Retináculo dos Flexores, Nervo Mediano, Nervo Ulnar e Pronador Redondo',
    biomechanicalRootCause: 'Aderência perineural no desfiladeiro torácico/pronador redondo e déficit de deslizamento dorsal do carpo na extensão de punho.',
    primaryCorrectiveProtocolId: 'mat-04',
    primaryCorrectiveExerciseName: 'Deslizamento Neurodinâmico ("Sliders" Mediano/Ulnar) + CARs de Punho e Cotovelo',
    secondarySynergistExerciseName: 'Pin & Stretch de Peitoral Menor (Desfiladeiro Torácico)',
    targetVectorAndTechnique: 'Mobilização neural em excursão ("Slider": extensão de punho + inclinação cervical homolateral sem tensionar ambas as pontas simultaneamente).',
    auditKpiMetric: 'Dor/Tensão em Punhos e Membros Superiores (0–10)',
    clinicalTargetValue: '<= 1.0 / 10 e Extensão de Punho >= 75°',
    associatedGeneOrProteinTarget: {
      symbol: 'PIEZO1',
      uniprotId: 'Q92508',
      biologicalRole: 'Canal iônico mecanossensível ativado por cisalhamento hidrodinâmico e tensão tecidual.'
    }
  },
  {
    id: 'cat-07',
    regionCategory: 'TORACICA_ESCAPULAR_MMSS',
    regionLabel: 'Diafragma & Rebordo Costal Inferior (T7-L3)',
    clinicalSyndromeOrSymptom: 'Respiração Apical Curta, Costelas Inferiores Abertas ("Rib Flare") e Hipertonia Simpática',
    primaryAnatomicalStructures: 'Cúpula Diafragmática, Pilares Diafragmáticos (L1-L3), Ligamento Arqueado Medial (Psoas) e Lateral (QL)',
    biomechanicalRootCause: 'Perda da Zona de Aposição (ZOA) com diafragma achatado em estado inspiratório crônico, tracionando L1-L3 em hiperlordose.',
    primaryCorrectiveProtocolId: 'mat-03',
    primaryCorrectiveExerciseName: 'Liberação Manual do Rebordo Costal + Respiração Diafragmática 360° e PIA',
    secondarySynergistExerciseName: 'Protocolo Vagal Noturno 4-7-8 + Suspiro Fisiológico Duplo',
    targetVectorAndTechnique: 'Coaptação das costelas inferiores na expiração labial (6s) mantendo expansão lateral e posterior de 360° na inspiração subsequente.',
    auditKpiMetric: 'Rigidez Matinal Global (1–10) & Qualidade do Sono (1–10)',
    clinicalTargetValue: 'Rigidez <= 2/10 | Sono >= 8.5/10',
    associatedGeneOrProteinTarget: {
      symbol: 'NOS3',
      uniprotId: 'P29474',
      biologicalRole: 'Óxido Nítrico Sintase Endotelial — vasodilatação induzida por respiração nasal e shear stress.'
    }
  },
  {
    id: 'cat-08',
    regionCategory: 'LOMBO_PELVICO_QUADRIL',
    regionLabel: 'Coluna Lombar (L1-S1) & Quadrado Lombar',
    clinicalSyndromeOrSymptom: 'Compressão Discogênica/Facetária L4-L5-S1, Rigidez Lombar ao Levantar e Espasmo de Quadrado Lombar',
    primaryAnatomicalStructures: 'Disco Intervertebral L4-L5 e L5-S1, M. Quadrado Lombar, M. Multífidos e Fáscia Toracolombar',
    biomechanicalRootCause: 'Desidratação discal axial associada a bloqueio de rotação interna de quadril e hiperatividade estabilizadora unilateral do quadrado lombar.',
    primaryCorrectiveProtocolId: 'mat-04',
    primaryCorrectiveExerciseName: 'ELDOA Descompressivo Axial L5-S1 (60s) + Liberação Noturna de Quadrado Lombar',
    secondarySynergistExerciseName: 'Descompressão Lombar Passiva Psoas-Relax com Tração Caudal nas EIAS',
    targetVectorAndTechnique: 'Decoaptação axial ativa com pelve fixa e membros inferiores a 90° em dorsiflexão e rotação interna femoral.',
    auditKpiMetric: 'Teste de Schober Modificado (Excursão Lombar em cm)',
    clinicalTargetValue: '>= +5.5 cm de excursão flexora sem dor',
    associatedGeneOrProteinTarget: {
      symbol: 'ACAN',
      uniprotId: 'P16112',
      biologicalRole: 'Agrecano — proteoglicano responsável pela pressão osmótica e hidratação do núcleo pulposo.'
    }
  },
  {
    id: 'cat-09',
    regionCategory: 'LOMBO_PELVICO_QUADRIL',
    regionLabel: 'Complexo Iliopsoas & Anteroversão Pélvica',
    clinicalSyndromeOrSymptom: 'Anteroversão Pélvica Excessiva, Hiperlordose Lombar, Pinçamento Anterior do Quadril e Inibição Glútea',
    primaryAnatomicalStructures: 'M. Psoas Maior (T12-L5 ao Trocânter Menor), M. Ilíaco, M. Reto Femoral e Fáscia Ilíaca',
    biomechanicalRootCause: 'Encurtamento adaptativo por postura sentada prolongada gerando inibição recíproca (Lei de Sherrington) sobre o glúteo máximo e transverso abdominal.',
    primaryCorrectiveProtocolId: 'not-04',
    primaryCorrectiveExerciseName: 'FNP Contração-Relaxamento (CRAC) de Iliopsoas em Meio-Ajoelhado com Retroversão Pélvica',
    secondarySynergistExerciseName: 'Respiração 360° com Coaptação Costo-Pélvica 90/90',
    targetVectorAndTechnique: 'Retroversão pélvica ativa + contração isométrica de flexão de quadril no solo (6s a 40%) seguida de contração glútea agonista (20s).',
    auditKpiMetric: 'Dor/Tensão Lombo-Pélvica (0–10)',
    clinicalTargetValue: '<= 2.0 / 10 e Teste de Thomas Neutro',
    associatedGeneOrProteinTarget: {
      symbol: 'TTN',
      uniprotId: 'Q8WZ42',
      biologicalRole: 'Titina — proteína gigante do sarcômero que regula a rigidez elástica passiva miofibrilar.'
    }
  },
  {
    id: 'cat-10',
    regionCategory: 'LOMBO_PELVICO_QUADRIL',
    regionLabel: 'Articulação Sacroilíaca (SIJ) & M. Piriforme',
    clinicalSyndromeOrSymptom: 'Dor Sacroilíaca Unilateral, Falsa Ciatalgia (Síndrome do Piriforme) e Sensação de Pelve "Torcida"',
    primaryAnatomicalStructures: 'Articulação Sacroilíaca, Ligamento Sacrotuberal, M. Piriforme e Pelvitrocantéricos',
    biomechanicalRootCause: 'Assimetria rotacional inominada (ilíaco anterior de um lado e posterior do outro) hiperativando o piriforme para estabilizar o sacro.',
    primaryCorrectiveProtocolId: 'not-03',
    primaryCorrectiveExerciseName: 'Reset Sacroilíaco (MET de Força de Casal Isométrica) + Liberação de Piriforme com Mobilização',
    secondarySynergistExerciseName: 'Transições Dinâmicas de Quadril 90/90',
    targetVectorAndTechnique: 'Força de casal isométrica oposta nos fêmures (3x 6s a 30% de esforço) seguida de coaptação adutora da sínfise púbica.',
    auditKpiMetric: 'Simetria de Rotação Interna de Quadril (°)',
    clinicalTargetValue: 'Diferença bilateral < 3.0°',
    associatedGeneOrProteinTarget: {
      symbol: 'COL3A1',
      uniprotId: 'P02461',
      biologicalRole: 'Colágeno Tipo III — plasticidade e reparo de fáscias profundas e ligamentos sacroilíacos.'
    }
  },
  {
    id: 'cat-11',
    regionCategory: 'LOMBO_PELVICO_QUADRIL',
    regionLabel: 'Cápsula Coxofemoral (Rotação Interna & Externa)',
    clinicalSyndromeOrSymptom: 'Bloqueio de Rotação Interna do Quadril, Rigidez ao Agachar Profundo e Compensação em Valgo Dinâmico de Joelho',
    primaryAnatomicalStructures: 'Cápsula Articular Posteroinferior e Superior do Quadril, Ligamento Iliofemoral e Isquiofemoral',
    biomechanicalRootCause: 'Restrição capsular posterior que impede o deslizamento posterior da cabeça femoral durante a flexão e rotação interna.',
    primaryCorrectiveProtocolId: 'mat-05',
    primaryCorrectiveExerciseName: 'Transições de Quadril 90/90 com Inclinação Anterior e Rotação Interna Ativa',
    secondarySynergistExerciseName: 'Tração Axial Femoroacetabular Noturna',
    targetVectorAndTechnique: 'Torque rotacional interno ativo do fêmur posterior na base 90/90 mantendo ambos os ísquios ancorados.',
    auditKpiMetric: 'Rotação Interna de Quadril a 90° de Flexão (°)',
    clinicalTargetValue: '>= 40.0° bilateral',
    associatedGeneOrProteinTarget: {
      symbol: 'PRG4',
      uniprotId: 'Q92954',
      biologicalRole: 'Proteoglicano 4 (Lubricina) — lubrificação limite da cartilagem hialina coxofemoral.'
    }
  },
  {
    id: 'cat-12',
    regionCategory: 'MEMBROS_INFERIORES',
    regionLabel: 'Tornozelo (Talocrural), Joelho & Fáscia Plantar',
    clinicalSyndromeOrSymptom: 'Limitação de Dorsiflexão de Tornozelo, Pinçamento Anterior Talocrural, Rigidez de Aquiles e Fasciíte Plantar Matinal',
    primaryAnatomicalStructures: 'Articulação Talocrural (Tálus/Tíbia), Tríceps Sural (Sóleo/Gastrocnêmio) e Aponeurose Plantar',
    biomechanicalRootCause: 'Subluxação anterior micro-funcional do tálus impedindo seu deslizamento posterior durante a dorsiflexão, associada a densificação da fáscia plantar.',
    primaryCorrectiveProtocolId: 'mat-05',
    primaryCorrectiveExerciseName: 'MWM de Tornozelo em Dorsiflexão (Mulligan) + Cisalhamento Noturno da Fáscia Plantar (Windlass)',
    secondarySynergistExerciseName: 'FNP de Cadeia Posterior com Faixa no Mediopé',
    targetVectorAndTechnique: 'Estabilização manual/elástica posteroinferior sobre o colo do tálus enquanto a tíbia avança sobre o 2º metatarso.',
    auditKpiMetric: 'Teste Knee-to-Wall de Dorsiflexão (cm)',
    clinicalTargetValue: '>= 12.0 cm bilateral (Assimetria < 1.0 cm)',
    associatedGeneOrProteinTarget: {
      symbol: 'COMP',
      uniprotId: 'P49747',
      biologicalRole: 'Proteína Oligomérica da Matriz da Cartilagem — resistência à carga compressiva tendínea e talocrural.'
    }
  }
];

export const INITIAL_AUDIT_LOGS: DailyAuditLog[] = [
  {
    id: 'audit-01',
    date: '2026-10-06',
    shift: 'AMBOS',
    adherencePct: 80,
    morningStiffness: 7,
    sleepQuality: 6,
    regionalPain: {
      craniofacialAtm: 5,
      cervicalSuboccipital: 6,
      thoracicScapular: 5,
      upperLimbsWrists: 3,
      lumbarPelvicSij: 6,
      hipKneeAnklePlantar: 5
    },
    romTests: {
      ankleDorsiflexionLeftCm: 8.5,
      ankleDorsiflexionRightCm: 10.5,
      hipInternalRotationLeftDeg: 27,
      hipInternalRotationRightDeg: 34,
      thoracicRotationLeftDeg: 41,
      thoracicRotationRightDeg: 47,
      cervicalLateralFlexionLeftDeg: 35,
      cervicalLateralFlexionRightDeg: 39,
      tmjOpeningMm: 35,
      lumbarSchoberCm: 4.0
    },
    notes: 'Mapeamento Basal (Dia 1): Restrição marcada em dorsiflexão esquerda (8.5 cm) e rotação interna de quadril esquerdo (27°). Tensão suboccipital e massetérica ao acordar.'
  },
  {
    id: 'audit-02',
    date: '2026-10-11',
    shift: 'AMBOS',
    adherencePct: 90,
    morningStiffness: 6,
    sleepQuality: 7,
    regionalPain: {
      craniofacialAtm: 4,
      cervicalSuboccipital: 5,
      thoracicScapular: 4,
      upperLimbsWrists: 2,
      lumbarPelvicSij: 5,
      hipKneeAnklePlantar: 4
    },
    romTests: {
      ankleDorsiflexionLeftCm: 9.0,
      ankleDorsiflexionRightCm: 10.8,
      hipInternalRotationLeftDeg: 29,
      hipInternalRotationRightDeg: 35,
      thoracicRotationLeftDeg: 44,
      thoracicRotationRightDeg: 49,
      cervicalLateralFlexionLeftDeg: 37,
      cervicalLateralFlexionRightDeg: 40,
      tmjOpeningMm: 37,
      lumbarSchoberCm: 4.3
    },
    notes: 'Final da Semana 1: Drenagem supraclavicular/periorbital reduziu retenção facial matinal. Domínio da respiração 360°.'
  },
  {
    id: 'audit-03',
    date: '2026-10-18',
    shift: 'AMBOS',
    adherencePct: 95,
    morningStiffness: 5,
    sleepQuality: 8,
    regionalPain: {
      craniofacialAtm: 3,
      cervicalSuboccipital: 3,
      thoracicScapular: 3,
      upperLimbsWrists: 2,
      lumbarPelvicSij: 4,
      hipKneeAnklePlantar: 3
    },
    romTests: {
      ankleDorsiflexionLeftCm: 9.8,
      ankleDorsiflexionRightCm: 11.4,
      hipInternalRotationLeftDeg: 32,
      hipInternalRotationRightDeg: 37,
      thoracicRotationLeftDeg: 47,
      thoracicRotationRightDeg: 52,
      cervicalLateralFlexionLeftDeg: 40,
      cervicalLateralFlexionRightDeg: 42,
      tmjOpeningMm: 40,
      lumbarSchoberCm: 4.8
    },
    notes: 'Final da Semana 2 (TUT 60s + Pin & Stretch): Desbloqueio expressivo de peitoral menor e melhora na qualidade do sono com protocolo vagal 4-7-8.'
  },
  {
    id: 'audit-04',
    date: '2026-10-26',
    shift: 'AMBOS',
    adherencePct: 92,
    morningStiffness: 4,
    sleepQuality: 8,
    regionalPain: {
      craniofacialAtm: 2,
      cervicalSuboccipital: 3,
      thoracicScapular: 2,
      upperLimbsWrists: 1,
      lumbarPelvicSij: 4,
      hipKneeAnklePlantar: 2
    },
    romTests: {
      ankleDorsiflexionLeftCm: 10.3,
      ankleDorsiflexionRightCm: 11.8,
      hipInternalRotationLeftDeg: 34,
      hipInternalRotationRightDeg: 39,
      thoracicRotationLeftDeg: 51,
      thoracicRotationRightDeg: 55,
      cervicalLateralFlexionLeftDeg: 42,
      cervicalLateralFlexionRightDeg: 44,
      tmjOpeningMm: 42,
      lumbarSchoberCm: 5.2
    },
    notes: 'Semana 3 (End-Range PAILs/RAILs & ELDOA L5-S1): Abertura interincisal da ATM atingiu 42 mm sem clique; porém persiste assimetria de 1.5 cm no tornozelo esquerdo.'
  },
  {
    id: 'audit-05',
    date: '2026-11-04',
    shift: 'AMBOS',
    adherencePct: 100,
    morningStiffness: 3,
    sleepQuality: 9,
    regionalPain: {
      craniofacialAtm: 2,
      cervicalSuboccipital: 2,
      thoracicScapular: 2,
      upperLimbsWrists: 1,
      lumbarPelvicSij: 4,
      hipKneeAnklePlantar: 2
    },
    romTests: {
      ankleDorsiflexionLeftCm: 10.4,
      ankleDorsiflexionRightCm: 12.1,
      hipInternalRotationLeftDeg: 35,
      hipInternalRotationRightDeg: 41,
      thoracicRotationLeftDeg: 53,
      thoracicRotationRightDeg: 56,
      cervicalLateralFlexionLeftDeg: 44,
      cervicalLateralFlexionRightDeg: 45,
      tmjOpeningMm: 43,
      lumbarSchoberCm: 5.5
    },
    notes: 'Fechamento da Semana 4 (Reavaliação de 30 dias): Rigidez matinal caiu de 7/10 para 3/10. Pronta para recalibração de estímulos acomodados em quadril/tornozelo esquerdos.'
  }
];

export const DATABASE_SCHEMA_SPEC = [
  {
    tableName: 'daily_mobility_logs',
    description: 'Tabela Fato de Auditoria Diária de Adesão, Neurofisiologia e Rigidez Basal',
    columns: [
      { name: 'id', type: 'UUID PRIMARY KEY', constraint: 'NOT NULL', auditRole: 'Identificador único da sessão auditada' },
      { name: 'log_date', type: 'DATE', constraint: 'NOT NULL UNIQUE', auditRole: 'Data cronológica para séries temporais (YYYY-MM-DD)' },
      { name: 'shift_completed', type: "ENUM('MANHA','NOITE','AMBOS')", constraint: 'NOT NULL', auditRole: 'Rastreamento de consistência circadiana' },
      { name: 'adherence_pct', type: 'NUMERIC(5,2)', constraint: 'CHECK (0..100)', auditRole: 'Percentual do Tempo Sob Tensão (TUT) prescrito executado' },
      { name: 'morning_stiffness_vas', type: 'SMALLINT', constraint: 'CHECK (1..10)', auditRole: 'Biomarcador subjetivo de hidratação fascial e tônus basal ao despertar' },
      { name: 'sleep_quality_score', type: 'SMALLINT', constraint: 'CHECK (1..10)', auditRole: 'Eficiência da downregulation vagal noturna (correlação VFC)' }
    ]
  },
  {
    tableName: 'standardized_rom_assessments',
    description: 'Tabela de Biometria Goniométrica e Testes Ortopédicos Padronizados (Unidades SI: cm, graus, mm)',
    columns: [
      { name: 'assessment_id', type: 'UUID PRIMARY KEY', constraint: 'REFERENCES daily_mobility_logs(id)', auditRole: 'Chave estrangeira 1:1 com o log diário' },
      { name: 'ankle_df_left_cm / right_cm', type: 'NUMERIC(4,1)', constraint: 'Alvo >= 12.0 cm', auditRole: 'Weight-Bearing Lunge Test (Knee-to-Wall) — artrocinemática talocrural' },
      { name: 'hip_ir_left_deg / right_deg', type: 'NUMERIC(4,1)', constraint: 'Alvo >= 40.0°', auditRole: 'Goniometria de rotação interna coxofemoral a 90° de flexão' },
      { name: 'thoracic_rot_left_deg / right_deg', type: 'NUMERIC(4,1)', constraint: 'Alvo >= 55.0°', auditRole: 'Rotação torácica sentado com bloqueio lombar (bastão/inclinômetro)' },
      { name: 'cervical_lat_flex_left_deg / right_deg', type: 'NUMERIC(4,1)', constraint: 'Alvo >= 45.0°', auditRole: 'Excursão lateral cervical C0-C7 sem elevação de acrômio' },
      { name: 'tmj_interincisal_mm', type: 'NUMERIC(4,1)', constraint: 'Alvo >= 42.0 mm', auditRole: 'Abertura bucal máxima livre de dor ou deflexão condilar' },
      { name: 'lumbar_schober_delta_cm', type: 'NUMERIC(3,1)', constraint: 'Alvo >= +5.5 cm', auditRole: 'Teste de Schober Modificado (10 cm acima / 5 cm abaixo de L5-S1)' }
    ]
  },
  {
    tableName: 'regional_tension_matrix',
    description: 'Mapeamento de Tensão Miofascial e Dor Referida por Cadeia Cinética (Escala 0-10)',
    columns: [
      { name: 'craniofacial_atm_score', type: 'SMALLINT (0..10)', constraint: 'Limiar Alerta >= 4', auditRole: 'Masseter, temporal, pterigoideos, hioideos e congestão linfática' },
      { name: 'cervical_suboccipital_score', type: 'SMALLINT (0..10)', constraint: 'Limiar Alerta >= 4', auditRole: 'Triângulo suboccipital C0-C2, escalenos e ECOM' },
      { name: 'thoracic_scapular_score', type: 'SMALLINT (0..10)', constraint: 'Limiar Alerta >= 4', auditRole: 'Peitoral menor, trapézio superior, elevador da escápula e costelas' },
      { name: 'upper_limbs_neuro_score', type: 'SMALLINT (0..10)', constraint: 'Limiar Alerta >= 4', auditRole: 'Punhos, epicôndilos e mecanossensibilidade mediana/ulnar' },
      { name: 'lumbar_pelvic_sij_score', type: 'SMALLINT (0..10)', constraint: 'Limiar Alerta >= 4', auditRole: 'Quadrado lombar, iliopsoas, piriforme e articulação sacroilíaca' },
      { name: 'lower_limbs_plantar_score', type: 'SMALLINT (0..10)', constraint: 'Limiar Alerta >= 4', auditRole: 'Poplíteo, tríceps sural, tálus e aponeurose plantar' }
    ]
  }
];
