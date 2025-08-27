

export default function LoadingSkeletonCard() {
  // สเกเลตันเป็นลิสต์การ์ด 4 แถว
  return (
    <div className="grid grid-cols-1 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-lg border bg-card p-4 animate-pulse">
          <div className="mb-2 h-4 w-48 rounded bg-muted" />
          <div className="mb-3 flex items-center gap-3">
            <div className="h-3 w-20 rounded bg-muted" />
            <div className="h-3 w-12 rounded bg-muted" />
            <div className="h-3 w-24 rounded bg-muted" />
          </div>
          <div className="h-24 w-full rounded bg-muted" />
          <div className="mt-3 flex flex-wrap gap-2">
            <div className="h-5 w-14 rounded bg-muted" />
            <div className="h-5 w-12 rounded bg-muted" />
            <div className="h-5 w-16 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
