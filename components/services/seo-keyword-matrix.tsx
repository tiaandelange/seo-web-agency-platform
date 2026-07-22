import { SEO_MATRIX_ROWS } from '@/data/seo-service-proof';

const DEMO = 'Illustrative workflow demo — sample architecture';

export function SeoKeywordMatrix() {
  return (
    <div className="overflow-hidden rounded-card border border-line bg-canvas shadow-elevated">
      <div className="border-b border-line bg-surface px-3 py-2">
        <p className="text-label text-cta">Search architecture matrix</p>
        <p className="mt-1 text-xs text-muted">{DEMO}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-line bg-ink text-accent-contrast">
              <th scope="col" className="px-3 py-2 font-mono font-medium">
                Intent
              </th>
              <th scope="col" className="px-3 py-2 font-mono font-medium">
                Keyword group
              </th>
              <th scope="col" className="px-3 py-2 font-mono font-medium">
                Target page
              </th>
              <th scope="col" className="px-3 py-2 font-mono font-medium">
                Funnel
              </th>
              <th scope="col" className="px-3 py-2 font-mono font-medium">
                Status
              </th>
              <th scope="col" className="px-3 py-2 font-mono font-medium">
                Objective
              </th>
            </tr>
          </thead>
          <tbody>
            {SEO_MATRIX_ROWS.map((row) => (
              <tr key={row.keywordGroup} className="border-b border-line odd:bg-surface">
                <td className="px-3 py-2.5 text-ink">{row.intent}</td>
                <td className="px-3 py-2.5 font-mono text-muted">{row.keywordGroup}</td>
                <td className="px-3 py-2.5 font-mono text-link">{row.targetPage}</td>
                <td className="px-3 py-2.5 text-muted">{row.funnel}</td>
                <td className="px-3 py-2.5 text-muted">{row.technicalStatus}</td>
                <td className="px-3 py-2.5 text-ink">{row.conversionObjective}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-line px-3 py-2 font-mono text-[0.65rem] text-muted">
        No live ranks or traffic figures — structure only.
      </p>
    </div>
  );
}
