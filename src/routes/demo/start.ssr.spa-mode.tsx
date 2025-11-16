import { getAllNotes } from "@/data/demo.notes";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/demo/start/ssr/spa-mode")({
  ssr: false,
  component: RouteComponent,
});

function RouteComponent() {
  const [notes, setNotes] = useState<Awaited<ReturnType<typeof getAllNotes>>>(
    [],
  );

  useEffect(() => {
    getAllNotes().then(setNotes);
  }, []);

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-800 to-black p-4 text-white"
      style={{
        backgroundImage:
          "radial-gradient(50% 50% at 20% 60%, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)",
      }}
    >
      <div className="w-full max-w-2xl rounded-xl border-8 border-black/10 bg-black/50 p-8 shadow-xl backdrop-blur-md">
        <h1 className="mb-6 font-bold text-3xl text-green-400">
          SPA Mode - Punk Songs
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
