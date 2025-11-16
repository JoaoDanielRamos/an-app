import Note from "@/components/Note";
import { getArchivedNotes } from "@/data/demo.notes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/archived")({
  component: RouteComponent,
  loader: async () => await getArchivedNotes(),
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
