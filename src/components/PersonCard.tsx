import type { Person } from "../content.generated";

export default function PersonCard({ name, role, bioHtml }: Person) {
  return (
    <div className="group relative border border-black flex flex-col items-center justify-center gap-8 px-[46px] py-[43px] flex-1 min-w-0">
      <div className="person-card-ring pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
      <p className="font-charon text-[20px] leading-[24px] uppercase text-black w-full max-w-[380px]">
        {name} — {role}
      </p>
      <div
        className="md-content font-space text-[16px] leading-[normal] text-[#393939] w-full max-w-[380px]"
        dangerouslySetInnerHTML={{ __html: bioHtml }}
      />
    </div>
  );
}
