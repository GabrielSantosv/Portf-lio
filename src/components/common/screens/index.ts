import type { Screen, ShowcaseFrame } from "../ProjectShowcase";
import { marketflowSagaScreens } from "./marketflowSaga";
import { saasComercioScreens } from "./saasComercio";
import { precatiaScreens } from "./precatia";
import { plataformaConsultoriaScreens } from "./plataformaConsultoria";
import { controleDeRiscosScreens } from "./controleDeRiscos";

export const PROJECT_SCREENS: Record<string, { frame: ShowcaseFrame; screens: Screen[] }> = {
  "marketflow-saga": { frame: "panel", screens: marketflowSagaScreens },
  "saas-comercio": { frame: "browser", screens: saasComercioScreens },
  precatia: { frame: "browser", screens: precatiaScreens },
  "plataforma-consultoria": { frame: "browser", screens: plataformaConsultoriaScreens },
  "controle-de-riscos": { frame: "phones", screens: controleDeRiscosScreens },
};
