export function Chevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

/** Splits text into masked lines for the rising-type animation. */
export function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((l, i) => (
        <span className="line" key={i}>
          <span>{l}</span>
        </span>
      ))}
    </>
  );
}
