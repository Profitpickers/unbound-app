/* Navbar UNBOUND — barra di navigazione con logo e selettore lingua.
   Stile: sfondo trasparente con blur, bordo inferiore gold sottile. */
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  return (
    <header
      className="
        fixed top-0 inset-x-0 z-50
        flex items-center justify-between
        px-6 py-4
        bg-obsidian/80 backdrop-blur-md
        border-b border-gold/10
      "
    >
      {/* Logo testuale UNBOUND */}
      <span className="text-gold font-bold text-lg tracking-[0.15em] uppercase select-none">
        UNBOUND
      </span>

      {/* Selettore lingua */}
      <LanguageSwitcher />
    </header>
  );
}
