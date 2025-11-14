import type { Note as NoteType } from "@/types/Note";

export default function Note({ note }: { note: NoteType }) {
	return (
		<div className="p-4">
			<h2 className="font-bold">{note.title}</h2>
			<p className="text-gray-500 text-sm">{note.content}</p>
			<p className="text-gray-500 text-sm">{note.createdAt}</p>
			<p className="text-gray-500 text-sm">{note.updatedAt}</p>
		</div>
	);
}
