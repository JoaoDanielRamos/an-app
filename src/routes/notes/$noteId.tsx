import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { getNoteById } from "@/data/demo.notes";
import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { useState } from "react";

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
  const [title, setTitle] = useState(note?.title);
  const [content, setContent] = useState(note?.content);

  return (
    <div className="space-y-2 p-4">
      <p className="text-gray-500 text-sm">
        {format(note?.createdAt, "d MMM yyyy")}
      </p>

      <Textarea
        className="border-none p-0 font-bold text-2xl text-stone-900 transition-all duration-300 focus-visible:bg-stone-100 focus-visible:p-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      >
        {title}
      </Textarea>

      <div className="flex gap-2">
        {note?.tags.map((tag: string) => (
          <Badge
            key={tag}
            variant="outline"
            className="rounded-sm bg-zinc-200 font-semibold text-zinc-600"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <Textarea
        className="border-none p-0 text-gray-500 text-sm transition-all duration-300 focus-visible:bg-stone-100 focus-visible:p-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
    </div>
  );
}
