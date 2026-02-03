import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-4">
      <h2 className="text-6xl font-teko mb-4">404</h2>
      <p className="text-xl text-zinc-400 mb-8">Personaje no encontrado</p>
      <Link 
        href="/"
        className="px-6 py-2 bg-white text-black font-bold rounded hover:bg-zinc-200 transition-colors"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}
