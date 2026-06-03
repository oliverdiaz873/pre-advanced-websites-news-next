export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
      <div className="text-center">
        <div
          className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[var(--color-border-subtle)] border-t-[var(--color-accent-primary)]"
          role="status"
        />
      </div>
    </div>
  );
}
