export function buildIndustrialEngineMessage(params: {
  source?: string;
  scenario?: string;
  complexity?: string;
  approval?: string;
}): string | undefined {
  if (params.source !== 'industrial-engine') return undefined;

  const lines = [
    'I explored the Industrial Engine Preview on the projects page and would like to discuss a similar RFQ-to-quote workflow for our business.',
  ];

  if (params.scenario) {
    lines.push(`Demonstration scenario: ${params.scenario.replace(/-/g, ' ')}.`);
  }
  if (params.complexity) {
    lines.push(`Complexity level explored: ${params.complexity}.`);
  }
  if (params.approval) {
    lines.push(`Approval route shown: ${params.approval.replace(/-/g, ' ')}.`);
  }

  return lines.join('\n');
}
