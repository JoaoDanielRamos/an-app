import { Link } from "@tanstack/react-router";
import {
  ArchiveIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SettingsIcon,
  TagsIcon,
} from "lucide-react";

const items = [
  {
    label: "Home",
    icon: <LayoutDashboardIcon className="size-5" />,
    href: "/",
  },
  {
    label: "Search",
    icon: <SearchIcon className="size-5" />,
    href: "/search",
  },
  {
    label: "Archived",
    icon: <ArchiveIcon className="size-5" />,
    href: "/archived",
  },
  {
    label: "Tags",
    icon: <TagsIcon className="size-5" />,
    href: "/tags",
  },
  {
    label: "Settings",
    icon: <SettingsIcon className="size-5" />,
    href: "/settings",
  },
];

export default function MobileNavigation() {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-100 flex justify-around border-gray-200 border-t bg-white/90 px-4 py-3">
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href as string}
          className="flex flex-col items-center gap-2 rounded-sm px-6 py-2"
          activeProps={{ className: "bg-blue-100/90" }}
          inactiveProps={{ className: "bg-transparent" }}
          viewTransition={{ types: ["slide-left"] }}
        >
          {item.icon}
          <span className="hidden md:text-sm">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
