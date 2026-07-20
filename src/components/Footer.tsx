import { SITE } from "../content.generated";

export default function Footer() {
  return (
    <footer
      className="w-full lg:h-[392px]"
      style={{
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(134,185,192,0.2) 77.404%, rgba(89,130,93,0.2))",
      }}
    >
      <div className="pt-16 lg:pt-[172px] pb-16 text-center font-charon uppercase text-[20px] text-black leading-[24px]">
        <p className="font-space font-bold">Contact</p>
        <p className="font-space font-normal">&#8203;</p>
        <p className="font-space font-normal">{SITE.contact_name}</p>
        <a
          href={`mailto:${SITE.contact_email}`}
          target="_blank"
          rel="noreferrer"
          className="font-space font-normal underline"
        >
          {SITE.contact_email}
        </a>
        <p className="font-space font-normal">&#8203;</p>
        <a
          href="https://thebrentgroup.github.io"
          target="_blank"
          rel="noreferrer"
          className="font-space text-[14px] leading-[18px] font-normal normal-case [font-variant-caps:all-small-caps] tracking-[0.06em] underline"
        >
          our old website
        </a>
      </div>
    </footer>
  );
}
