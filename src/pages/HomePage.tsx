import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import TechMarqueeSection from "../components/TechMarqueeSection";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";
import ResumeSection from "../components/ResumeSection";
import ContactSection from "../components/ContactSection";
import { useLanguage } from "../context/LanguageContext";

export default function HomePage() {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t("doc.home");
  }, [t]);

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.slice(1);
    // Wait a tick for layout (images, fonts, sticky cards) to settle before
    // measuring where to land. Native scrollIntoView correctly accounts for
    // the sticky cards' pinned position; Lenis's own scrollTo does not.
    const timer = window.setTimeout(() => {
      const target = document.getElementById(id);
      target?.scrollIntoView({ block: "start" });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [location.hash]);

  return (
    <>
      <HeroSection />
      <TechMarqueeSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ResumeSection />
      <ContactSection />
    </>
  );
}
