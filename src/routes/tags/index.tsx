import { Badge } from "@/components/ui/badge";
import { getAllTags } from "@/data/demo.notes";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/tags/")({
  component: RouteComponent,
  loader: async () => await getAllTags(),
});

function RouteComponent() {
  const tags = Route.useLoaderData();

  return (
    <div>
      <div className="flex flex-wrap gap-2 p-4">
        {tags.map((tag) => (
          <Link
            to={`/tags/${tag}` as any}
            key={tag}
            viewTransition={{ types: ["slide-left"] }}
          >
            <Badge
              key={tag}
              className="font rounded-sm bg-zinc-200 font-medium text-zinc-600"
            >
              {tag}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
