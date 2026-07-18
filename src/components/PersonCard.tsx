import type { Person } from "../content";

export default function PersonCard({ name, role, bio }: Person) {
  return (
    <div className="border border-black flex flex-col items-center justify-center gap-8 px-[46px] py-[43px] flex-1 min-w-0">
      <p className="font-charon text-[20px] leading-[24px] uppercase text-black w-full max-w-[380px]">
        {name} — {role}
      </p>
      <p className="font-space text-[16px] leading-normal text-[#393939] w-full max-w-[380px]">
        {bio}
      </p>
    </div>
  );
}
