import { CONTACT_EMAIL } from "../content";

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
        <p className="font-space font-normal">oleg Serikov</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          target="_blank"
          rel="noreferrer"
          className="font-space font-normal underline"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </footer>
  );
}
