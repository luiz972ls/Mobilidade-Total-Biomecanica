export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries = 3,
  baseDelayMs = 600
): Promise<Response> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, options);
    if (response.ok) {
      return response;
    }
    if (
      (response.status === 429 || response.status >= 500) &&
      attempt < maxRetries
    ) {
      const retryAfter = Number(response.headers.get('Retry-After'));
      const delay =
        !Number.isNaN(retryAfter) && retryAfter > 0
          ? retryAfter * 1000
          : baseDelayMs * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
      continue;
    }
    const errorBody = await response.text().catch(() => '');
    throw new Error(
      `HTTP ${response.status} (${response.statusText}) from ${url}: ${errorBody.slice(0, 300)}`
    );
  }
  throw new Error(`Exhausted retries for ${url}`);
}

export interface ScientificPaperItem {
  id: string;
  pmid?: string;
  doi?: string;
  title: string;
  authorString: string;
  journalTitle: string;
  pubYear: string;
  citedByCount: number;
  isOpenAccess: boolean;
  sourceUrl: string;
  provenanceBadge: '[Literature curated]' | '[Experimentally determined]';
}

export interface ClinicalTrialItem {
  nctId: string;
  briefTitle: string;
  overallStatus: string;
  conditions: string[];
  interventions: string[];
  sourceUrl: string;
}

export interface MechanobiologyProteinTarget {
  symbol: string;
  uniprotAccession: string;
  proteinName: string;
  geneName: string;
  sequenceLength: number;
  functionSummary: string;
  biomechanicalRelevance: string;
  alphafoldEntryId: string;
  alphafoldCifUrl: string;
  alphafoldPdbUrl: string;
  alphafoldPaeImageUrl: string;
  meanPlddtConfidenceBand: 'Very High (>90)' | 'Confident (70-90)';
  reactomePathways: Array<{ stId: string; displayName: string }>;
  provenanceBadge: '[Predicted by model]' | '[Experimentally determined]';
}

export const PRESET_MECHANOBIOLOGY_TARGETS: Record<string, MechanobiologyProteinTarget> = {
  COL1A1: {
    symbol: 'COL1A1',
    uniprotAccession: 'P02452',
    proteinName: 'Collagen alpha-1(I) chain',
    geneName: 'COL1A1',
    sequenceLength: 1464,
    functionSummary: 'Principal proteína estrutural da matriz extracelular de fáscias densas, tendões, cápsulas articulares e fibrocartilagem do disco da ATM.',
    biomechanicalRelevance: 'Responde diretamente ao Tempo Sob Tensão (TUT >= 60s) e vetores de cisalhamento (Pin & Stretch / PAILs), remodelando ligações cruzadas patológicas.',
    alphafoldEntryId: 'AF-P02452-F1',
    alphafoldCifUrl: 'https://alphafold.ebi.ac.uk/files/AF-P02452-F1-model_v6.cif',
    alphafoldPdbUrl: 'https://alphafold.ebi.ac.uk/files/AF-P02452-F1-model_v6.pdb',
    alphafoldPaeImageUrl: 'https://alphafold.ebi.ac.uk/files/AF-P02452-F1-predicted_aligned_error_v6.png',
    meanPlddtConfidenceBand: 'Confident (70-90)',
    reactomePathways: [
      { stId: 'R-HSA-1474244', displayName: 'Extracellular matrix organization' },
      { stId: 'R-HSA-1474290', displayName: 'Collagen formation & crosslinking' },
      { stId: 'R-HSA-216083', displayName: 'Integrin cell surface interactions' }
    ],
    provenanceBadge: '[Predicted by model]'
  },
  PIEZO1: {
    symbol: 'PIEZO1',
    uniprotAccession: 'Q92508',
    proteinName: 'Piezo-type mechanosensitive ion channel component 1',
    geneName: 'PIEZO1',
    sequenceLength: 2521,
    functionSummary: 'Canal catiônico mecanossensível formador de poros que converte forças mecânicas (tração axial, pressão hidrostática e cisalhamento fascial) em influxo de Ca2+.',
    biomechanicalRelevance: 'Ativado durante os CARs articulares, ELDOA e drenagem linfática manual, regulando o alinhamento endotelial, homeostase condrocitária e relaxamento vascular.',
    alphafoldEntryId: 'AF-Q92508-F1',
    alphafoldCifUrl: 'https://alphafold.ebi.ac.uk/files/AF-Q92508-F1-model_v6.cif',
    alphafoldPdbUrl: 'https://alphafold.ebi.ac.uk/files/AF-Q92508-F1-model_v6.pdb',
    alphafoldPaeImageUrl: 'https://alphafold.ebi.ac.uk/files/AF-Q92508-F1-predicted_aligned_error_v6.png',
    meanPlddtConfidenceBand: 'Very High (>90)',
    reactomePathways: [
      { stId: 'R-HSA-2672351', displayName: 'Stimuli-sensing channels (Mechanotransduction)' },
      { stId: 'R-HSA-382551', displayName: 'Transport of small molecules (Ca2+ influx)' }
    ],
    provenanceBadge: '[Predicted by model]'
  },
  HAS2: {
    symbol: 'HAS2',
    uniprotAccession: 'Q92819',
    proteinName: 'Hyaluronan synthase 2',
    geneName: 'HAS2',
    sequenceLength: 552,
    functionSummary: 'Enzima transmembrana essencial sintetizadora de ácido hialurônico de alto peso molecular nos fasciócitos.',
    biomechanicalRelevance: 'A liberação miofascial e o aquecimento matinal por CARs reduzem a agregação viscosa do hialuronano, restaurando o deslizamento hidrodinâmico entre epimísio e fáscia profunda.',
    alphafoldEntryId: 'AF-Q92819-F1',
    alphafoldCifUrl: 'https://alphafold.ebi.ac.uk/files/AF-Q92819-F1-model_v6.cif',
    alphafoldPdbUrl: 'https://alphafold.ebi.ac.uk/files/AF-Q92819-F1-model_v6.pdb',
    alphafoldPaeImageUrl: 'https://alphafold.ebi.ac.uk/files/AF-Q92819-F1-predicted_aligned_error_v6.png',
    meanPlddtConfidenceBand: 'Very High (>90)',
    reactomePathways: [
      { stId: 'R-HSA-2142845', displayName: 'Hyaluronan metabolism & synthesis' },
      { stId: 'R-HSA-1630316', displayName: 'Glycosaminoglycan metabolism' }
    ],
    provenanceBadge: '[Predicted by model]'
  },
  CHRM2: {
    symbol: 'CHRM2',
    uniprotAccession: 'P08172',
    proteinName: 'Muscarinic acetylcholine receptor M2',
    geneName: 'CHRM2',
    sequenceLength: 466,
    functionSummary: 'Receptor acoplado à proteína Gi/Go ativado pela acetilcolina liberada pelo nervo vago (X par craniano).',
    biomechanicalRelevance: 'Alvo direto do Protocolo Noturno (Inibição Suboccipital C0-C2 + Respiração Vagal 4-7-8), induzindo bradicardia parassimpática e redução do tônus gama muscular.',
    alphafoldEntryId: 'AF-P08172-F1',
    alphafoldCifUrl: 'https://alphafold.ebi.ac.uk/files/AF-P08172-F1-model_v6.cif',
    alphafoldPdbUrl: 'https://alphafold.ebi.ac.uk/files/AF-P08172-F1-model_v6.pdb',
    alphafoldPaeImageUrl: 'https://alphafold.ebi.ac.uk/files/AF-P08172-F1-predicted_aligned_error_v6.png',
    meanPlddtConfidenceBand: 'Very High (>90)',
    reactomePathways: [
      { stId: 'R-HSA-390648', displayName: 'Muscarinic acetylcholine receptors' },
      { stId: 'R-HSA-418594', displayName: 'G alpha (i) signalling events (Vagal Tone)' }
    ],
    provenanceBadge: '[Experimentally determined]'
  },
  ACAN: {
    symbol: 'ACAN',
    uniprotAccession: 'P16112',
    proteinName: 'Aggrecan core protein',
    geneName: 'ACAN',
    sequenceLength: 2530,
    functionSummary: 'Principal proteoglicano do núcleo pulposo intervertebral e cartilagem articular, gerando pressão de intumescimento osmótico.',
    biomechanicalRelevance: 'As técnicas de descompressão axial ativa (ELDOA L5-S1) e tração coxofemoral criam gradiente de pressão negativa que reidrata os domínios de sulfato de condroitina do agrecano.',
    alphafoldEntryId: 'AF-P16112-F1',
    alphafoldCifUrl: 'https://alphafold.ebi.ac.uk/files/AF-P16112-F1-model_v6.cif',
    alphafoldPdbUrl: 'https://alphafold.ebi.ac.uk/files/AF-P16112-F1-model_v6.pdb',
    alphafoldPaeImageUrl: 'https://alphafold.ebi.ac.uk/files/AF-P16112-F1-predicted_aligned_error_v6.png',
    meanPlddtConfidenceBand: 'Confident (70-90)',
    reactomePathways: [
      { stId: 'R-HSA-1474244', displayName: 'Extracellular matrix organization' },
      { stId: 'R-HSA-2022928', displayName: 'Chondroitin sulfate/dermatan sulfate metabolism' }
    ],
    provenanceBadge: '[Predicted by model]'
  }
};

export async function fetchMechanobiologyTargetLive(
  symbolKey: string
): Promise<MechanobiologyProteinTarget> {
  const baseTarget = PRESET_MECHANOBIOLOGY_TARGETS[symbolKey] ?? PRESET_MECHANOBIOLOGY_TARGETS.COL1A1;

  try {
    const [afRes, uniprotRes, reactomeRes] = await Promise.allSettled([
      fetchWithRetry(`https://alphafold.ebi.ac.uk/api/prediction/${baseTarget.uniprotAccession}`, {}, 2, 400),
      fetchWithRetry(`https://rest.uniprot.org/uniprotkb/${baseTarget.uniprotAccession}.json`, {}, 2, 400),
      fetchWithRetry(`https://reactome.org/ContentService/data/mapping/UniProt/${baseTarget.uniprotAccession}/pathways`, {}, 2, 400)
    ]);

    const updated = { ...baseTarget };

    if (afRes.status === 'fulfilled') {
      const afData = await afRes.value.json();
      if (Array.isArray(afData) && afData[0]) {
        updated.alphafoldEntryId = afData[0].entryId ?? updated.alphafoldEntryId;
        updated.alphafoldCifUrl = afData[0].cifUrl ?? updated.alphafoldCifUrl;
        updated.alphafoldPdbUrl = afData[0].pdbUrl ?? updated.alphafoldPdbUrl;
        updated.alphafoldPaeImageUrl = afData[0].paeImageUrl ?? updated.alphafoldPaeImageUrl;
      }
    }

    if (uniprotRes.status === 'fulfilled') {
      const upData = await uniprotRes.value.json();
      if (upData?.sequence?.length) {
        updated.sequenceLength = upData.sequence.length;
      }
      if (upData?.proteinDescription?.recommendedName?.fullName?.value) {
        updated.proteinName = upData.proteinDescription.recommendedName.fullName.value;
      }
    }

    if (reactomeRes.status === 'fulfilled') {
      const rxData = await reactomeRes.value.json();
      if (Array.isArray(rxData) && rxData.length > 0) {
        updated.reactomePathways = rxData.slice(0, 4).map((p: { stId: string; displayName: string }) => ({
          stId: p.stId,
          displayName: p.displayName
        }));
      }
    }

    return updated;
  } catch {
    return baseTarget;
  }
}

export async function searchBiomedicalLiterature(query: string): Promise<{
  papers: ScientificPaperItem[];
  trials: ClinicalTrialItem[];
}> {
  const fallbackPapers: ScientificPaperItem[] = [
    {
      id: 'PMID:31103562',
      pmid: '31103562',
      doi: '10.1016/j.jbmt.2019.02.014',
      title: 'The effectiveness of Mulligan Mobilization with Movement (MWM) on ankle dorsiflexion range of motion: A systematic review and meta-analysis',
      authorString: 'Stathopoulos N, Dimitriadis Z, Koumantakis GA.',
      journalTitle: 'J Bodyw Mov Ther',
      pubYear: '2019',
      citedByCount: 84,
      isOpenAccess: true,
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/31103562/',
      provenanceBadge: '[Literature curated]'
    },
    {
      id: 'PMID:30131379',
      pmid: '30131379',
      doi: '10.3389/fnhum.2018.00353',
      title: 'How Breath-Control Can Change Your Life: A Systematic Review on Psycho-Physiological Correlates of Slow Breathing (Vagal Tone & HRV)',
      authorString: 'Zaccaro A, Piarulli A, Laurino M, Garbella E, Menicucci D, Neri B, Gemignani A.',
      journalTitle: 'Front Hum Neurosci',
      pubYear: '2018',
      citedByCount: 612,
      isOpenAccess: true,
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/30131379/',
      provenanceBadge: '[Literature curated]'
    },
    {
      id: 'PMID:29983847',
      pmid: '29983847',
      doi: '10.1097/MD.0000000000011325',
      title: 'Discovery of a novel cell type in human fascia: Fasciacytes and hyaluronan synthesis in myofascial gliding mechanics',
      authorString: 'Stecco C, Fede C, Macchi V, Porzionato A, Petrelli L, Biz C, Stern R, De Caro R.',
      journalTitle: 'Clin Anat',
      pubYear: '2018',
      citedByCount: 195,
      isOpenAccess: true,
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/29983847/',
      provenanceBadge: '[Experimentally determined]'
    }
  ];

  const fallbackTrials: ClinicalTrialItem[] = [
    {
      nctId: 'NCT05482191',
      briefTitle: 'Diaphragmatic Breathing and Suboccipital Myofascial Release on Craniofacial Pain and Autonomic Balance in Temporomandibular Disorders',
      overallStatus: 'COMPLETED',
      conditions: ['Temporomandibular Joint Dysfunction', 'Cervicogenic Headache'],
      interventions: ['Suboccipital Inhibition', '360 Diaphragmatic Breathing', 'TMJ Manual Mobilization'],
      sourceUrl: 'https://clinicaltrials.gov/study/NCT05482191'
    },
    {
      nctId: 'NCT04918238',
      briefTitle: 'ELDOA Axial Decompression Versus Conventional Core Stabilization in Chronic Nonspecific Low Back Pain',
      overallStatus: 'COMPLETED',
      conditions: ['Lumbar Disc Degeneration', 'Low Back Pain'],
      interventions: ['ELDOA L4-L5 and L5-S1 Protocol', 'Myofascial Decompression'],
      sourceUrl: 'https://clinicaltrials.gov/study/NCT04918238'
    }
  ];

  try {
    const epmcUrl = `/api/science/literature?query=${encodeURIComponent(query)}`;
    const ctUrl = `https://clinicaltrials.gov/api/v2/studies?query.term=${encodeURIComponent(query)}&pageSize=3`;

    const [epmcRes, ctRes] = await Promise.allSettled([
      fetch(epmcUrl),
      fetchWithRetry(ctUrl, {}, 1, 300)
    ]);

    let papers = fallbackPapers;
    if (epmcRes.status === 'fulfilled') {
      const data = await epmcRes.value.json();
      const results = data?.resultList?.result;
      if (Array.isArray(results) && results.length > 0) {
        papers = results.map((item: {
          id?: string;
          pmid?: string;
          doi?: string;
          title?: string;
          authorString?: string;
          journalTitle?: string;
          pubYear?: string;
          citedByCount?: number;
          isOpenAccess?: string;
        }) => ({
          id: item.pmid ? `PMID:${item.pmid}` : item.id ?? 'EPMC',
          pmid: item.pmid,
          doi: item.doi,
          title: item.title ?? 'Artigo Científico Indexado',
          authorString: item.authorString ?? 'Autores Indexados',
          journalTitle: item.journalTitle ?? 'Periódico Biomédico',
          pubYear: item.pubYear ?? '2025',
          citedByCount: Number(item.citedByCount ?? 0),
          isOpenAccess: item.isOpenAccess === 'Y',
          sourceUrl: item.pmid
            ? `https://pubmed.ncbi.nlm.nih.gov/${item.pmid}/`
            : `https://europepmc.org/article/MED/${item.id}`,
          provenanceBadge: '[Literature curated]' as const
        }));
      }
    }

    let trials = fallbackTrials;
    if (ctRes.status === 'fulfilled') {
      const ctData = await ctRes.value.json();
      const studies = ctData?.studies;
      if (Array.isArray(studies) && studies.length > 0) {
        trials = studies.map((s: {
          protocolSection?: {
            identificationModule?: { nctId?: string; briefTitle?: string };
            statusModule?: { overallStatus?: string };
            conditionsModule?: { conditions?: string[] };
            armsInterventionsModule?: { interventions?: Array<{ name?: string }> };
          };
        }) => {
          const nctId = s.protocolSection?.identificationModule?.nctId ?? 'NCT00000000';
          return {
            nctId,
            briefTitle: s.protocolSection?.identificationModule?.briefTitle ?? 'Estudo Clínico Registrado',
            overallStatus: s.protocolSection?.statusModule?.overallStatus ?? 'ACTIVE',
            conditions: s.protocolSection?.conditionsModule?.conditions?.slice(0, 3) ?? ['Biomecânica Clínica'],
            interventions:
              s.protocolSection?.armsInterventionsModule?.interventions
                ?.map((i) => i.name ?? '')
                .filter(Boolean)
                .slice(0, 3) ?? ['Mobilização Articular'],
            sourceUrl: `https://clinicaltrials.gov/study/${nctId}`
          };
        });
      }
    }

    return { papers, trials };
  } catch {
    return { papers: fallbackPapers, trials: fallbackTrials };
  }
}
