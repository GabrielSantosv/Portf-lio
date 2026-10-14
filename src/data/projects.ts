export type Project = {
  slug: string;
  number: string;
  name: string;
  subtitle: string;
  summary: string;
  coverLabel: string;
  cover: string;
  tags: string[];
  area: string;
  team: "Solo" | "Em equipe";
  stack: string[];
  status: "Concluído" | "Em andamento";
  links: { repo?: string; demo?: string };
  opening: string;
  challenge: string;
  move: string;
  decisions: { title: string; why: string }[];
  features: string[];
  role: string;
  lesson: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "marketflow-saga",
    number: "01",
    name: "MarketFlow Saga",
    subtitle: "Sete microsserviços, nenhum esperando o outro.",
    summary:
      "Back-end que simula o atendimento de um supermercado com sete microsserviços independentes, banco por serviço e SAGA por coreografia, usando SNS/SQS compatíveis com AWS.",
    coverLabel: "SAGA · AWS",
    cover: "/projects/marketflow-saga.jpg",
    tags: ["BACK-END", "MICROSSERVIÇOS", "AWS"],
    area: "Back-end · Sistemas distribuídos",
    team: "Solo",
    stack: ["Java 21", "Spring Boot 3", "PostgreSQL 16", "Flyway", "AWS SDK v2 (SNS/SQS)", "Floci", "Docker Compose", "JUnit 5", "Mockito"],
    status: "Concluído",
    links: { repo: "https://github.com/GabrielSantosv/Projeto-AWS" },
    opening:
      "A primeira versão era uma cadeia de chamadas HTTP síncronas: cada serviço esperava a resposta do anterior. Se uma etapa caía, a venda inteira caía junto, e numa Black Friday escalar servidor só adiava o colapso.",
    challenge:
      "Fazer estoque, nota fiscal, notificação e expedição reagirem a uma mesma venda sem nenhuma chamada REST entre eles, sem orquestrador central, e ainda assim chegar a um resultado consistente mesmo com eventos duplicados, fora de ordem ou com falha.",
    move:
      "Arquitetura orientada a eventos com SAGA por coreografia: quando o pagamento é confirmado, o evento PedidoCriado chega em paralelo pro estoque, fiscal e notificações. Cada serviço decide sozinho, grava a decisão no próprio banco e continua ou compensa o fluxo publicando um novo evento.",
    decisions: [
      {
        title: "Coreografia em vez de orquestração",
        why: "não existe serviço central controlando o fluxo, então não há ponto único de falha.",
      },
      {
        title: "Transactional Outbox com propagação MANDATORY",
        why: "o evento é gravado na mesma transação do dado e publicado depois por um poller, então nunca existe dado salvo sem evento.",
      },
      {
        title: "Idempotência com tabela de eventos processados",
        why: "se o mesmo evento chegar duas vezes, a segunda é ignorada, dentro da mesma transação da regra de negócio.",
      },
      {
        title: "Locks pessimistas ordenados no estoque",
        why: "evita deadlock quando dois pedidos disputam os mesmos produtos, e reservas parciais são desfeitas antes da compensação.",
      },
      {
        title: "Tabela de pedidos cancelados no fiscal",
        why: "resolve a corrida quando EstoqueInsuficiente chega antes de PedidoCriado.",
      },
      {
        title: "Um tópico SNS, uma fila SQS com DLQ por serviço",
        why: "cada serviço só recebe os eventos que importam pra ele (filtro por eventType), e mensagem com erro vai pra DLQ em vez de se perder.",
      },
    ],
    features: [
      "7 microsserviços com banco próprio",
      "7 tipos de evento com contrato padronizado",
      "Reserva, confirmação e compensação de estoque",
      "Emissão e cancelamento de nota fiscal",
      "Login de operador de caixa (síncrono, fora da saga)",
      "Ambiente completo com Docker Compose",
      "40 testes, 40 aprovados",
    ],
    role: "Desenvolvimento de ponta a ponta: arquitetura, contrato de eventos, implementação dos sete serviços, testes e infraestrutura local.",
    lesson: "Sistema distribuído bom não é o que nunca falha. É o que sabe exatamente o que fazer quando falha.",
  },
  {
    slug: "saas-comercio",
    number: "02",
    name: "SaaS de Gestão de Comércio",
    subtitle: "Do PDV à loja virtual, sem perder uma venda.",
    summary:
      "Monólito modular multi-tenant que roda o ciclo inteiro de uma rede de lojas: produtos, PDV com mesas, loja virtual, pagamento, caixa e relatórios, com isolamento de dados entre empresas.",
    coverLabel: "SAAS · COMÉRCIO",
    cover: "/projects/saas-comercio.jpg",
    tags: ["BACK-END", "MULTI-TENANT", "CONCORRÊNCIA"],
    area: "Back-end · Fullstack",
    team: "Solo",
    stack: ["Java 21", "Spring Boot 3", "Spring Security + JWT", "MySQL 8.4", "Flyway", "Resilience4j", "React 19", "Vite", "Docker Compose", "JUnit 5"],
    status: "Concluído",
    links: { repo: "https://github.com/GabrielSantosv/ProjetoSaaS", demo: "http://localhost:5500/demos/saas-comercio/" },
    opening:
      "Uma rede de lojas tem vários operadores vendendo ao mesmo tempo no balcão e no site, caixa sendo fechado enquanto pagamentos ainda chegam e planilhas de 50 mil produtos pra importar. Qualquer CRUD faz cadastro; o difícil é aguentar isso tudo junto.",
    challenge:
      "Atender várias empresas na mesma aplicação sem que uma veja o dado da outra, e garantir que vendas simultâneas nunca deixem o estoque negativo, abram dois caixas ou paguem um pedido acima do valor.",
    move:
      "Um monólito modular em Spring Boot com nove módulos de domínio, isolamento de tenant aplicado pelo próprio Hibernate e concorrência tratada como requisito: cada cenário crítico tem teste com múltiplas threads reais.",
    decisions: [
      {
        title: "Isolamento com @TenantId do Hibernate",
        why: "o tenant vem só do JWT validado e entra automaticamente em toda query, sem WHERE tenant_id espalhado pelo código.",
      },
      {
        title: "Estoque com UPDATE atômico condicional",
        why: "uma única instrução SQL impede saldo negativo, testada com 10 threads decrementando o mesmo produto.",
      },
      {
        title: "Lock pessimista no caixa e no pagamento",
        why: "garante um único caixa aberto e elimina dois pagamentos simultâneos furando o total do pedido.",
      },
      {
        title: "Virtual Threads na importação",
        why: "planilhas grandes processadas em chunks paralelos sem travar a API.",
      },
      {
        title: "Monólito modular em vez de microsserviços",
        why: "módulos bem separados sem a complexidade operacional prematura de vários serviços.",
      },
      {
        title: "Correção de vazamento entre lojas",
        why: "um filtro dedicado garante que a loja virtual pública nunca mostre o catálogo de outro tenant, coberto por teste de regressão.",
      },
    ],
    features: [
      "Multi-tenant com isolamento real",
      "PDV com mesas e comandas",
      "Loja virtual com carrinho e checkout",
      "Fechamento de caixa com conciliação",
      "Importação de catálogo via CSV",
      "Dashboard de faturamento e ticket médio",
      "RBAC (Admin, Vendedor, Caixa)",
    ],
    role: "Projeto solo: arquitetura, modelagem multi-tenant, concorrência no estoque e no caixa, front-end em React e testes de carga simulando operações simultâneas.",
    lesson:
      "Multi-tenant de verdade não é um WHERE a mais na query. É desenhar o sistema pra que esquecer o filtro seja impossível, não só improvável.",
  },
  {
    slug: "precatia",
    number: "03",
    name: "PrecatIA",
    subtitle: "IA lendo processo jurídico por você.",
    summary:
      "Sistema web que recebe documentos jurídicos em PDF, extrai os dados importantes com OCR e usa IA pra montar o resumo do processo e a linha do tempo dos eventos críticos.",
    coverLabel: "OCR · LLM",
    cover: "/projects/precatia.jpg",
    tags: ["IA", "BACK-END", "OCR"],
    area: "IA aplicada · Back-end",
    team: "Em equipe",
    stack: ["Python", "FastAPI", "PostgreSQL", "pdfplumber", "PyMuPDF", "Tesseract", "OpenAI (GPT-4o-mini)", "React", "TypeScript", "Tailwind CSS"],
    status: "Concluído",
    links: { repo: "https://github.com/GabrielSantosv/ProjetoIntegrador05" },
    opening:
      "Quem analisa precatórios lida com processos longos em PDF, sem padrão nenhum, muitas vezes escaneados. Toda análise começa com alguém lendo tudo à mão atrás de nome, número do processo e decisões.",
    challenge:
      "Extrair dados confiáveis de PDFs que às vezes são texto e às vezes são imagem, separar o que é evento crítico do que é ruído e entregar um resumo que o analista consiga usar de verdade.",
    move:
      "Um pipeline em cascata: tenta ler o texto direto com pdfplumber, depois PyMuPDF, e só cai pro OCR (Tesseract ou o OCR nativo do Windows) quando a página é imagem. No fim, o GPT-4o-mini organiza os campos, monta a linha do tempo em ordem cronológica e escreve o resumo do desfecho.",
    decisions: [
      {
        title: "Extração em cascata (pdfplumber → PyMuPDF → OCR)",
        why: "OCR é lento e erra mais, então só entra quando a página realmente é imagem.",
      },
      {
        title: "LLM opcional e no fim do pipeline",
        why: "o modelo recebe texto já limpo, o que reduz custo e alucinação, e o sistema continua funcionando com extração por regras se não houver chave da API.",
      },
      {
        title: "Dois motores de OCR",
        why: "Tesseract como padrão e OCR nativo do Windows como alternativa, pra não depender de uma instalação só.",
      },
      {
        title: "Isolamento de documentos por usuário",
        why: "cada usuário só vê os próprios documentos, com teste automatizado garantindo isso.",
      },
    ],
    features: [
      "Login e cadastro de usuários",
      "Upload e organização de PDFs em pastas",
      "Extração de texto com OCR",
      "Resumo do processo e linha do tempo gerados por IA",
      "Leitura de RG com IA de visão",
      "Dashboard com visão geral",
      "25 testes automatizados",
    ],
    role: "Responsável pelo back-end: o pipeline de extração em cascata, a integração com o LLM e a API em FastAPI que serve o front-end.",
    lesson:
      "IA não substitui o pipeline, ela termina ele. O trabalho pesado ainda é saber exatamente quando confiar no texto extraído e quando chamar o modelo.",
  },
  {
    slug: "plataforma-consultoria",
    number: "04",
    name: "Plataforma de Consultoria",
    subtitle: "Cliente e consultor, em tempo real.",
    summary:
      "Plataforma web que conecta clientes e consultores, com projetos, chat em tempo real, roadmaps em PDF e histórico de status.",
    coverLabel: "CONSULTORIA",
    cover: "/projects/plataforma-consultoria.jpg",
    tags: ["FULLSTACK", "TEMPO REAL", "EM EQUIPE"],
    area: "Fullstack · Redes e tempo real",
    team: "Em equipe",
    stack: ["Java", "Spring Boot", "PostgreSQL", "JWT", "WebSocket", "Sockets TCP", "iText7", "React 19", "Vite", "Tailwind CSS"],
    status: "Concluído",
    links: { repo: "https://github.com/GabrielSantosv/ProjetoIntegrador04" },
    opening:
      "Contratar uma consultoria costuma envolver troca de e-mail, reunião marcada por mensagem e um plano de trabalho perdido num anexo.",
    challenge:
      "Juntar pedido, conversa e entrega do plano num lugar só, com mensagens chegando na hora entre cliente e consultor.",
    move:
      "Back-end em Spring Boot com um servidor TCP próprio por trás de uma ponte WebSocket: o navegador conversa por WebSocket e a ponte repassa pro servidor TCP, que processa os comandos. O consultor gera o roadmap no próprio chat, salvo em PDF no banco.",
    decisions: [
      {
        title: "Ponte WebSocket → servidor TCP",
        why: "o navegador não abre socket TCP direto, então a ponte permite usar um servidor TCP de verdade por trás da aplicação web.",
      },
      {
        title: "JWT na autenticação",
        why: "API sem sessão, com perfis diferentes pra cliente e consultor.",
      },
      {
        title: "PDF do roadmap salvo no banco (BYTEA)",
        why: "o documento fica junto do projeto, sem depender de pasta no servidor.",
      },
      {
        title: "Histórico de status",
        why: "cada mudança no projeto fica registrada pra cliente e consultor acompanharem.",
      },
    ],
    features: [
      "Cadastro como cliente ou consultor",
      "Criação e gestão de projetos",
      "Chat em tempo real por projeto",
      "Geração e envio de roadmap em PDF",
      "Histórico de status",
    ],
    role: "Back-end: a ponte entre WebSocket e o servidor TCP, autenticação com JWT e a geração do roadmap em PDF.",
    lesson:
      "Tempo real parece mágica pro usuário, mas é só uma fila de mensagens bem desenhada por trás. A complexidade que some da tela vai inteira pro código.",
  },
  {
    slug: "controle-de-riscos",
    number: "05",
    name: "Controle de Riscos",
    subtitle: "Do risco no chão de fábrica ao mapa do gestor.",
    summary:
      "Dois apps Android em Kotlin: um pra qualquer colaborador reportar riscos no ambiente de trabalho com foto e localização, outro pro gestor acompanhar tudo em dashboard e mapa, em tempo real.",
    coverLabel: "CONTROLE · RISCOS",
    cover: "/projects/controle-de-riscos.jpg",
    tags: ["MOBILE", "KOTLIN", "TEMPO REAL"],
    area: "Mobile · Android",
    team: "Em equipe",
    stack: ["Kotlin", "Android", "Firebase Auth", "Firestore", "Google Maps", "MPAndroidChart", "Material Design"],
    status: "Concluído",
    links: { repo: "https://github.com/GabrielSantosv/ProjetoIntegrador03" },
    opening:
      "Em muitas empresas, um risco no ambiente de trabalho só chega ao gestor se alguém lembrar de avisar, e quase nunca com foto ou local exato.",
    challenge:
      "Facilitar ao máximo o registro do risco por quem está no local e dar ao gestor uma visão clara de onde e de que tipo são os riscos, sem precisar atualizar a tela.",
    move:
      "Dois aplicativos separados por perfil: o app de registro envia o risco com foto e geolocalização, e o app de gestão recebe tudo em tempo real pelo Firestore, com gráficos por tipo e por área e um mapa de calor das ocorrências.",
    decisions: [
      {
        title: "Dois apps em vez de um com perfis",
        why: "cada público tem uma interface focada só no que precisa fazer.",
      },
      {
        title: "Firestore em tempo real",
        why: "o dashboard do gestor atualiza sozinho assim que um risco é registrado.",
      },
      {
        title: "Geolocalização em cada registro",
        why: "permite montar o mapa de riscos e ver as áreas mais críticas.",
      },
    ],
    features: [
      "Autenticação de usuários",
      "Registro de risco com foto e localização",
      "Alertas pra equipe de gestão",
      "Dashboard com gráficos por tipo e por área",
      "Mapa de riscos",
      "Atualização em tempo real",
    ],
    role: "Desenvolvimento do app de registro de riscos em Kotlin: captura de foto, geolocalização e integração com o Firestore.",
    lesson:
      "O risco mais fácil de prevenir é o mais fácil de reportar. Se o fluxo de registrar tem fricção, ninguém registra, e o dashboard bonito fica vazio.",
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
