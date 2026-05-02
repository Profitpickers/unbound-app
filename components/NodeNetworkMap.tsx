type NodeNetworkMapProps = {
  nodeId: string;
  solidarityFund: string;
  fundUnit: string;
  affiliates: string[];
  title: string;
  originNodeLabel: string;
  affiliatedNodesLabel: string;
  solidarityFundLabel: string;
  passportStatusLabel: string;
  passportReadyLabel: string;
  emptySlotLabel: string;
};

const SLOT_COORDINATES = [
  { x: 50, y: 14 },
  { x: 82, y: 34 },
  { x: 74, y: 74 },
  { x: 26, y: 74 },
  { x: 18, y: 34 },
];

export default function NodeNetworkMap({
  nodeId,
  solidarityFund,
  fundUnit,
  affiliates,
  title,
  originNodeLabel,
  affiliatedNodesLabel,
  solidarityFundLabel,
  passportStatusLabel,
  passportReadyLabel,
  emptySlotLabel,
}: NodeNetworkMapProps) {
  const paddedAffiliates = [...affiliates.slice(0, 5)];
  while (paddedAffiliates.length < 5) {
    paddedAffiliates.push("");
  }

  return (
    <section
      className="rounded-[28px] border p-6 sm:p-8 lg:col-span-2"
      style={{
        background: "rgba(255,255,255,0.04)",
        borderColor: "rgba(212, 175, 55, 0.35)",
        boxShadow: "0 28px 70px rgba(0,0,0,0.35)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
      aria-labelledby="node-network-title"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2
          id="node-network-title"
          className="text-xl font-semibold tracking-[0.04em]"
          style={{ color: "#FFF7DA" }}
        >
          {title}
        </h2>

        <div className="rounded-full border px-4 py-2 text-xs uppercase tracking-[0.22em]" style={{
          borderColor: "rgba(212, 175, 55, 0.5)",
          background: "rgba(212, 175, 55, 0.08)",
          color: "#E9C85A",
        }}>
          {passportStatusLabel}: {passportReadyLabel}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
        <section
          className="rounded-2xl border p-4 sm:p-6"
          style={{
            borderColor: "rgba(0,255,255,0.22)",
            background: "rgba(0,255,255,0.03)",
          }}
          aria-label={affiliatedNodesLabel}
        >
          <p className="text-xs uppercase tracking-[0.28em]" style={{ color: "#83FFFF" }}>
            {originNodeLabel}
          </p>

          <div className="relative mt-4 h-[360px] w-full">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              aria-hidden="true"
              preserveAspectRatio="none"
            >
              {SLOT_COORDINATES.map((point, index) => {
                const isActive = Boolean(paddedAffiliates[index]);

                return (
                  <line
                    key={`line-${index}`}
                    x1="50"
                    y1="50"
                    x2={point.x}
                    y2={point.y}
                    stroke={isActive ? "rgba(0,255,255,0.86)" : "rgba(0,255,255,0.24)"}
                    strokeWidth="0.4"
                    className={isActive ? "animate-pulse" : undefined}
                  />
                );
              })}
            </svg>

            <div
              className="absolute left-1/2 top-1/2 w-[134px] -translate-x-1/2 -translate-y-1/2 rounded-xl border px-3 py-3 text-center"
              style={{
                borderColor: "rgba(212, 175, 55, 0.65)",
                background: "rgba(212, 175, 55, 0.08)",
                boxShadow: "0 0 16px rgba(212,175,55,0.3)",
              }}
            >
              <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#F3DC95" }}>
                {originNodeLabel}
              </p>
              <p className="mt-1 text-sm font-semibold tracking-[0.08em]" style={{ color: "#FFFFFF" }}>
                {nodeId}
              </p>
            </div>

            {SLOT_COORDINATES.map((point, index) => {
              const affiliateId = paddedAffiliates[index];
              const isActive = Boolean(affiliateId);

              return (
                <div
                  key={`slot-${index}`}
                  className="absolute w-[130px] -translate-x-1/2 -translate-y-1/2 rounded-xl border px-3 py-2 text-center"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    borderColor: isActive ? "rgba(0,255,255,0.52)" : "rgba(0,255,255,0.2)",
                    background: isActive ? "rgba(0,255,255,0.08)" : "rgba(255,255,255,0.02)",
                    boxShadow: isActive ? "0 0 16px rgba(0,255,255,0.26)" : "none",
                  }}
                  aria-label={affiliateId || emptySlotLabel}
                >
                  <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.74)" }}>
                    #{index + 1}
                  </p>
                  <p className="mt-1 text-xs font-medium" style={{ color: isActive ? "#DBFEFF" : "rgba(255,255,255,0.45)" }}>
                    {affiliateId || emptySlotLabel}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div
            className="rounded-2xl border px-5 py-6"
            style={{
              borderColor: "rgba(212, 175, 55, 0.4)",
              background: "rgba(212, 175, 55, 0.06)",
            }}
            aria-label={solidarityFundLabel}
          >
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "#F0CF72" }}>
              {solidarityFundLabel}
            </p>
            <p
              className="mt-4 text-4xl font-semibold leading-none sm:text-5xl"
              style={{
                color: "#F9D970",
                textShadow: "0 0 20px rgba(212,175,55,0.32)",
              }}
            >
              {solidarityFund}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.28em]" style={{ color: "rgba(255,255,255,0.7)" }}>
              {fundUnit}
            </p>
          </div>

          <div
            className="rounded-2xl border px-5 py-5"
            style={{
              borderColor: "rgba(0,255,255,0.3)",
              background: "rgba(0,255,255,0.04)",
            }}
          >
            <p className="text-xs uppercase tracking-[0.28em]" style={{ color: "#88FFFF" }}>
              {affiliatedNodesLabel}
            </p>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.86)" }}>
              {paddedAffiliates.map((affiliateId, index) => (
                <li key={`legend-${index}`}>
                  {index + 1}. {affiliateId || emptySlotLabel}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
}
