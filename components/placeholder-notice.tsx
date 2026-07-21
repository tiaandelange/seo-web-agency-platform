/**
 * Visible placeholder labelling — rule 13: unconfirmed content must be
 * clearly marked. Rendered wherever data carries placeholder: true.
 */
export function PlaceholderNotice({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="note"
      className="mx-auto my-4 max-w-6xl rounded-card border px-4 py-3 text-sm"
      style={{
        backgroundColor: 'var(--color-notice)',
        borderColor: 'var(--color-notice-border)',
      }}
    >
      <strong>Placeholder:</strong> {children}
    </div>
  );
}
