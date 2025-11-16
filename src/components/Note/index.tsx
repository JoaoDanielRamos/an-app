import type { Note as NoteType } from "@/types/note";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { ArchiveIcon } from "lucide-react";
import { Badge } from "../ui/badge";

export default function Note({ note }: { note: NoteType }) {
  const title = <h2 className="font-bold">{note.title}</h2>;

  const tags = (
    <div className="flex gap-1">
      {note.tags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  );

  const createdAt = (
    <p className="text-gray-500 text-sm">
      {format(note.createdAt, "d MMM yyyy")}
    </p>
  );

  const archivedBadge = note.archived && (
    <div className="">
      <Badge variant="outline" className="rounded-sm bg-pink-100 font-bold">
        <ArchiveIcon className="stroke-2" />
        Archived
      </Badge>
    </div>
  );

  const noteId = note.id.toString();

  return (
    <Link
      to={`/notes/${noteId}` as any}
      className="block space-y-2 p-4"
      viewTransition={{ types: ["slide-left"] }}
    >
      {title}
      {tags}
      {createdAt}
      {archivedBadge}
    </Link>
  );
}

export function Tag({ tag }: { tag: string }) {
  return (
    <Link
      to={`/tags/${tag}` as any}
      key={tag}
      viewTransition={{ types: ["slide-left"] }}
    >
      <Badge className="rounded-sm bg-zinc-200 text-zinc-600">{tag}</Badge>
    </Link>
  );
}
