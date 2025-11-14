import Note from "@/components/Note";
import { getNotes } from "@/data/demo.notes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Home,
	loader: async () => await getNotes(),
});

function Home() {
	const notes = Route.useLoaderData();

	return (
		<div className="">
			{notes.map((note) => (
				<div key={note.id} className="not-last:border-b">
					<Note key={note.id} note={note} />
				</div>
			))}
		</div>
	);
}
