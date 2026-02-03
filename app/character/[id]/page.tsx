import { Hunters, StarDescriptions } from "@/data/characters";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// 1. Static Site Generation (SSG) - Generates all pages at build time
export async function generateStaticParams() {
  return Hunters.map((hunter) => ({
    id: hunter.id.toString(),
  }));
}

// 2. Dynamic SEO Metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const character = Hunters.find((h) => h.id.toString() === id);

  if (!character) {
    return {
      title: "Character Not Found",
    };
  }

  return {
    title: `${character.nombre} | Hunter Wiki`,
    description: character.info,
  };
}

export default async function CharacterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const character = Hunters.find((h) => h.id.toString() === id);

  if (!character) {
    notFound();
  }

  const abilities = [
    character.habilidad1,
    character.habilidad2,
    character.habilidad3,
    character.habilidad4,
    character.habilidad5,
    character.habilidad6,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 font-sans pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[55vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900 z-10" />
        <Image
          src={character.img}
          alt={character.nombre}
          fill
          className="object-cover object-top opacity-50 blur-sm scale-110"
          unoptimized
        />
        <div className="absolute bottom-0 left-0 w-full z-20 p-8 flex flex-col items-center md:items-start max-w-6xl mx-auto">
          <Link href="/" className="mb-4 text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-xl">
            ← Volver a la lista
          </Link>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-zinc-800 overflow-hidden shadow-2xl shrink-0 bg-white">
               <Image
                src={character.img}
                alt={character.nombre}
                fill
                className="object-cover object-top"
                unoptimized
              />
            </div>
            <div className="mb-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-5xl md:text-7xl font-bold font-teko uppercase tracking-wider text-white drop-shadow-lg">
                  {character.nombre}
                </h1>
                {character.estrellas > 0 && (
                   <div className="flex gap-1" title={StarDescriptions[character.estrellas]}>
                      {[...Array(character.estrellas)].map((_, i) => (
                        <span key={i} className="text-3xl text-yellow-400">★</span>
                      ))}
                   </div>
                )}
              </div>
              <p className="text-xl md:text-2xl text-zinc-300 font-teko uppercase tracking-wide bg-zinc-800/50 px-3 py-1 rounded-md inline-block backdrop-blur-sm">
                {character.edad}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Column: Info & Stats */}
        <div className="space-y-8">
            <div className="bg-zinc-800/50 p-6 rounded-xl border border-white/5 backdrop-blur-sm">
                <h2 className="text-2xl font-teko uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Datos</h2>
                <div className="space-y-4">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 relative rounded-full overflow-hidden bg-white/10 shrink-0">
                             <Image src={character.tipo} alt="Nen Type" fill className="object-cover" unoptimized/>
                        </div>
                        <div>
                            <span className="text-xs uppercase text-zinc-500 font-bold block">Tipo de Nen</span>
                            <span className="text-lg leading-tight block">{character.nem.split(':')[0]}</span>
                        </div>
                     </div>
                </div>
            </div>

             <div className="bg-zinc-800/50 p-6 rounded-xl border border-white/5 backdrop-blur-sm">
                <h2 className="text-2xl font-teko uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Biografía</h2>
                <p className="text-zinc-300 leading-relaxed text-lg">
                    {character.info}
                </p>
             </div>
        </div>

        {/* Right Column: Abilities */}
        <div className="md:col-span-2 space-y-8">
             <div className="bg-zinc-800/50 p-8 rounded-xl border border-white/5 backdrop-blur-sm">
                <h2 className="text-3xl font-teko uppercase tracking-wider mb-6 border-b border-white/10 pb-2 flex items-center gap-2">
                    Habilidades Nen
                </h2>
                <div className="grid gap-6">
                    {abilities.map((ability, index) => {
                        const [name, desc] = ability!.split(':');
                        return (
                            <div key={index} className="group p-4 rounded-lg bg-zinc-900/50 hover:bg-zinc-700/50 transition-colors border border-transparent hover:border-white/10">
                                <h3 className="text-xl font-bold text-yellow-500 mb-2 group-hover:text-yellow-400 transition-colors">{name}</h3>
                                <p className="text-zinc-400 group-hover:text-zinc-300 leading-relaxed">
                                    {desc ? desc : name} {/* Handle case where split might not work perfectly if no colon */}
                                </p>
                            </div>
                        );
                    })}
                </div>
             </div>

             <div className="bg-zinc-800/50 p-8 rounded-xl border border-white/5 backdrop-blur-sm">
                <h2 className="text-3xl font-teko uppercase tracking-wider mb-6 border-b border-white/10 pb-2">
                    Detalles de Nen
                </h2>
                <p className="text-zinc-300 text-lg leading-relaxed">
                    {character.nem}
                </p>
             </div>
        </div>
      </div>
    </div>
  );
}
