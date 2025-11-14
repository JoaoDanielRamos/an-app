import notes from "@/mockData/notes.json";
import { createServerFn } from "@tanstack/react-start";

export const getNotes = createServerFn({
	method: "GET",
}).handler(async () => notes);
