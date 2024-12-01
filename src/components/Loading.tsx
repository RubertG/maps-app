export function Loading() {
  return (
    <section className="bg-zinc-100/50 backdrop-blur-sm border border-zinc-200 p-4 rounded-lg max-w-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-2xl font-bold text-center mb-2">Espere por favor</h2>
      <p className="text-center text-zinc-700">Estamos cargando tu ubicación...</p>
    </section>
  )
}
