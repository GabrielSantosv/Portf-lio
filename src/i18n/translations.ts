const pt = {
  // Navbar
  "nav.sobre": "Sobre",
  "nav.projetos": "Projetos",
  "nav.stack": "Stack",
  "nav.curriculo": "Currículo",
  "nav.contato": "Contato",

  // Hero
  "hero.greeting": "Oi, sou o Gabriel",

  // About
  "about.eyebrow": "Sobre mim",
  "about.headline1": "Toda grande jogada começa",
  "about.headline2": "com um movimento ousado.",
  "about.body":
    "Sou estudante de Sistemas de Informação na PUC-Campinas e desenvolvedor back-end. Gosto de entender o sistema inteiro: da modelagem do banco à arquitetura de serviços. Trabalho com Spring Boot, microsserviços e projetos de IA aplicada, e estou atrás da minha primeira oportunidade pra jogar em um time grande.",
  "about.formacao": "Formação",
  "about.curso": "Sistemas de Informação",
  "about.previsao": "Previsão — dez / 2027",
  "about.foco": "Foco",
  "about.focoValue": "Back-end · Sistemas distribuídos · IA aplicada",
  "about.badge": "Disponível para contratação Júnior / Estagiário",
  "about.location": "Limeira, SP",

  // Experience
  "experience.eyebrow": "Experiência",
  "experience.role": "Desenvolvedor Freelancer — Scale LTDA",
  "experience.period": "2024 — atual",
  "experience.body":
    "Manutenção e evolução full-stack de sistemas web em produção, com integração front + back via REST API, correção de bugs estruturais e gerenciamento de bancos de dados MySQL e PostgreSQL.",

  // Stack
  "stack.eyebrow": "Stack",

  // Projects
  "projects.eyebrow": "Projetos Selecionados:",
  "projects.verDetalhes": "Ver detalhes",
  "projects.verDemo": "Ver demo",
  "projects.verCodigo": "Ver código",

  // Resume
  "resume.eyebrow": "Currículo",
  "resume.body": "Baixe o PDF ou abra em uma nova aba para conferir minha trajetória completa.",
  "resume.baixar": "Baixar PDF",
  "resume.abrir": "Abrir em nova aba",

  // Contact
  "contact.headline1": "Oportunidades &",
  "contact.headline2": "Conexões.",
  "contact.email": "E-mail",
  "contact.linkedin": "LinkedIn",
  "contact.github": "GitHub",
  "contact.instagram": "Instagram",
  "contact.voltarTopo": "Voltar ao topo",
  "contact.location": "Limeira, SP",

  // 404
  "notfound.title": "Partida não encontrada · Gabriel dos Santos",
  "notfound.eyebrow": "404 ──── Xeque-mate",
  "notfound.headline": "Essa partida não existe.",
  "notfound.body": "O projeto que você procura não está no tabuleiro.",
  "notfound.voltar": "Voltar às partidas",

  // Project detail page
  "detail.voltar": "Voltar às partidas",
  "detail.area": "Área",
  "detail.time": "Time",
  "detail.arsenal": "Arsenal",
  "detail.status": "Status",
  "detail.acesso": "Acesso",
  "detail.repositorio": "Repositório",
  "detail.verDemo": "Ver demo",
  "detail.linksEmBreve": "Os links desta partida saem em breve.",
  "detail.analise": "Análise da partida",
  "detail.abertura": "A Abertura",
  "detail.desafio": "O Desafio",
  "detail.jogada": "A Jogada",
  "detail.decisoes": "Decisões de arquitetura",
  "detail.lances": "Lances principais",
  "detail.papel": "Meu papel",
  "detail.proximaPartida": "Próxima partida",
  "detail.teamSolo": "Solo",
  "detail.teamEquipe": "Em equipe",
  "detail.statusConcluido": "Concluído",
  "detail.statusAndamento": "Em andamento",

  // Document titles
  "doc.home": "Gabriel dos Santos · Desenvolvedor Back-end",

  // Toggles
  "toggle.theme": "Alternar tema",
  "toggle.lang": "Switch to English",
} as const;

const en: Record<keyof typeof pt, string> = {
  "nav.sobre": "About",
  "nav.projetos": "Projects",
  "nav.stack": "Stack",
  "nav.curriculo": "Resume",
  "nav.contato": "Contact",

  "hero.greeting": "Hi, I'm Gabriel",

  "about.eyebrow": "About me",
  "about.headline1": "Every great move starts",
  "about.headline2": "with a bold one.",
  "about.body":
    "I'm an Information Systems student at PUC-Campinas and a back-end developer. I like understanding the whole system: from database design to service architecture. I work with Spring Boot, microservices, and applied AI projects, and I'm looking for my first opportunity to play on a bigger team.",
  "about.formacao": "Education",
  "about.curso": "Information Systems",
  "about.previsao": "Expected — Dec / 2027",
  "about.foco": "Focus",
  "about.focoValue": "Back-end · Distributed systems · Applied AI",
  "about.badge": "Open to Junior / Intern opportunities",
  "about.location": "Limeira, Brazil",

  "experience.eyebrow": "Experience",
  "experience.role": "Freelance Developer — Scale LTDA",
  "experience.period": "2024 — present",
  "experience.body":
    "Full-stack maintenance and evolution of production web systems, with front + back integration via REST API, structural bug fixes, and management of MySQL and PostgreSQL databases.",

  "stack.eyebrow": "Stack",

  "projects.eyebrow": "Selected Projects:",
  "projects.verDetalhes": "View details",
  "projects.verDemo": "View demo",
  "projects.verCodigo": "View code",

  "resume.eyebrow": "Resume",
  "resume.body": "Download the PDF or open it in a new tab to see my full background.",
  "resume.baixar": "Download PDF",
  "resume.abrir": "Open in new tab",

  "contact.headline1": "Opportunities &",
  "contact.headline2": "Connections.",
  "contact.email": "Email",
  "contact.linkedin": "LinkedIn",
  "contact.github": "GitHub",
  "contact.instagram": "Instagram",
  "contact.voltarTopo": "Back to top",
  "contact.location": "Limeira, Brazil",

  "notfound.title": "Match not found · Gabriel dos Santos",
  "notfound.eyebrow": "404 ──── Checkmate",
  "notfound.headline": "This match doesn't exist.",
  "notfound.body": "The project you're looking for isn't on the board.",
  "notfound.voltar": "Back to matches",

  "detail.voltar": "Back to matches",
  "detail.area": "Area",
  "detail.time": "Team",
  "detail.arsenal": "Arsenal",
  "detail.status": "Status",
  "detail.acesso": "Access",
  "detail.repositorio": "Repository",
  "detail.verDemo": "View demo",
  "detail.linksEmBreve": "This match's links are coming soon.",
  "detail.analise": "Match analysis",
  "detail.abertura": "The Opening",
  "detail.desafio": "The Challenge",
  "detail.jogada": "The Move",
  "detail.decisoes": "Architecture decisions",
  "detail.lances": "Key features",
  "detail.papel": "My role",
  "detail.proximaPartida": "Next match",
  "detail.teamSolo": "Solo",
  "detail.teamEquipe": "Team project",
  "detail.statusConcluido": "Completed",
  "detail.statusAndamento": "In progress",

  "doc.home": "Gabriel dos Santos · Backend Developer",

  "toggle.theme": "Toggle theme",
  "toggle.lang": "Mudar para Português",
};

export const translations = { pt, en };
export type TranslationKey = keyof typeof pt;
