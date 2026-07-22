export function EngineTelemetry({
  engineStatus,
  processingTime,
  approvalRoute,
  rfqCapacity,
}: {
  engineStatus: string;
  processingTime: string;
  approvalRoute: string;
  rfqCapacity: string;
}) {
  const items = [
    { label: 'Engine status', value: engineStatus },
    { label: 'Processing time', value: processingTime },
    { label: 'Approval route', value: approvalRoute.toUpperCase() },
    { label: 'Simulated capacity', value: rfqCapacity },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:col-span-12 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded border border-white/10 bg-[#0f2229] px-4 py-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">{item.label}</p>
          <p className="mt-1 font-mono text-sm font-medium text-white">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
