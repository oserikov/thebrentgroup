import { CONTACT_EMAIL } from "../content";

export default function Footer() {
  return (
    <footer
      className="w-full flex items-center justify-center py-24 mt-32"
      style={{
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(134,185,192,0.2) 77.404%, rgba(89,130,93,0.2))",
      }}
    >
      <div className="text-center font-space uppercase text-[20px] text-black leading-[24px]">
        <p className="font-bold">Contact</p>
        <p className="normal-case font-normal">oleg Serikov</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          target="_blank"
          rel="noreferrer"
          className="normal-case font-normal underline"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </footer>
  );
}
