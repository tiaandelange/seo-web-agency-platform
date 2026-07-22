export function BrokenToFixedMap() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <p className="text-label text-warning">Before / fragmented</p>
        <ol className="mt-4 space-y-3">
          {['Email', 'Spreadsheet', 'WhatsApp', 'Re-entry', 'PDF', 'Phone call'].map((step, i) => (
            <li
              key={step}
              className={`flex items-center gap-3 border border-dashed border-line bg-canvas px-3 py-2 font-mono text-sm text-muted ${
                i % 2 === 1 ? 'ml-4 sm:ml-8' : i % 3 === 2 ? 'ml-2 sm:ml-4' : ''
              }`}
            >
              <span className="text-warning" aria-hidden>
                ·
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
      <div>
        <p className="text-label text-link">After / structured</p>
        <ol className="relative mt-4 space-y-0 border-l-2 border-link pl-5">
          {[
            'Single intake',
            'Structured data',
            'Automated workflow',
            'Live status',
            'Reportable output',
          ].map((step, i, arr) => (
            <li key={step} className="relative pb-5 last:pb-0">
              <span
                className={`absolute -left-[1.4rem] top-1 h-2.5 w-2.5 rounded-full ${
                  i === arr.length - 1 ? 'bg-cta' : 'bg-link'
                }`}
                aria-hidden
              />
              <span className="font-mono text-sm text-ink">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
