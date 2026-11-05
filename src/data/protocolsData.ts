export interface ExerciseProtocolItem {
  id: string;
  shift: 'MANHA' | 'NOITE';
  blockNumber: number;
  blockTitle: string;
  name: string;
  anatomicalTarget: string;
  fascialChain: string;
  clinicalConcept: string;
  forceVector: string;
  anchorPoints: string;
  stepByStepExecution: string[];
  respiratoryPattern: {
    inhaleSec: number;
    holdFullSec: number;
    exhaleSec: number;
    holdEmptySec: number;
    cadenceLabel: string;
    biomechanicalRationale: string;
  };
  tutSeconds: number;
  sets: number;
  repsOrCycles: string;
  executionCadence: string;
  discomfortScaleTarget: string;
  targetAdmMetric: string;
  contraindicationsAndSafety: string;
  molecularMechanobiologyTag: string;
}

export const DAILY_PROTOCOLS_DATA: ExerciseProtocolItem[] = [
  // ============================================================================
  // PROTOCOLO MATINAL (15-20 MIN | HIDRATAÇÃO FASCIAL, DESCOMPRESSÃO AXIAL, DRENAGEM CRANIOFACIAL E ATIVAÇÃO NEUROMUSCULAR)
  // ============================================================================
  {
    id: 'mat-01',
    shift: 'MANHA',
    blockNumber: 1,
    blockTitle: '1. Drenagem Linfática Craniofacial, ATM & Descompressão Cervical Alta',
    name: 'Desobstrução Linfática de Terminus (Ângulo de Pirogoff), Cadeia Submandibular/Parotídea e Eflorescência Periorbital',
    anatomicalTarget: 'Ducto Torácico / Linfático Direito (Fossa Supraclavicular), Linfonodos Submandibulares, Parotídeos, Pré-Auriculares e Plexo Linfático Periorbital (M. Orbicular dos Olhos)',
    fascialChain: 'Fáscia Cervical Superficial e Lâmina Pré-Traqueal / Sistema Linfático Craniofacial',
    clinicalConcept: 'Drenagem Linfática Manual Autoguiada (Conceito Vodder / Leduc — Pressão Intermitente 30–40 mmHg)',
    forceVector: 'Vetor centrípeto estrito proximal-distal reverso: desobstrução supraclavicular (posteroinferior) -> cadeia jugular interna (caudal) -> submandibular (medial-lateral -> caudal) -> periorbital (medial para temporal).',
    anchorPoints: 'Polpa digital dos dedos indicador e médio bilateralmente nas fossas supraclaviculares (acima do terço medial da clavícula, lateral ao ECOM).',
    stepByStepExecution: [
      '1. Abertura de Terminus (Fossa Supraclavicular): Posicione os dedos indicador e médio nas fossas supraclaviculares. Realize 10 bombeamentos rítmicos suaves para dentro e para baixo (vetor inferomedial) durante a fase expiratória para criar gradiente de pressão negativa no ângulo venoso.',
      '2. Cadeia Jugulodigástrica (ECOM): Deslize com pressão de pele (sem friccionar o músculo profundo) do processo mastoide até a clavícula por 8 ciclos.',
      '3. Drenagem Submandibular e Submentoniana: Sob a borda inferior da mandíbula, traga a linfa do mento até o ângulo goníaco mandibular com movimentos semicirculares de bombeamento (8 repetições) e desça pelo ECOM.',
      '4. Descongestionamento Parotídeo e Pré-Auricular: Com os dedos em "V" (indicador atrás da orelha, médio à frente do trago), realize 8 deslizamentos caudais em direção ao ângulo mandibular.',
      '5. Drenagem Periorbital e Nasojugal: Com os dedos anelares (menor pressão), realize micro-bombeamentos do canto interno do olho (glabela/canal lacrimal) seguindo pela borda infraorbital até as têmporas, finalizando com descida pré-auricular até a fossa supraclavicular.'
    ],
    respiratoryPattern: {
      inhaleSec: 4,
      holdFullSec: 1,
      exhaleSec: 6,
      holdEmptySec: 1,
      cadenceLabel: '4s IN Nasal : 1s HOLD : 6s EX (Bombeamento na Expiração)',
      biomechanicalRationale: 'A pressão intratorácica negativa na inspiração combinada à compressão supraclavicular na expiração duplica o fluxo da cisterna do quilo e do ducto linfático cervical.'
    },
    tutSeconds: 120,
    sets: 1,
    repsOrCycles: '10 bombeamentos por estação linfonodal (4 estações sequenciais)',
    executionCadence: '1 bombeamento a cada 2 segundos (pressão tangencial de 30 mmHg)',
    discomfortScaleTarget: '0.5 a 1.0 / 10 (Pressão estritamente epifascial; proibido causar hiperemia por atrito)',
    targetAdmMetric: 'Redução de edema periorbital/submandibular matinal e livre deslizamento cutâneo cervical',
    contraindicationsAndSafety: 'Contraindicado em vigência de infecção aguda orofaríngea/odontogênica, trombose venosa jugular ou hipersensibilidade do seio carotídeo (nunca comprimir bilateralmente a cartilagem tireóidea/bifurcação carotídea).',
    molecularMechanobiologyTag: 'PROX1 / VEGFR3 / Pressão Intersticial Linfática'
  },
  {
    id: 'mat-02',
    shift: 'MANHA',
    blockNumber: 1,
    blockTitle: '1. Drenagem Linfática Craniofacial, ATM & Descompressão Cervical Alta',
    name: 'Auto-Mobilização da ATM (Descompressão Condilar Caudal) + Liberação de Masseter, Temporal e Supra/Infrahioideos com SNAG C1-C2',
    anatomicalTarget: 'Articulação Temporomandibular (Disco Articular / Cápsula), M. Masseter (Feixe Superficial e Profundo), M. Temporal, M. Pterigoideo Medial, Musculatura Hioidea e Complexo Atlanto-Axial (C1-C2)',
    fascialChain: 'Linha Profunda Anterior (Trilho Miofascial Cranio-Mandibular-Hioideo)',
    clinicalConcept: 'Descompressão Articular Condilar + Mobilização Miofascial + Conceito Mulligan SNAG (Sustained Natural Apophyseal Glide)',
    forceVector: 'Tração mandibular em vetor caudal-anterior (2–3 mm) associada a cisalhamento miofascial transversal no masseter e vetor anterossuperior a 45° no arco posterior de C1/C2.',
    anchorPoints: 'Polegar ou borda radial do indicador ancorado no processo mastoide/arco de C1; mão oposta estabilizando o osso hioide ou arco zigomático.',
    stepByStepExecution: [
      '1. Liberação Miofascial de Masseter e Temporal: Com a mandíbula em posição de repouso fisiológico (lábios selados, dentes desencostados a 2 mm, língua no palato na papila incisiva), aplique pressão perpendicular com 2 dedos no ventre do masseter (abaixo do arco zigomático). Realize abertura bucal controlada até 25 mm mantendo a pressão por 5 ciclos; repita nas fibras anteriores e médias do músculo temporal.',
      '2. Mobilização Hioidea Lateral: Segure delicadamente o corpo do osso hioide entre o polegar e o indicador. Desloque-o lateralmente (direita/esquerda) sentindo a barreira fascial, mantendo 10 segundos para cada lado enquanto realiza deglutição seca ou protrusão lingual suave.',
      '3. SNAG Cervical Superior (C1-C2): Envolva a região posterior de C1-C2 com a borda medial dos dedos médios (ou faixa fina), aplicando vetor horizontal anterior (em direção aos olhos). Mantendo esse glide sustentado sem dor, realize rotação cervical ativa lenta para o lado restrito (6 repetições por lado).'
    ],
    respiratoryPattern: {
      inhaleSec: 4,
      holdFullSec: 2,
      exhaleSec: 6,
      holdEmptySec: 0,
      cadenceLabel: '4s IN Nasal (Língua no Palato) : 2s HOLD : 6s EX Nasal',
      biomechanicalRationale: 'A ancoragem lingual na papila incisiva estabiliza a cadeia hioidea e inibe reciprocamente a hiperatividade dos depressores mandibulares e suboccipitais.'
    },
    tutSeconds: 150,
    sets: 2,
    repsOrCycles: '6 aberturas controladas (Masseter/Temporal) + 6 rotações SNAG C1-C2 por lado',
    executionCadence: '3s abertura/rotação : 2s isometria : 3s retorno excêntrico',
    discomfortScaleTarget: '3.0 a 4.0 / 10 no ventre do masseter; 0/10 de dor intra-articular na ATM ou cervical',
    targetAdmMetric: 'Abertura interincisal >= 42 mm sem deflexão em "C" ou "S"; Rotação cervical >= 75° bilateral',
    contraindicationsAndSafety: 'Suspender imediatamente SNAG cervical se houver tontura, nistagmo, diplopia ou parestesia (sinais de insuficiência vertebrobasilar). Não forçar abertura bucal além do clique recíproco doloroso.',
    molecularMechanobiologyTag: 'COL1A1 / HAS2 / Lubrificação por Lubricina (PRG4) no Disco da ATM'
  },
  {
    id: 'mat-03',
    shift: 'MANHA',
    blockNumber: 2,
    blockTitle: '2. Respiração Diafragmática Biomecânica 360° & Mobilização Costal',
    name: 'Liberação Manual do Rebordo Costal (T7-T12) + Expansão Costal Tridimensional 360° e Pressurização Intra-Abdominal (PIA)',
    anatomicalTarget: 'Cúpula Diafragmática (Zona de Aposição - ZOA), M. Transverso do Abdome, Intercostais Internos/Externos, Articulações Costovertebrais e Costotransversas (T6-T12)',
    fascialChain: 'Linha Profunda Anterior (Diafragma — Fáscia Endotorácica — Fáscia Transversalis — Psoas Maior)',
    clinicalConcept: 'Reprogramação da Zona de Aposição (Conceito PRI - Postural Restoration Institute & Estabilização Neuromuscular Dinâmica - DNS)',
    forceVector: 'Vetor centrífugo 360° na inspiração (expansão lateral das costelas 7–10 em "alça de balde", expansão anterior esternal em "braço de bomba" e expansão posterolateral no mediastino posterior).',
    anchorPoints: 'Decúbito dorsal com quadris e joelhos a 90° apoiados em superfície elevada, pelve em leve retroversão neutra (costelas inferiores alinhadas com EIAS).',
    stepByStepExecution: [
      '1. Liberação Manual Subcostal do Diafragma: Em decúbito dorsal com joelhos flexionados, deslize a ponta dos dedos sob o rebordo costal inferior (costelas 7 a 10) durante a expiração, ganhando profundidade suavemente por 5 ciclos respiratórios.',
      '2. Posicionamento de Coaptação Costo-Pélvica: Eleve os calcanhares sobre um banco (90/90), pressione levemente os calcanhares para baixo para ativar isquiotibiais proximais (~15% de esforço) e destravar a hiperlordose lombar.',
      '3. Ciclo Respiratório 360° com Feedback Tátil: Posicione os polegares nas costelas posterolaterais inferiores e os demais dedos na parede abdominal anterolateral. Inspire pelo nariz por 4 segundos expandindo simultaneamente os polegares (costas) e os dedos laterais, mantendo o esterno baixo.',
      '4. Expiração com Pressurização Intra-Abdominal (PIA): Expire lentamente pela boca (freio labial) por 6 segundos até abaixar as costelas inferiores, sustente 2 segundos de apneia mantendo a tensão cilíndrica abdominal (PIA) e inicie a próxima inspiração sem perder o cinturão abdominal.'
    ],
    respiratoryPattern: {
      inhaleSec: 4,
      holdFullSec: 2,
      exhaleSec: 6,
      holdEmptySec: 2,
      cadenceLabel: '4s IN 360° : 2s HOLD (PIA) : 6s EX Labial : 2s HOLD (Costelas Baixas)',
      biomechanicalRationale: 'Restaura a aposição cilíndrica entre a cúpula diafragmática e o assoalho pélvico, descomprimindo as facetas lombares via pressurização hidrostática visceral.'
    },
    tutSeconds: 180,
    sets: 2,
    repsOrCycles: '8 ciclos respiratórios completos por série',
    executionCadence: '14 segundos por ciclo respiratório completo',
    discomfortScaleTarget: '2.0 a 3.0 / 10 (Sensação de trabalho muscular profundo em oblíquos internos/transverso)',
    targetAdmMetric: 'Excursão cirtométrica xifoide >= +4.5 cm entre expiração máxima e inspiração 360°',
    contraindicationsAndSafety: 'Evitar manobra de Valsalva excessiva em hipertensos não controlados ou hérnia de hiato sintomática; manter glote semiaberta no freio labial.',
    molecularMechanobiologyTag: 'PIEZO1 / Mecanotransdução Frênica / Coaptação Toracolombar'
  },
  {
    id: 'mat-04',
    shift: 'MANHA',
    blockNumber: 3,
    blockTitle: '3. Auto-Mobilização Articular Global (CARs) & Descompressão Axial de Coluna',
    name: 'CARs Articulares Encadeados (Cervical, Escapulotorácico, Glenoumeral, Punho/Neurodinâmica) + ELDOA Descompressivo L5-S1 e T8-T9',
    anatomicalTarget: 'Cápsulas Articulares de Coluna Cervical/Torácica, Complexo Glenoumeral, Articulações Radiocarpal/Cotovelo (Nervo Mediano/Ulnar) e Espaço Intervertebral L5-S1',
    fascialChain: 'Linha Superficial Posterior, Linha Profunda Anterior e Linhas Profunda/Superficial dos Braços',
    clinicalConcept: 'FRC (Functional Range Conditioning — CARs com Irradiação 30%) + ELDOA (Étirements Longitudinaux avec Decoaptation Ostéo-Articulaire - Guy Voyer)',
    forceVector: 'Rotação articular no limite externo da cápsula (CARs) + Vetor de decoaptação longitudinal bidirecional na coluna (sacro fixo no solo enquanto o vértice craniano e os calcanhares tracionam a fáscia em sentidos opostos).',
    anchorPoints: 'Para o ELDOA L5-S1: Isquios e sacro totalmente apoiados a 2 cm da parede, membros inferiores a 90° na parede com dorsiflexão máxima, rotação interna de fêmur e braços em abdução/extensão axial a 180°.',
    stepByStepExecution: [
      '1. CARs Cervicais e Escapulares: Com irradiação corporal de 30% (punhos cerrados, abdome pressurizado), execute 3 círculos articulares lentos e máximos da cervical (flexão -> inclinação -> extensão controlada -> rotação) e 4 rotações escapulares puras (elevação -> retração -> depressão -> protração) sem flexionar cotovelos.',
      '2. CARs Glenoumerais e Deslizamento Neurodinâmico de Membro Superior: Realize 3 círculos completos de ombro por lado (flexão máxima -> rotação interna no ponto crítico -> extensão/hiperextensão -> retorno). Em seguida, com braço abduzido a 90°, alterne extensão de punho com inclinação cervical homolateral ("Slider" do Nervo Mediano, 6 repetições).',
      '3. Descompressão Axial Ativa (ELDOA L5-S1): Deite-se com glúteos encostados na parede e pernas estendidas verticalmente. Empurre os calcanhares para o teto (dorsiflexão máxima + extensão de joelhos + leve rotação interna femoral para tensionar a fáscia lata/ciático). Eleve os braços acima da cabeça com punhos estendidos, empurrando as palmas contra a parede oposta enquanto traciona o topo do crânio (retração cervical) por 60 segundos contínuos.'
    ],
    respiratoryPattern: {
      inhaleSec: 3,
      holdFullSec: 1,
      exhaleSec: 5,
      holdEmptySec: 0,
      cadenceLabel: '3s IN Costal : 1s HOLD : 5s EX Mantendo Tração Axial',
      biomechanicalRationale: 'A manutenção da respiração fluida sob tensão miofascial longitudinal extrema promove embebição hídrica do núcleo pulposo intervertebral.'
    },
    tutSeconds: 210,
    sets: 2,
    repsOrCycles: '3 CARs lentos por articulação + 6 Sliders Neurodinâmicos + 60s isometria ELDOA L5-S1',
    executionCadence: '10 segundos por rotação articular (CARs) + 60s estático ativo (ELDOA)',
    discomfortScaleTarget: '4.0 a 5.5 / 10 (Tensão intensa de alongamento fascial ativo e esforço postural, zero dor radicular)',
    targetAdmMetric: 'Ganho no Teste de Schober Modificado >= +5.5 cm e abdução/flexão glenoumeral >= 180° sem hiperlordose compensatória',
    contraindicationsAndSafety: 'Em caso de ciatalgia aguda ou hérnia extrusa com sinal de Lasègue positivo < 45°, realizar o ELDOA com joelhos semiflexionados a 20° para reduzir a tensão neural no nervo isquiático.',
    molecularMechanobiologyTag: 'ACAN (Agrecano) / COL2A1 / Hidratação Osmótica do Disco Intervertebral'
  },
  {
    id: 'mat-05',
    shift: 'MANHA',
    blockNumber: 4,
    blockTitle: '4. Mobilidade Dinâmica de Quadril, Tornozelos & Abertura Torácica',
    name: 'Mobilização Talocrural Mulligan (MWM em Dorsiflexão) + Transições de Quadril 90/90 com Abertura Torácica em Cadeia Fechada',
    anatomicalTarget: 'Articulação Talocrural (Tálus/Pinça Maleolar), Cápsula Posteroinferior e Anterior do Quadril (Iliopsoas/Piriforme) e Coluna Torácica Média (T4-T10)',
    fascialChain: 'Linha Espiral, Linha Lateral e Linha Funcional Posterior',
    clinicalConcept: 'Mulligan MWM (Mobilization with Movement — Deslizamento Posterior do Tálus) + Mobilidade Articular Ativa 90/90',
    forceVector: 'No tornozelo: Tíbia avança anteriormente sobre o tálus fixo (vetor posteroinferior sobre o colo do tálus). No quadril: Torque rotacional interno e externo femoroacetabular com pelve estabilizada.',
    anchorPoints: 'Calcanhar totalmente plantigrado (proibido elevar do solo) no avanço de tornozelo; ísquios ancorados no solo durante a posição 90/90.',
    stepByStepExecution: [
      '1. MWM de Tornozelo em Dorsiflexão (Semi-Ajoelhado): Posicione o pé avaliado à frente. Com as duas mãos (ou faixa elástica tracionando para trás), estabilize o colo do tálus logo abaixo dos maléolos em vetor posteroinferior. Avance o joelho à frente na linha do 2º/3º metatarso sem levantar o calcanhar por 8 repetições controladas por lado.',
      '2. Mobilidade de Quadril 90/90 com Inclinação Anterior de Coluna: Sente-se na base 90/90 (perna da frente em rotação externa a 90°, perna de trás em rotação interna a 90°). Com a coluna neutra e esterno projetado, incline o tronco à frente sobre a tíbia anterior (foco cápsula posterior/glúteo) por 5 segundos; em seguida, gire o tronco para a perna de trás forçando a rotação interna ativa do quadril posterior por 5 segundos.',
      '3. Abertura Torácica ("Book Opener" / Windmill em 90/90): Apoiando a mão homolateral da perna da frente no chão (empurrando o solo para ativar serrátil anterior), realize rotação torácica máxima abrindo o braço oposto em arco de 180°, acompanhando a mão com o olhar (6 repetições por lado).'
    ],
    respiratoryPattern: {
      inhaleSec: 4,
      holdFullSec: 2,
      exhaleSec: 5,
      holdEmptySec: 0,
      cadenceLabel: '4s IN na Abertura Torácica : 2s HOLD no Fim de Curso : 5s EX Ganhando Amplitude',
      biomechanicalRationale: 'A inspiração no extremo da rotação torácica utiliza as costelas como alavanca mecânica interna para mobilizar as articulações costotransversas.'
    },
    tutSeconds: 180,
    sets: 2,
    repsOrCycles: '8 MWM Tornozelo + 6 Transições 90/90 + 6 Rotações Torácicas por lado',
    executionCadence: '3s concêntrico : 2s isometria de fim de curso : 3s retorno',
    discomfortScaleTarget: '3.5 a 5.0 / 10 (Alongamento capsular profundo, zero dor em pinçamento anterior no tornozelo ou quadril)',
    targetAdmMetric: 'Knee-to-Wall >= 12.0 cm; Rotação Interna de Quadril >= 40°; Rotação Torácica >= 55°',
    contraindicationsAndSafety: 'Se houver impacto femoroacetabular (FAI tipo Cam/Pincer) com pinçamento anteromedial na perna de trás do 90/90, elevar o ísquio da perna da frente sobre um bloco de 5–8 cm para reduzir a abdução/rotação interna extrema.',
    molecularMechanobiologyTag: 'ELN (Elastina) / Tenascina-C / Deslizamento Artrocinemático Talo-Tibial'
  },

  // ============================================================================
  // PROTOCOLO NOTURNO (15-20 MIN | DOWNREGULATION PARASSIMPÁTICA, LIBERAÇÃO MIOFASCIAL PROFUNDA E DESCOMPRESSÃO ARTICULAR)
  // ============================================================================
  {
    id: 'not-01',
    shift: 'NOITE',
    blockNumber: 1,
    blockTitle: '1. Liberação Miofascial Cranio-Cervical, Escapular & Peitoral Menor',
    name: 'Inibição Suboccipital (C0-C2) com Reflexo Vestíbulo-Ocular + Pin & Stretch de Peitoral Menor e Trapézio Superior',
    anatomicalTarget: 'Mm. Reto Posterior Maior e Menor da Cabeça, Oblíquos Superior/Inferior (Triângulo Suboccipital), Nervo Suboccipital/Occipital Maior, M. Peitoral Menor (3ª-5ª Costelas ao Processo Coracoide) e M. Trapézio Superior',
    fascialChain: 'Linha Superficial Posterior (Pólo Craniano) e Linha Profunda Anterior dos Braços',
    clinicalConcept: 'Inibição Suboccipital Osteopática + Liberação de Ponto-Gatilho por Cisalhamento (Pin & Stretch)',
    forceVector: 'Nos suboccipitais: Vetor posteroanterior e cefálico (tração occipital) exatamente abaixo da linha nucal inferior. No peitoral menor: Vetor anteroposterior oblíquo medial ao processo coracoide.',
    anchorPoints: 'Base do crânio apoiada sobre esfera dupla (peanut ball) ou polpas digitais; esfera rígida ancorada entre a parede e o espaço infraclavicular medial ao coracoide.',
    stepByStepExecution: [
      '1. Descompressão Suboccipital + Reflexo Oculomotor: Deite-se em decúbito dorsal posicionando a esfera dupla exatamente na fossa suboccipital (abaixo da protuberância occipital externa, nunca sobre os processos espinhosos cervicais baixos). Deixe o peso do crânio afundar por 60s. Em seguida, com a cabeça imóvel, olhe lentamente para a direita (5s) e para a esquerda (5s) para ativar e relaxar reflexamente os suboccipitais via reflexo cervico-ocular.',
      '2. Pin & Stretch de Peitoral Menor: Em pé de frente para uma parede ou batente de porta, posicione a esfera de liberação 3 cm abaixo da clavícula e medial ao processo coracoide da escápula. Incline o peso do corpo (intensidade 5/10) e realize lentamente a elevação do braço na parede (flexão + rotação externa de ombro) por 8 repetições lentas.',
      '3. Liberação de Trapézio Superior e Elevador da Escápula: Encoste a esfera no ângulo superomedial da escápula contra a parede; realize inclinação cervical contralateral associada a depressão escapular ativa por 6 repetições.'
    ],
    respiratoryPattern: {
      inhaleSec: 4,
      holdFullSec: 2,
      exhaleSec: 8,
      holdEmptySec: 0,
      cadenceLabel: '4s IN Nasal : 2s HOLD : 8s EX Lenta (Relação 1:2 Parassimpática)',
      biomechanicalRationale: 'A descompressão da membrana atlanto-occipital associada à expiração prolongada estimula aferências do nervo vago no forame jugular, reduzindo a frequência cardíaca.'
    },
    tutSeconds: 210,
    sets: 1,
    repsOrCycles: '90s Suboccipitais + 60s Peitoral Menor por lado + 60s Elevador da Escápula',
    executionCadence: 'Compressão estática de 60s seguida de 6–8 mobilizações lentas (4s ida : 4s volta)',
    discomfortScaleTarget: '4.0 a 5.5 / 10 (Dor referida típica de ponto-gatilho que deve reduzir >= 50% após 60 segundos)',
    targetAdmMetric: 'Eliminação da protração escapular em repouso (acrômio a <= 2.5 cm da maca em decúbito dorsal)',
    contraindicationsAndSafety: 'No peitoral menor, se sentir formigamento ou choque irradiando para os dedos (compressão do plexo braquial ou artéria axilar), reposicione a esfera 1,5 cm mais medialmente.',
    molecularMechanobiologyTag: 'CHRM2 (Receptor Muscarínico M2 Vagal) / Óxido Nítrico Endotelial (NOS3)'
  },
  {
    id: 'not-02',
    shift: 'NOITE',
    blockNumber: 1,
    blockTitle: '1. Liberação Miofascial Profunda Lombar, Pélvica & Fáscia Plantar',
    name: 'Liberação Miofascial de Quadrado Lombar (QL), Glúteo Médio/Piriforme e Cisalhamento da Aponeurose Plantar',
    anatomicalTarget: 'M. Quadrado Lombar (Fibras Iliocostais e Iliolombares), M. Piriforme, M. Glúteo Médio/Mínimo e Aponeurose Plantar (Tubérculo Medial do Calcâneo às Cabeças dos Metatarsos)',
    fascialChain: 'Linha Lateral, Linha Espiral e Linha Superficial Posterior (Base Plantar)',
    clinicalConcept: 'Compressão Isquêmica de Ponto-Gatilho + Mobilização de Tecido Mole Assistida por Movimento (ART / Pin & Mobilize)',
    forceVector: 'No QL: Vetor lateromedial a 45° no espaço entre a 12ª costela e a crista ilíaca (lateral aos eretores da espinha). Na fáscia plantar: Cisalhamento longitudinal + extensão metatarsofalângica (Mecanismo de Windlass).',
    anchorPoints: 'Pelve estabilizada no solo (QL/Piriforme); calcanhar apoiado no solo com esfera sob o arco longitudinal medial.',
    stepByStepExecution: [
      '1. Cisalhamento da Fáscia Plantar (Mecanismo de Windlass): Em pé ou sentado, posicione uma esfera rígida pequena sob o arco plantar medial (à frente do calcâneo). Aplique carga vertical tolerável e, mantendo a esfera fixa no ponto denso, estenda ativamente o hálux e os dedos para cima (6 repetições em 3 pontos: proximal, médio e distal), seguido de deslizamento longitudinal lento por 45s por pé.',
      '2. Liberação de Piriforme e Cápsula Posterior com Rotação Femoral: Sentado ou em decúbito dorsal, posicione a esfera no centro do quadrante glúteo posterolateral (linha entre o trocânter maior e o sacro). Quando localizar o ponto-gatilho, realize abdução/rotação externa e interna lenta da coxa por 60 segundos.',
      '3. Desbloqueio de Quadrado Lombar (QL): Em decúbito dorsal com joelhos dobrados, posicione uma esfera macia ou dupla lateralmente à massa dos paravertebrais (entre a crista ilíaca posterior e a 12ª costela). Respire profundamente expandindo a lombar contra a esfera e realize leve inclinação pélvica homolateral por 60s de cada lado.'
    ],
    respiratoryPattern: {
      inhaleSec: 4,
      holdFullSec: 0,
      exhaleSec: 7,
      holdEmptySec: 1,
      cadenceLabel: '4s IN Direcionada ao Ponto de Tensão : 7s EX Derretendo sobre a Esfera',
      biomechanicalRationale: 'A liberação da fáscia plantar transmite relaxamento miotático imediato via Linha Superficial Posterior até os isquiotibiais, ligamento sacrotuberal e fáscia toracolombar.'
    },
    tutSeconds: 240,
    sets: 1,
    repsOrCycles: '60s Fáscia Plantar por pé + 60s Piriforme por lado + 60s Quadrado Lombar por lado',
    executionCadence: 'Deslizamento ultra-lento (1 cm por segundo) + 6 mobilizações articulares distais por ponto',
    discomfortScaleTarget: '4.5 a 6.0 / 10 (Sensação de descolamento fascial profundo; nunca contrair a musculatura em defesa)',
    targetAdmMetric: 'Aumento imediato >= +3 cm no teste Sit-and-Reach / Dedo-Solo pós-liberação plantar',
    contraindicationsAndSafety: 'Proibido posicionar esferas rígidas diretamente sobre os processos transversos lombares, sobre a emergência direta do nervo ciático (se gerar parestesia na perna) ou sobre as costelas flutuantes (11ª e 12ª costelas).',
    molecularMechanobiologyTag: 'Hialuronidase Tecidual / Redução da Viscosidade do Ácido Hialurônico Fascial'
  },
  {
    id: 'not-03',
    shift: 'NOITE',
    blockNumber: 2,
    blockTitle: '2. Auto-Mobilização e Tração Articular Lombo-Pélvica & Sacroilíaca (SIJ)',
    name: 'Tração Axial Femoroacetabular (Vetor Inferolateral 45°) & Reset Sacroilíaco (SIJ) por Força de Casal Isométrica (Muscle Energy Technique)',
    anatomicalTarget: 'Cápsula Coxofemoral, Articulação Sacroilíaca (SIJ), Ligamentos Iliolombares/Sacroilíacos Posteriores e M. Iliopsoas',
    fascialChain: 'Complexo Lombo-Pélvico-Quadril e Sistema Oblíquo Posterior/Anterior',
    clinicalConcept: 'Técnica de Energia Muscular Osteopática (MET - Muscle Energy Technique) + Tração Articular Grau II-III (Maitland/Kaltenborn)',
    forceVector: 'Na SIJ: Força de casal (couple force) oposta — flexão isométrica de um quadril contra extensão isométrica do quadril oposto para recentralizar os ilíacos no sacro. Na tração lombar: Vetor caudal nas EIAS.',
    anchorPoints: 'Sacro nivelado no solo em decúbito dorsal; mãos ancoradas na face anterior de uma coxa e posterior da outra (para o Reset SIJ) ou nas cristas ilíacas anterossuperiores (EIAS).',
    stepByStepExecution: [
      '1. Reset Sacroilíaco (MET de Força de Casal): Em decúbito dorsal com ambos os quadris a 90°, posicione a palma da mão direita na frente do joelho direito (impedindo aproximação ao peito) e a mão esquerda atrás da coxa esquerda (impedindo que ela desça ao solo). Empurre simultaneamente o joelho direito contra a mão (flexão) e a coxa esquerda para baixo (extensão) com 30% da força máxima por 6 segundos. Relaxe totalmente na expiração por 4 segundos. Repita 3 vezes e inverta os lados (3 vezes).',
      '2. Adução Isométrica de Coaptação Púbica (Sínfise): Com os pés apoiados no solo e os punhos cerrados (ou rolo de espuma) entre os joelhos, realize uma contração isométrica de adução progressiva (30% a 50% de esforço) por 6 segundos (2 repetições) para estabilizar o anel pélvico anterior.',
      '3. Descompressão Axial Lombar Passiva (Posição Psoas-Relax): Com as panturrilhas apoiadas sobre o assento de uma cadeira/sofá (quadris e joelhos a 90°), encaixe a base das palmas das mãos nas Espinhas Ilíacas Anterossuperiores (EIAS) e empurre suavemente a pelve em direção aos pés (vetor caudal) por 60 segundos enquanto respira profundamente.'
    ],
    respiratoryPattern: {
      inhaleSec: 4,
      holdFullSec: 3,
      exhaleSec: 7,
      holdEmptySec: 0,
      cadenceLabel: '4s IN : 3s Contração MET : 7s EX na Tração Caudal Lombar',
      biomechanicalRationale: 'A contração oposta de iliopsoas/reto femoral de um lado e glúteo máximo/isquiotibiais do outro corrige torções ilíacas anteriores/posteriores funcionais sem manipulação de alta velocidade.'
    },
    tutSeconds: 180,
    sets: 2,
    repsOrCycles: '3 ciclos MET por diagonal pélvica + 2 aduções + 60s tração axial caudal',
    executionCadence: '6s isometria submáxima (30%) : 4s relaxamento completo',
    discomfortScaleTarget: '1.5 a 3.0 / 10 (Sensação de realinhamento e alívio imediato do peso sacroilíaco)',
    targetAdmMetric: 'Simetria de comprimento funcional de membros inferiores e alívio da tensão lombossacral',
    contraindicationsAndSafety: 'Em gestantes ou pacientes com hipermobilidade ligamentar generalizada (Ehlers-Danlos / Beighton >= 6), limitar a força da técnica de energia muscular a no máximo 15–20% da contração voluntária máxima.',
    molecularMechanobiologyTag: 'Mecanorrecepção Ligamentar Sacroilíaca / Inibição Recíproca Ia/Ib'
  },
  {
    id: 'not-04',
    shift: 'NOITE',
    blockNumber: 3,
    blockTitle: '3. Alongamento FNP (CRAC) & Respiração Vagal para Indução do Sono',
    name: 'FNP Contração-Relaxamento de Iliopsoas e Cadeia Posterior + Respiração Vagal 4-7-8 e Suspiro Fisiológico Duplo',
    anatomicalTarget: 'M. Iliopsoas, M. Reto Femoral, Isquiotibiais (Semimembranoso, Semitendinoso, Bíceps Femoral), Nervo Vago (X Par Craniano) e Sistema Nervoso Autônomo Parassimpático',
    fascialChain: 'Linha Profunda Anterior e Linha Superficial Posterior',
    clinicalConcept: 'FNP (Facilitação Neuromuscular Proprioceptiva — Protocolo CRAC: Contract-Relax-Antagonist-Contract) + Modulação Autonômica da Variabilidade da Frequência Cardíaca (VFC/HRV)',
    forceVector: 'Alongamento longitudinal de psoas com retroversão pélvica ativa (contração de glúteo máximo homolateral) + Flexão coxofemoral com extensão de joelho assistida por faixa.',
    anchorPoints: 'Joelho posterior apoiado em superfície macia com pelve travada em retroversão (no alongamento de psoas); coluna lombar neutra ancorada no solo (nos isquiotibiais).',
    stepByStepExecution: [
      '1. FNP de Iliopsoas (Correção de Anteroversão Pélvica): Em posição de meio-ajoelhado (joelho de trás no apoio), realize retroversão pélvica máxima contraindo o glúteo do lado de trás. Fase 1 (Contração): Empurre o joelho de trás no chão como se quisesse arrastá-lo para a frente (isometria de flexão de quadril a 40%) por 6 segundos. Fase 2 (Relaxamento + Agonista): Expire, relaxe o psoas e contraia ainda mais o glúteo avançando 2–3 cm no alongamento por 20 segundos (2 ciclos por lado).',
      '2. FNP de Isquiotibiais com Faixa: Em decúbito dorsal, eleve uma perna com faixa no mediopé mantendo o joelho estendido até sentir tensão moderada (4/10). Empurre o calcanhar contra a faixa em direção ao solo (40% de força) por 6 segundos; inspire, e na expiração longa traga a perna suavemente aumentando 5°–10° de ADM por 20 segundos (2 ciclos por lado).',
      '3. Protocolo Final de Downregulation Vagal (3 Minutos): Deite-se em posição de descompressão total (pernas elevadas ou travesseiro sob os joelhos). Realize 3 "Suspiros Fisiológicos Duplos" (duas inspirações nasais seguidas no topo da capacidade pulmonar + expiração bucal longa). Em seguida, execute 8 ciclos da Cadência Vagal 4-7-8 (4s inspiração nasal silenciosa : 7s pausa apneica relaxada : 8s expiração lenta com som suave de sopro).'
    ],
    respiratoryPattern: {
      inhaleSec: 4,
      holdFullSec: 7,
      exhaleSec: 8,
      holdEmptySec: 0,
      cadenceLabel: '4s IN Nasal : 7s Apneia Cheia : 8s EX Lenta (Protocolo Vagal 4-7-8)',
      biomechanicalRationale: 'A retenção inspiratória de 7s eleva suavemente a pressão parcial arterial de CO2 (vasodilatação cerebral e miofascial), enquanto a expiração de 8s ativa os barorreceptores aórticos/carotídeos e libera acetilcolina no nodo sinoatrial.'
    },
    tutSeconds: 240,
    sets: 2,
    repsOrCycles: '2 ciclos FNP por grupamento (6s contração / 20s relaxamento) + 8 ciclos respiratórios 4-7-8',
    executionCadence: 'Ciclo FNP de 26s + Ciclo Vagal de 19s',
    discomfortScaleTarget: '3.0 a 4.0 / 10 durante o FNP; 0.0 / 10 (Relaxamento profundo) na fase vagal',
    targetAdmMetric: 'Teste de Thomas Negativo (coxa toca a maca sem abdução/lordose) e Flexão de Quadril Passiva >= 85°',
    contraindicationsAndSafety: 'Durante a apneia de 7 segundos, manter a glote e a musculatura cervical totalmente relaxadas (não fazer pressão craniana). Se sentir falta de ar inicial, iniciar na proporção 3-5-6 e progredir para 4-7-8 na Semana 2.',
    molecularMechanobiologyTag: 'Acetilcolina Vagal / Inibição do Eixo HPA / Órgão Tendinoso de Golgi (Ib)'
  }
];
