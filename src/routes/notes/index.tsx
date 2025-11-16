import Note from "@/components/Note";
import { getActiveNotes } from "@/data/demo.notes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notes/")({
  component: Home,
  loader: async () => await getActiveNotes(),
});

function Home() {
  const notes = Route.useLoaderData();

  return (
    <div className="divide-y">
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
}
