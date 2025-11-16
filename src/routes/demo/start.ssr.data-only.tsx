import { getActiveNotes } from "@/data/demo.notes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/start/ssr/data-only")({
  ssr: "data-only",
  component: RouteComponent,
  loader: async () => await getActiveNotes(),
});

function RouteComponent() {
  const notes = Route.useLoaderData();

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-800 to-black p-4 text-white"
      style={{
        backgroundImage:
          "radial-gradient(50% 50% at 20% 60%, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)",
      }}
    >
      <div className="w-full max-w-2xl rounded-xl border-8 border-black/10 bg-black/50 p-8 shadow-xl backdrop-blur-md">
        <h1 className="mb-6 font-bold text-3xl text-pink-400">
          Data Only SSR - Notes
        </h1>
        <ul className="space-y-3">
          {notes.map((note) => (
            <li
              key={note.id}
              className="rounded-lg border border-white/20 bg-white/10 p-4 shadow-md backdrop-blur-sm"
            >
              <span className="font-medium text-lg text-white">
                {note.title}
              </span>
              <span className="text-white/60"> - {note.content}</span>
              <span className="text-white/60"> - {note.createdAt}</span>
              <span className="text-white/60"> - {note.updatedAt}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
