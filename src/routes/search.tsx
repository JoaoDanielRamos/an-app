import Note from "@/components/Note";
import { Input } from "@/components/ui/input";
import { getAllNotes } from "@/data/demo.notes";
import type { Note as NoteType } from "@/types/note";
import { createFileRoute } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/search")({
  component: Search,
  loader: async () => await getAllNotes(),
});

function Search() {
  const [searchInputValue, setSearchInput] = useState("");
  const notes = Route.useLoaderData();

  const filteredNotes = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(searchInputValue.toLowerCase()) ||
      note.content.toLowerCase().includes(searchInputValue.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchInputValue.toLowerCase()),
      )
    );
  });

  return (
    <div>
      <div className="p-4">
        <SearchBar search={searchInputValue} setSearch={setSearchInput} />
      </div>

      {searchInputValue.trim() === "" ? null : (
        <SearchResults search={searchInputValue} notes={filteredNotes} />
      )}
    </div>
  );
}

function SearchBar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (search: string) => void;
}) {
  return (
    <div className="relative">
      <SearchIcon className="-translate-y-1/2 absolute top-1/2 left-2 size-4 text-muted-foreground" />
      <Input
        className="pl-8 text-muted-foreground focus-visible:ring-0"
        placeholder="Search by title, content, or tags..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

function SearchResults({
  notes,
  search,
}: {
  notes: NoteType[];
  search: string;
}) {
  const notFound = search.trim() !== "" && notes.length === 0;
  return (
    <div className="">
      <p className="px-4 text-muted-foreground text-sm">
        All notes matching <span className="font-bold">"{search}"</span> are
        displayed below:
      </p>

      <div className="divide-y">
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>

      {notFound && (
        <p className="px-4 text-muted-foreground text-sm">No results found.</p>
      )}
    </div>
  );
}
