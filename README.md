# Mobilidade Total — Plataforma de Biomecânica Clínica, Reprogramação Postural & Mecanobiologia

Sistema integrado de reprogramação postural, auto-mobilização articular (Conceitos Mulligan MWM/SNAG, Maitland Grau II/III e ELDOA), liberação miofascial por cisalhamento, drenagem linfática craniofacial, mecânica respiratória 360°, auditoria goniométrica contínua e bancada de biociência molecular.

---

## Arquitetura dos 4 Módulos Interdependentes

### 1. Módulo 1 — Protocolos Diários (Manhã e Noite)
- **Protocolo Matinal (15–20 min | Hidratação Fascial, Descompressão Axial, Drenagem Craniofacial & Ativação Neuromuscular)**:
  1. Desobstrução linfática de Terminus (Ângulo Venoso de Pirogoff), cadeia submandibular/parotídea e eflorescência periorbital (Vodder).
  2. Auto-mobilização da ATM, liberação de masseter/temporal/hioideos e SNAG cervical superior (C1–C2).
  3. Liberação manual do rebordo costal (T7–T12), respiração diafragmática biomecânica 360° (Zona de Aposição — ZOA) e Pressurização Intra-Abdominal (PIA).
  4. CARs (Controlled Articular Rotations) globais, deslizamento neurodinâmico mediano/ulnar ("Sliders") e descompressão axial ativa ELDOA L5–S1.
  5. Mobilização talocrural Mulligan (MWM em dorsiflexão), transições dinâmicas de quadril 90/90 e abertura torácica em cadeia fechada.
- **Protocolo Noturno (15–20 min | Downregulation Parassimpática, Liberação Miofascial Profunda & Descompressão Articular)**:
  1. Inibição suboccipital (C0–C2) com reflexo vestíbulo-ocular e Pin & Stretch de peitoral menor/elevador da escápula.
  2. Liberação profunda de quadrado lombar (QL), piriforme/glúteo médio e cisalhamento da aponeurose plantar (mecanismo de Windlass).
  3. Reset sacroilíaco (SIJ) por técnica de energia muscular (MET de força de casal isométrica) e tração axial lombar em posição Psoas-Relax.
  4. Alongamento FNP (CRAC — Contração-Relaxamento-Antagonista) de iliopsoas e isquiotibiais + respiração vagal `4-7-8` e suspiro fisiológico duplo.

### 2. Módulo 2 — Matriz de Periodização Semanal (4 Semanas) & Autorregulação
- **Modelo Matemático de Densidade Semanal**:
  `TUT_semanal = Σ (Séries × TUT_base × M_semana)`
- Progressão estruturada para as Semanas 1 (`1.00×`), Semana 2 (`1.35×`), Semana 3 (`1.65×` — End-Range PAILs/RAILs & ELDOA) e Semana 4 (`0.75×` — Deload & Reavaliação).
- Simulador interativo de autorregulação para **Rigidez Aguda (EVA ≥ 7/10)** e **Quebra de Platô Artrocinemático (≥ 5 dias sem ganho de ADM)**.

### 3. Módulo 3 — Dashboard Auditável, Catálogo Mestre Corporal & Esquema de Dados
- **Planilha de Registro Diário & Gráficos SVG**: Acompanhamento longitudinal de adesão (%), rigidez matinal (1–10), qualidade do sono vagal (1–10), goniometria bilateral (Knee-to-Wall em cm, rotação interna de quadril em graus, rotação torácica em graus, abertura interincisal da ATM em mm e teste de Schober lombar em cm).
- **Catálogo Mestre por Região Corporal**: 12 síndromes biomecânicas mapeadas desde a causa raiz até o exercício corretivo e seu alvo molecular correspondente.
- **Exportação CSV & Esquema Relacional SQL (DDL)**: Estrutura pronta para banco de dados de auditoria.

### 4. Módulo 4 — Protocolo de Auditoria Mensal, IA Clínica & Biociência Molecular
- **Gerador de Prompt de Fechamento de Mês (30 Dias)**: Autopreenchido com os deltas goniométricos e assimetrias detectadas no Dashboard.
- **Recalibração Clínica Server-Side**: Integração com `@google/genai` (`gemini-4-argon` com `ThinkingLevel.HIGH` e `gemini-3.8-flash` com `googleSearch` grounding).
- **Bancada de Biociência**: Integração com **AlphaFold DB**, **UniProtKB**, **Reactome**, **PubMed / Europe PMC** e **ClinicalTrials.gov** para inspeção de alvos mecanobiológicos (`COL1A1`, `PIEZO1`, `HAS2`, `CHRM2`, `ACAN`).

---

## Estrutura de Diretórios do Código-Fonte

```text
├── index.html                                      # Ponto de entrada HTML e tipografia (Plus Jakarta Sans & JetBrains Mono)
├── metadata.json                                   # Metadados da aplicação
├── package.json                                    # Dependências e scripts Full-Stack (Express + Vite + TypeScript)
├── server.ts                                       # Servidor Express + rotas de API Gemini e proxy científico
└── src/
    ├── App.tsx                                     # Layout principal e gerenciamento de estado dos 4 módulos
    ├── index.css                                   # Sistema de design laboratorial de alto contraste (Tailwind CSS v4)
    ├── main.tsx                                    # Bootstrap React 19
    ├── components/
    │   ├── Module1DailyProtocols.tsx               # Fichas técnicas matinais/noturnas + marcapasso respiratório/TUT
    │   ├── Module2PeriodizationMatrix.tsx          # Matriz de 4 semanas + calculadora de autorregulação
    │   ├── Module3AuditDashboardAndCatalog.tsx     # Gráficos SVG, tabela de logs, catálogo de 12 regiões e DDL SQL
    │   └── Module4MonthlyAuditAndScience.tsx       # Prompt mensal de 30 dias, recalibração IA e bancada de biociência
    ├── data/
    │   ├── protocolsData.ts                        # Base de dados exaustiva dos protocolos matinal e noturno
    │   └── periodizationAndCatalogData.ts          # Catálogo mestre corporal, esquema SQL e histórico inicial
    ├── services/
    │   └── scienceAndAiService.ts                  # Conector AlphaFold DB, UniProtKB, Reactome, PubMed e ClinicalTrials.gov
    └── utils/
        ├── biomechanicsMath.ts                     # Motor matemático puro de autorregulação, KPIs e prompt mensal
        └── biomechanicsMath.test.ts                # Testes unitários automatizados (node:test)
```

---

## Como Executar Localmente

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente**:
   Copie o arquivo `.env.example` para `.env` e adicione sua chave `GEMINI_API_KEY`:
   ```bash
   cp .env.example .env
   ```

3. **Executar os testes unitários**:
   ```bash
   npx tsx --test src/utils/biomechanicsMath.test.ts
   ```

4. **Iniciar o servidor de desenvolvimento (Full-Stack na porta 3000)**:
   ```bash
   npm run dev
   ```

5. **Gerar build de produção**:
   ```bash
   npm run build
   npm start
   ```

---

## Licença

Distribuído sob a licença **Apache-2.0**. Todos os códigos, modelos matemáticos e protocolos biomecânicos são abertos para inspeção, estudo e auditoria pública.
