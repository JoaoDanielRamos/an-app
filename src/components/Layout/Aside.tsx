import useToggle from "@/hooks/useToggle";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function Aside() {
  const { isOpen, toggle } = useToggle();

  return (
    <aside className={cn(isOpen ? "w-64" : "w-16")}>
      <Button onClick={toggle}>
        <MenuIcon className="size-4" />
      </Button>
    </aside>
  );
}
