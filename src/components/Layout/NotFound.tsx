import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4">
      <div className="space-y-3 text-center">
        <h1 className="font-bold text-6xl text-gray-800 dark:text-gray-100">
          404
        </h1>
        <h2 className="font-semibold text-2xl text-gray-700 dark:text-gray-200">
          Page Not Found
        </h2>
        <p className="max-w-md text-gray-600 dark:text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <Link
        to="/"
        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}
