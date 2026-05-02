/* Pagina principale UNBOUND per il locale selezionato.
   Composizione: Navbar + HeroSection + RoadmapSection.
   Server Component: nessun "use client" necessario qui. */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RoadmapSection from "@/components/RoadmapSection";

export default function HomePage() {
  return (
    <main className="relative">
      {/* Barra di navigazione con selettore lingua */}
      <Navbar />

      {/* Sezione Hero — occupa l'intero viewport */}
      <HeroSection />

      {/* Separatore visivo */}
      <div
        className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        aria-hidden="true"
      />

      {/* Sezione Roadmap — subito sotto il Hero */}
      <RoadmapSection />
    </main>
  );
}
