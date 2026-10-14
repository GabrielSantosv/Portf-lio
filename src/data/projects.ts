import type { Lang } from "../context/LanguageContext";

export type LocalizedText = { pt: string; en: string };

export function tx(field: LocalizedText, lang: Lang): string {
  return field[lang];
}

export type Project = {
  slug: string;
  number: string;
  name: LocalizedText;
  subtitle: LocalizedText;
  summary: LocalizedText;
  coverLabel: string;
  cover: string;
  tags: LocalizedText[];
  area: LocalizedText;
  team: "solo" | "team";
  stack: string[];
  status: "completed" | "in-progress";
  links: { repo?: string; demo?: string };
  opening: LocalizedText;
  challenge: LocalizedText;
  move: LocalizedText;
  decisions: { title: LocalizedText; why: LocalizedText }[];
  features: LocalizedText[];
  role: LocalizedText;
  lesson: LocalizedText;
};

export const PROJECTS: Project[] = [
  {
    slug: "marketflow-saga",
    number: "01",
    name: { pt: "MarketFlow Saga", en: "MarketFlow Saga" },
    subtitle: {
      pt: "Sete microsserviços, nenhum esperando o outro.",
      en: "Seven microservices, none waiting on another.",
    },
    summary: {
      pt: "Back-end que simula o atendimento de um supermercado com sete microsserviços independentes, banco por serviço e SAGA por coreografia, usando SNS/SQS compatíveis com AWS.",
      en: "A back-end simulating a supermarket's operations with seven independent microservices, one database per service, and a choreography-based SAGA, using AWS-compatible SNS/SQS.",
    },
    coverLabel: "SAGA · AWS",
    cover: "/projects/marketflow-saga.jpg",
    tags: [
      { pt: "BACK-END", en: "BACK-END" },
      { pt: "MICROSSERVIÇOS", en: "MICROSERVICES" },
      { pt: "AWS", en: "AWS" },
    ],
    area: { pt: "Back-end · Sistemas distribuídos", en: "Back-end · Distributed systems" },
    team: "solo",
    stack: ["Java 21", "Spring Boot 3", "PostgreSQL 16", "Flyway", "AWS SDK v2 (SNS/SQS)", "Floci", "Docker Compose", "JUnit 5", "Mockito"],
    status: "completed",
    links: { repo: "https://github.com/GabrielSantosv/Projeto-AWS" },
    opening: {
      pt: "A primeira versão era uma cadeia de chamadas HTTP síncronas: cada serviço esperava a resposta do anterior. Se uma etapa caía, a venda inteira caía junto, e numa Black Friday escalar servidor só adiava o colapso.",
      en: "The first version was a chain of synchronous HTTP calls: each service waited on the previous one's response. If one step went down, the whole sale went down with it, and on a Black Friday, scaling servers just delayed the collapse.",
    },
    challenge: {
      pt: "Fazer estoque, nota fiscal, notificação e expedição reagirem a uma mesma venda sem nenhuma chamada REST entre eles, sem orquestrador central, e ainda assim chegar a um resultado consistente mesmo com eventos duplicados, fora de ordem ou com falha.",
      en: "Making inventory, invoicing, notifications, and shipping react to the same sale with no REST calls between them, no central orchestrator, and still reach a consistent result even with duplicate, out-of-order, or failed events.",
    },
    move: {
      pt: "Arquitetura orientada a eventos com SAGA por coreografia: quando o pagamento é confirmado, o evento PedidoCriado chega em paralelo pro estoque, fiscal e notificações. Cada serviço decide sozinho, grava a decisão no próprio banco e continua ou compensa o fluxo publicando um novo evento.",
      en: "Event-driven architecture with a choreography-based SAGA: when payment is confirmed, the OrderCreated event reaches inventory, invoicing, and notifications in parallel. Each service decides on its own, records the decision in its own database, and either continues or compensates the flow by publishing a new event.",
    },
    decisions: [
      {
        title: { pt: "Coreografia em vez de orquestração", en: "Choreography instead of orchestration" },
        why: {
          pt: "não existe serviço central controlando o fluxo, então não há ponto único de falha.",
          en: "there's no central service controlling the flow, so there's no single point of failure.",
        },
      },
      {
        title: { pt: "Transactional Outbox com propagação MANDATORY", en: "Transactional Outbox with MANDATORY propagation" },
        why: {
          pt: "o evento é gravado na mesma transação do dado e publicado depois por um poller, então nunca existe dado salvo sem evento.",
          en: "the event is recorded in the same transaction as the data and published later by a poller, so there's never saved data without an event.",
        },
      },
      {
        title: { pt: "Idempotência com tabela de eventos processados", en: "Idempotency via a processed-events table" },
        why: {
          pt: "se o mesmo evento chegar duas vezes, a segunda é ignorada, dentro da mesma transação da regra de negócio.",
          en: "if the same event arrives twice, the second one is ignored, inside the same transaction as the business rule.",
        },
      },
      {
        title: { pt: "Locks pessimistas ordenados no estoque", en: "Ordered pessimistic locks on inventory" },
        why: {
          pt: "evita deadlock quando dois pedidos disputam os mesmos produtos, e reservas parciais são desfeitas antes da compensação.",
          en: "prevents deadlock when two orders compete for the same products, and partial reservations are undone before compensation.",
        },
      },
      {
        title: { pt: "Tabela de pedidos cancelados no fiscal", en: "Canceled-orders table in the invoicing service" },
        why: {
          pt: "resolve a corrida quando EstoqueInsuficiente chega antes de PedidoCriado.",
          en: "resolves the race condition when InsufficientStock arrives before OrderCreated.",
        },
      },
      {
        title: { pt: "Um tópico SNS, uma fila SQS com DLQ por serviço", en: "One SNS topic, one SQS queue with a DLQ per service" },
        why: {
          pt: "cada serviço só recebe os eventos que importam pra ele (filtro por eventType), e mensagem com erro vai pra DLQ em vez de se perder.",
          en: "each service only receives the events it cares about (filtered by eventType), and failed messages go to the DLQ instead of getting lost.",
        },
      },
    ],
    features: [
      { pt: "7 microsserviços com banco próprio", en: "7 microservices, each with its own database" },
      { pt: "7 tipos de evento com contrato padronizado", en: "7 event types with a standardized contract" },
      { pt: "Reserva, confirmação e compensação de estoque", en: "Inventory reservation, confirmation, and compensation" },
      { pt: "Emissão e cancelamento de nota fiscal", en: "Invoice issuance and cancellation" },
      { pt: "Login de operador de caixa (síncrono, fora da saga)", en: "Cashier login (synchronous, outside the saga)" },
      { pt: "Ambiente completo com Docker Compose", en: "Full environment with Docker Compose" },
      { pt: "40 testes, 40 aprovados", en: "40 tests, 40 passing" },
    ],
    role: {
      pt: "Desenvolvimento de ponta a ponta: arquitetura, contrato de eventos, implementação dos sete serviços, testes e infraestrutura local.",
      en: "End-to-end development: architecture, event contracts, implementation of all seven services, tests, and local infrastructure.",
    },
    lesson: {
      pt: "Sistema distribuído bom não é o que nunca falha. É o que sabe exatamente o que fazer quando falha.",
      en: "A good distributed system isn't one that never fails. It's one that knows exactly what to do when it does.",
    },
  },
  {
    slug: "saas-comercio",
    number: "02",
    name: { pt: "SaaS de Gestão de Comércio", en: "Commerce Management SaaS" },
    subtitle: {
      pt: "Do PDV à loja virtual, sem perder uma venda.",
      en: "From the POS to the online store, without losing a sale.",
    },
    summary: {
      pt: "Monólito modular multi-tenant que roda o ciclo inteiro de uma rede de lojas: produtos, PDV com mesas, loja virtual, pagamento, caixa e relatórios, com isolamento de dados entre empresas.",
      en: "A multi-tenant modular monolith running a whole store chain's cycle: products, table-based POS, online store, payments, cash register, and reports, with full data isolation between companies.",
    },
    coverLabel: "SAAS · COMÉRCIO",
    cover: "/projects/saas-comercio.jpg",
    tags: [
      { pt: "BACK-END", en: "BACK-END" },
      { pt: "MULTI-TENANT", en: "MULTI-TENANT" },
      { pt: "CONCORRÊNCIA", en: "CONCURRENCY" },
    ],
    area: { pt: "Back-end · Fullstack", en: "Back-end · Fullstack" },
    team: "solo",
    stack: ["Java 21", "Spring Boot 3", "Spring Security + JWT", "MySQL 8.4", "Flyway", "Resilience4j", "React 19", "Vite", "Docker Compose", "JUnit 5"],
    status: "completed",
    links: { repo: "https://github.com/GabrielSantosv/ProjetoSaaS", demo: "http://localhost:5500/demos/saas-comercio/" },
    opening: {
      pt: "Uma rede de lojas tem vários operadores vendendo ao mesmo tempo no balcão e no site, caixa sendo fechado enquanto pagamentos ainda chegam e planilhas de 50 mil produtos pra importar. Qualquer CRUD faz cadastro; o difícil é aguentar isso tudo junto.",
      en: "A store chain has several operators selling at the counter and online at the same time, a register closing out while payments are still coming in, and spreadsheets of 50,000 products to import. Any CRUD can handle registration; the hard part is holding up under all of it at once.",
    },
    challenge: {
      pt: "Atender várias empresas na mesma aplicação sem que uma veja o dado da outra, e garantir que vendas simultâneas nunca deixem o estoque negativo, abram dois caixas ou paguem um pedido acima do valor.",
      en: "Serving multiple companies in the same application without one ever seeing another's data, and ensuring simultaneous sales never leave inventory negative, open two registers at once, or overpay an order.",
    },
    move: {
      pt: "Um monólito modular em Spring Boot com nove módulos de domínio, isolamento de tenant aplicado pelo próprio Hibernate e concorrência tratada como requisito: cada cenário crítico tem teste com múltiplas threads reais.",
      en: "A modular Spring Boot monolith with nine domain modules, tenant isolation enforced by Hibernate itself, and concurrency treated as a requirement: every critical scenario has a test with real multiple threads.",
    },
    decisions: [
      {
        title: { pt: "Isolamento com @TenantId do Hibernate", en: "Isolation via Hibernate's @TenantId" },
        why: {
          pt: "o tenant vem só do JWT validado e entra automaticamente em toda query, sem WHERE tenant_id espalhado pelo código.",
          en: "the tenant comes only from the validated JWT and is automatically applied to every query, with no WHERE tenant_id scattered across the code.",
        },
      },
      {
        title: { pt: "Estoque com UPDATE atômico condicional", en: "Inventory with a conditional atomic UPDATE" },
        why: {
          pt: "uma única instrução SQL impede saldo negativo, testada com 10 threads decrementando o mesmo produto.",
          en: "a single SQL statement prevents negative stock, tested with 10 threads decrementing the same product.",
        },
      },
      {
        title: { pt: "Lock pessimista no caixa e no pagamento", en: "Pessimistic lock on the register and on payment" },
        why: {
          pt: "garante um único caixa aberto e elimina dois pagamentos simultâneos furando o total do pedido.",
          en: "guarantees a single open register and eliminates two simultaneous payments blowing past the order total.",
        },
      },
      {
        title: { pt: "Virtual Threads na importação", en: "Virtual Threads for imports" },
        why: {
          pt: "planilhas grandes processadas em chunks paralelos sem travar a API.",
          en: "large spreadsheets processed in parallel chunks without blocking the API.",
        },
      },
      {
        title: { pt: "Monólito modular em vez de microsserviços", en: "Modular monolith instead of microservices" },
        why: {
          pt: "módulos bem separados sem a complexidade operacional prematura de vários serviços.",
          en: "well-separated modules without the premature operational complexity of multiple services.",
        },
      },
      {
        title: { pt: "Correção de vazamento entre lojas", en: "Fixed a cross-store data leak" },
        why: {
          pt: "um filtro dedicado garante que a loja virtual pública nunca mostre o catálogo de outro tenant, coberto por teste de regressão.",
          en: "a dedicated filter ensures the public online store never shows another tenant's catalog, covered by a regression test.",
        },
      },
    ],
    features: [
      { pt: "Multi-tenant com isolamento real", en: "Multi-tenant with real isolation" },
      { pt: "PDV com mesas e comandas", en: "POS with tables and tabs" },
      { pt: "Loja virtual com carrinho e checkout", en: "Online store with cart and checkout" },
      { pt: "Fechamento de caixa com conciliação", en: "Register closeout with reconciliation" },
      { pt: "Importação de catálogo via CSV", en: "Catalog import via CSV" },
      { pt: "Dashboard de faturamento e ticket médio", en: "Revenue and average-ticket dashboard" },
      { pt: "RBAC (Admin, Vendedor, Caixa)", en: "RBAC (Admin, Salesperson, Cashier)" },
    ],
    role: {
      pt: "Projeto solo: arquitetura, modelagem multi-tenant, concorrência no estoque e no caixa, front-end em React e testes de carga simulando operações simultâneas.",
      en: "Solo project: architecture, multi-tenant modeling, concurrency in inventory and the register, React front-end, and load tests simulating concurrent operations.",
    },
    lesson: {
      pt: "Multi-tenant de verdade não é um WHERE a mais na query. É desenhar o sistema pra que esquecer o filtro seja impossível, não só improvável.",
      en: "Real multi-tenancy isn't an extra WHERE in the query. It's designing the system so forgetting the filter is impossible, not just unlikely.",
    },
  },
  {
    slug: "precatia",
    number: "03",
    name: { pt: "PrecatIA", en: "PrecatIA" },
    subtitle: { pt: "IA lendo processo jurídico por você.", en: "AI reading legal cases for you." },
    summary: {
      pt: "Sistema web que recebe documentos jurídicos em PDF, extrai os dados importantes com OCR e usa IA pra montar o resumo do processo e a linha do tempo dos eventos críticos.",
      en: "A web system that takes in legal PDFs, extracts the important data with OCR, and uses AI to build a case summary and a timeline of critical events.",
    },
    coverLabel: "OCR · LLM",
    cover: "/projects/precatia.jpg",
    tags: [
      { pt: "IA", en: "AI" },
      { pt: "BACK-END", en: "BACK-END" },
      { pt: "OCR", en: "OCR" },
    ],
    area: { pt: "IA aplicada · Back-end", en: "Applied AI · Back-end" },
    team: "team",
    stack: ["Python", "FastAPI", "PostgreSQL", "pdfplumber", "PyMuPDF", "Tesseract", "OpenAI (GPT-4o-mini)", "React", "TypeScript", "Tailwind CSS"],
    status: "completed",
    links: { repo: "https://github.com/GabrielSantosv/ProjetoIntegrador05" },
    opening: {
      pt: "Quem analisa precatórios lida com processos longos em PDF, sem padrão nenhum, muitas vezes escaneados. Toda análise começa com alguém lendo tudo à mão atrás de nome, número do processo e decisões.",
      en: "People analyzing court-ordered debt claims deal with long PDFs with no standard format, often scanned. Every analysis starts with someone reading through it all by hand, hunting for a name, a case number, and rulings.",
    },
    challenge: {
      pt: "Extrair dados confiáveis de PDFs que às vezes são texto e às vezes são imagem, separar o que é evento crítico do que é ruído e entregar um resumo que o analista consiga usar de verdade.",
      en: "Reliably extracting data from PDFs that are sometimes text and sometimes images, separating critical events from noise, and delivering a summary the analyst can actually use.",
    },
    move: {
      pt: "Um pipeline em cascata: tenta ler o texto direto com pdfplumber, depois PyMuPDF, e só cai pro OCR (Tesseract ou o OCR nativo do Windows) quando a página é imagem. No fim, o GPT-4o-mini organiza os campos, monta a linha do tempo em ordem cronológica e escreve o resumo do desfecho.",
      en: "A cascading pipeline: tries to read the text directly with pdfplumber, then PyMuPDF, and only falls back to OCR (Tesseract or Windows' native OCR) when the page is an image. In the end, GPT-4o-mini organizes the fields, builds the chronological timeline, and writes the outcome summary.",
    },
    decisions: [
      {
        title: { pt: "Extração em cascata (pdfplumber → PyMuPDF → OCR)", en: "Cascading extraction (pdfplumber → PyMuPDF → OCR)" },
        why: {
          pt: "OCR é lento e erra mais, então só entra quando a página realmente é imagem.",
          en: "OCR is slow and more error-prone, so it only kicks in when the page is actually an image.",
        },
      },
      {
        title: { pt: "LLM opcional e no fim do pipeline", en: "LLM optional and at the end of the pipeline" },
        why: {
          pt: "o modelo recebe texto já limpo, o que reduz custo e alucinação, e o sistema continua funcionando com extração por regras se não houver chave da API.",
          en: "the model receives already-clean text, which reduces cost and hallucination, and the system keeps working with rule-based extraction if there's no API key.",
        },
      },
      {
        title: { pt: "Dois motores de OCR", en: "Two OCR engines" },
        why: {
          pt: "Tesseract como padrão e OCR nativo do Windows como alternativa, pra não depender de uma instalação só.",
          en: "Tesseract as the default and Windows' native OCR as a fallback, to avoid depending on a single installation.",
        },
      },
      {
        title: { pt: "Isolamento de documentos por usuário", en: "Per-user document isolation" },
        why: {
          pt: "cada usuário só vê os próprios documentos, com teste automatizado garantindo isso.",
          en: "each user only sees their own documents, with an automated test enforcing it.",
        },
      },
    ],
    features: [
      { pt: "Login e cadastro de usuários", en: "User login and sign-up" },
      { pt: "Upload e organização de PDFs em pastas", en: "PDF upload and folder organization" },
      { pt: "Extração de texto com OCR", en: "Text extraction with OCR" },
      { pt: "Resumo do processo e linha do tempo gerados por IA", en: "AI-generated case summary and timeline" },
      { pt: "Leitura de RG com IA de visão", en: "ID-card reading with vision AI" },
      { pt: "Dashboard com visão geral", en: "Overview dashboard" },
      { pt: "25 testes automatizados", en: "25 automated tests" },
    ],
    role: {
      pt: "Responsável pelo back-end: o pipeline de extração em cascata, a integração com o LLM e a API em FastAPI que serve o front-end.",
      en: "Responsible for the back-end: the cascading extraction pipeline, the LLM integration, and the FastAPI serving the front-end.",
    },
    lesson: {
      pt: "IA não substitui o pipeline, ela termina ele. O trabalho pesado ainda é saber exatamente quando confiar no texto extraído e quando chamar o modelo.",
      en: "AI doesn't replace the pipeline, it finishes it. The heavy lifting is still knowing exactly when to trust the extracted text and when to call the model.",
    },
  },
  {
    slug: "plataforma-consultoria",
    number: "04",
    name: { pt: "Plataforma de Consultoria", en: "Consulting Platform" },
    subtitle: { pt: "Cliente e consultor, em tempo real.", en: "Client and consultant, in real time." },
    summary: {
      pt: "Plataforma web que conecta clientes e consultores, com projetos, chat em tempo real, roadmaps em PDF e histórico de status.",
      en: "A web platform connecting clients and consultants, with projects, real-time chat, PDF roadmaps, and status history.",
    },
    coverLabel: "CONSULTORIA",
    cover: "/projects/plataforma-consultoria.jpg",
    tags: [
      { pt: "FULLSTACK", en: "FULLSTACK" },
      { pt: "TEMPO REAL", en: "REAL-TIME" },
      { pt: "EM EQUIPE", en: "TEAM" },
    ],
    area: { pt: "Fullstack · Redes e tempo real", en: "Fullstack · Networking & real-time" },
    team: "team",
    stack: ["Java", "Spring Boot", "PostgreSQL", "JWT", "WebSocket", "Sockets TCP", "iText7", "React 19", "Vite", "Tailwind CSS"],
    status: "completed",
    links: { repo: "https://github.com/GabrielSantosv/ProjetoIntegrador04" },
    opening: {
      pt: "Contratar uma consultoria costuma envolver troca de e-mail, reunião marcada por mensagem e um plano de trabalho perdido num anexo.",
      en: "Hiring a consultancy usually means email back-and-forth, a meeting scheduled over chat, and a work plan buried in an attachment.",
    },
    challenge: {
      pt: "Juntar pedido, conversa e entrega do plano num lugar só, com mensagens chegando na hora entre cliente e consultor.",
      en: "Bringing the request, the conversation, and the plan delivery into one place, with messages arriving instantly between client and consultant.",
    },
    move: {
      pt: "Back-end em Spring Boot com um servidor TCP próprio por trás de uma ponte WebSocket: o navegador conversa por WebSocket e a ponte repassa pro servidor TCP, que processa os comandos. O consultor gera o roadmap no próprio chat, salvo em PDF no banco.",
      en: "A Spring Boot back-end with its own TCP server behind a WebSocket bridge: the browser talks over WebSocket and the bridge forwards it to the TCP server, which processes the commands. The consultant generates the roadmap right from the chat, saved as a PDF in the database.",
    },
    decisions: [
      {
        title: { pt: "Ponte WebSocket → servidor TCP", en: "WebSocket → TCP server bridge" },
        why: {
          pt: "o navegador não abre socket TCP direto, então a ponte permite usar um servidor TCP de verdade por trás da aplicação web.",
          en: "browsers can't open a raw TCP socket, so the bridge makes it possible to use a real TCP server behind the web app.",
        },
      },
      {
        title: { pt: "JWT na autenticação", en: "JWT for authentication" },
        why: {
          pt: "API sem sessão, com perfis diferentes pra cliente e consultor.",
          en: "a sessionless API, with different roles for client and consultant.",
        },
      },
      {
        title: { pt: "PDF do roadmap salvo no banco (BYTEA)", en: "Roadmap PDF stored in the database (BYTEA)" },
        why: {
          pt: "o documento fica junto do projeto, sem depender de pasta no servidor.",
          en: "the document stays tied to the project, without depending on a folder on the server.",
        },
      },
      {
        title: { pt: "Histórico de status", en: "Status history" },
        why: {
          pt: "cada mudança no projeto fica registrada pra cliente e consultor acompanharem.",
          en: "every change to the project is logged so the client and consultant can track it.",
        },
      },
    ],
    features: [
      { pt: "Cadastro como cliente ou consultor", en: "Sign up as a client or consultant" },
      { pt: "Criação e gestão de projetos", en: "Project creation and management" },
      { pt: "Chat em tempo real por projeto", en: "Real-time chat per project" },
      { pt: "Geração e envio de roadmap em PDF", en: "PDF roadmap generation and delivery" },
      { pt: "Histórico de status", en: "Status history" },
    ],
    role: {
      pt: "Back-end: a ponte entre WebSocket e o servidor TCP, autenticação com JWT e a geração do roadmap em PDF.",
      en: "Back-end: the WebSocket-to-TCP bridge, JWT authentication, and PDF roadmap generation.",
    },
    lesson: {
      pt: "Tempo real parece mágica pro usuário, mas é só uma fila de mensagens bem desenhada por trás. A complexidade que some da tela vai inteira pro código.",
      en: "Real-time feels like magic to the user, but it's just a well-designed message queue underneath. The complexity that disappears from the screen moves entirely into the code.",
    },
  },
  {
    slug: "controle-de-riscos",
    number: "05",
    name: { pt: "Controle de Riscos", en: "Risk Control" },
    subtitle: {
      pt: "Do risco no chão de fábrica ao mapa do gestor.",
      en: "From a risk on the shop floor to the manager's map.",
    },
    summary: {
      pt: "Dois apps Android em Kotlin: um pra qualquer colaborador reportar riscos no ambiente de trabalho com foto e localização, outro pro gestor acompanhar tudo em dashboard e mapa, em tempo real.",
      en: "Two Kotlin Android apps: one for any employee to report workplace risks with a photo and location, another for managers to track everything on a dashboard and map, in real time.",
    },
    coverLabel: "CONTROLE · RISCOS",
    cover: "/projects/controle-de-riscos.jpg",
    tags: [
      { pt: "MOBILE", en: "MOBILE" },
      { pt: "KOTLIN", en: "KOTLIN" },
      { pt: "TEMPO REAL", en: "REAL-TIME" },
    ],
    area: { pt: "Mobile · Android", en: "Mobile · Android" },
    team: "team",
    stack: ["Kotlin", "Android", "Firebase Auth", "Firestore", "Google Maps", "MPAndroidChart", "Material Design"],
    status: "completed",
    links: { repo: "https://github.com/GabrielSantosv/ProjetoIntegrador03" },
    opening: {
      pt: "Em muitas empresas, um risco no ambiente de trabalho só chega ao gestor se alguém lembrar de avisar, e quase nunca com foto ou local exato.",
      en: "At many companies, a workplace risk only reaches the manager if someone remembers to mention it, and almost never with a photo or exact location.",
    },
    challenge: {
      pt: "Facilitar ao máximo o registro do risco por quem está no local e dar ao gestor uma visão clara de onde e de que tipo são os riscos, sem precisar atualizar a tela.",
      en: "Making it as easy as possible for whoever's on-site to log a risk, and giving managers a clear view of where and what type the risks are, with no need to refresh the screen.",
    },
    move: {
      pt: "Dois aplicativos separados por perfil: o app de registro envia o risco com foto e geolocalização, e o app de gestão recebe tudo em tempo real pelo Firestore, com gráficos por tipo e por área e um mapa de calor das ocorrências.",
      en: "Two apps split by role: the reporting app sends the risk with a photo and geolocation, and the management app receives everything in real time via Firestore, with charts by type and area and a heat map of occurrences.",
    },
    decisions: [
      {
        title: { pt: "Dois apps em vez de um com perfis", en: "Two apps instead of one with roles" },
        why: {
          pt: "cada público tem uma interface focada só no que precisa fazer.",
          en: "each audience gets an interface focused only on what it needs to do.",
        },
      },
      {
        title: { pt: "Firestore em tempo real", en: "Real-time Firestore" },
        why: {
          pt: "o dashboard do gestor atualiza sozinho assim que um risco é registrado.",
          en: "the manager's dashboard updates itself as soon as a risk is logged.",
        },
      },
      {
        title: { pt: "Geolocalização em cada registro", en: "Geolocation on every report" },
        why: {
          pt: "permite montar o mapa de riscos e ver as áreas mais críticas.",
          en: "makes it possible to build the risk map and spot the most critical areas.",
        },
      },
    ],
    features: [
      { pt: "Autenticação de usuários", en: "User authentication" },
      { pt: "Registro de risco com foto e localização", en: "Risk reporting with photo and location" },
      { pt: "Alertas pra equipe de gestão", en: "Alerts for the management team" },
      { pt: "Dashboard com gráficos por tipo e por área", en: "Dashboard with charts by type and area" },
      { pt: "Mapa de riscos", en: "Risk map" },
      { pt: "Atualização em tempo real", en: "Real-time updates" },
    ],
    role: {
      pt: "Desenvolvimento do app de registro de riscos em Kotlin: captura de foto, geolocalização e integração com o Firestore.",
      en: "Development of the risk-reporting app in Kotlin: photo capture, geolocation, and Firestore integration.",
    },
    lesson: {
      pt: "O risco mais fácil de prevenir é o mais fácil de reportar. Se o fluxo de registrar tem fricção, ninguém registra, e o dashboard bonito fica vazio.",
      en: "The easiest risk to prevent is the easiest one to report. If the reporting flow has friction, nobody reports, and the pretty dashboard stays empty.",
    },
  },
];

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string): Project {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const nextIndex = (index + 1) % PROJECTS.length;
  return PROJECTS[nextIndex];
}
