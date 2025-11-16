import { getNoteById } from "@/data/demo.notes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notes/$noteId")({
  component: RouteComponent,
  loader: async ({ params }: { params: { noteId: string } }) => {
    const note = await getNoteById({ data: params.noteId });
    if (!note) {
      throw new Error("Note not found");
    }
    return note;
  },
});

function RouteComponent() {
  const note = Route.useLoaderData();

  return <div>{note?.title}</div>;
}
