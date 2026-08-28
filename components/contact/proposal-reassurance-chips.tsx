import { PROPOSAL_REASSURANCE_CHIPS } from '@/data/proposal-page-copy';

export function ProposalReassuranceChips() {
  return (
    <ul className="proposal-reassurance-chips" aria-label="Proposal reassurance">
      {PROPOSAL_REASSURANCE_CHIPS.map((label) => (
        <li key={label}>
          <span className="proposal-reassurance-chip">{label}</span>
        </li>
      ))}
    </ul>
  );
}
