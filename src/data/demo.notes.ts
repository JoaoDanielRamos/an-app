import notes from "@/data/notes.json";
import { createServerFn } from "@tanstack/react-start";

export const getAllNotes = createServerFn({
  method: "GET",
}).handler(async () => notes);

export const getActiveNotes = createServerFn({
  method: "GET",
}).handler(async () => notes.filter((note) => !note.archived));

export const getArchivedNotes = createServerFn({
  method: "GET",
}).handler(async () => notes.filter((note) => note.archived));

export const getAllTags = createServerFn({
  method: "GET",
}).handler(async () =>
  [...new Set(notes.flatMap((note) => note.tags))].sort((a, b) =>
    a.localeCompare(b),
  ),
);

export const getNoteById = createServerFn({ method: "GET" })
  .inputValidator((d: string) => d)
  .handler(async ({ data }) => {
    return notes.find((note) => note.id.toString() === data);
  });

export const getNotesByTag = createServerFn({ method: "GET" })
  .inputValidator((d: string) => d)
  .handler(async ({ data }) => {
    return notes.filter((note) => note.tags.includes(data));
  });
