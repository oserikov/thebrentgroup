export default function TodoPlaceholder({ lines }: { lines: string[] }) {
  return (
    <div className="border border-dashed border-[#aeb6b0] rounded px-8 py-6 text-center font-space text-[16px] text-[#aeb6b0]">
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
}
