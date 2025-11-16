import { Tag } from "@/components/Note";
import { getAllTags } from "@/data/demo.notes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tags/")({
  component: RouteComponent,
  loader: async () => await getAllTags(),
});

function RouteComponent() {
  const tags = Route.useLoaderData();

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  );
}
