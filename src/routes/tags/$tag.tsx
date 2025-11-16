import Note from "@/components/Note";
import { getNotesByTag } from "@/data/demo.notes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tags/$tag")({
  component: RouteComponent,
  loader: async ({ params }: { params: { tag: string } }) => {
    const notes = await getNotesByTag({ data: params.tag });
    if (!notes) {
      throw new Error("Notes not found");
    }
    return notes;
  },
});

function RouteComponent() {
  const notes = Route.useLoaderData();

  return (
    <div>
      <div className="divide-y">
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
