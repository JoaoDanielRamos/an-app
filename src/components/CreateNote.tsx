import RichTextEditor from "@/components/RichTextEditor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export default function () {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState("");

  return (
    <Drawer
      onAnimationEnd={(open) => {
        console.log(open);
      }}
    >
      <DrawerTrigger>
        <Button className="fixed right-6 bottom-20 size-12 rounded-full bg-blue-600">
          <PlusIcon className="size-6" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="z-200 min-h-[60vh]">
        <DrawerHeader></DrawerHeader>
        <div className="space-y-2 p-4">
          <Textarea
            className="block min-h-10 border-none p-0 font-bold text-2xl text-stone-900 transition-all duration-300 focus-visible:bg-stone-100 focus-visible:p-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Title"
          >
            {title}
          </Textarea>

          <div className="rounded-md p-0 transition-all duration-300 focus-within:border focus-within:bg-stone-100 focus-within:p-2 focus-visible:outline-none focus-visible:ring-offset-0">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags?.map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="tag-badges rounded-sm bg-zinc-200 font-semibold text-zinc-600"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <Input
              placeholder="tags"
              className="border-none p-0 text-sm ring-0 focus-visible:ring-0"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const target = e.currentTarget;
                  if (target.value === "") {
                    return;
                  }

                  setTags((prev) => [...prev, target.value.trim()]);
                  target.value = "";
                }
              }}
            />
          </div>

          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="Write your note..."
            className="-mx-4 border-none"
          />
        </div>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
