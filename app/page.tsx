import Particles from "@/components/reactbits/particles";
import { SideRays } from "@/components/reactbits/side-rays";
import { HeroSection } from "@/components/hero-section";
import { WorksSection } from "@/components/works-section";
import { AboutSection } from "@/components/about-section";
import { BlogSection } from "@/components/blog-section";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";

export default async function HomePage() {
  return (
    <>
      <Particles
        particleColors={["#b58f83", "#b69aa0", "#b49a7d", "#a998a4"]}
        particleCount={175}
        particleSpread={9}
        speed={0.86}
        particleBaseSize={58}
        glow={0.2}
        twinkle={0.3}
        moveParticlesOnHover={false}
        sizeRandomness={0.65}
        shape="circle"
        depthOfField={0}
        connections={false}
        clickBurst={true}
        drift="up"
        scrollDriven
        scrollSpeed={0.0015}
        fitToViewport
        disableRotation
        intro={true}
        opacity={0.62}
        className="pointer-events-none fixed inset-0 z-0"
        style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh" }}
      />
      <SideRays />
      <div className="relative z-10 flex flex-col">
        <HeroSection />
        <WorksSection />
        <AboutSection />
        <BlogSection />
        <ContactSection />
        <SiteFooter />
      </div>
    </>
  );
}
