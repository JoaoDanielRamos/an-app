interface RichTextViewerProps {
  content: string;
  className?: string;
}

export default function RichTextViewer({
  content,
  className = "",
}: RichTextViewerProps) {
  return (
    <div
      className={`prose prose-sm max-w-none text-gray-700 ${className}`}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Rich text content needs to be rendered as HTML
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
