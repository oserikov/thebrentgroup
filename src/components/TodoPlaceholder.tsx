export default function TodoPlaceholder({ html }: { html: string }) {
  return (
    <div
      className="md-content border border-dashed border-[#aeb6b0] rounded px-8 py-6 text-center font-space text-[16px] text-[#aeb6b0]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
