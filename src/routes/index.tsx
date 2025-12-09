import Note from "@/components/Note";
import { getActiveNotes } from "@/data/demo.notes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => await getActiveNotes(),
});

function RouteComponent() {
  const notes = Route.useLoaderData();

  return (
    <div className="divide-y">
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
}
