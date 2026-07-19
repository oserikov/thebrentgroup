import { SITE } from "../content.generated";

export type Page = "about" | "technology" | "research";

const LINKS: { page: Page; label: string; href: string }[] = [
  { page: "about", label: "about", href: "/thebrentgroup/" },
  { page: "technology", label: "TECHNOLOGY", href: "/thebrentgroup/technology.html" },
  { page: "research", label: "Research", href: "/thebrentgroup/research.html" },
];

export default function Nav({ current }: { current: Page }) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-center lg:items-center justify-between w-full max-w-[1440px] mx-auto px-6 lg:px-20 pt-8 lg:pt-[53px] text-[16px] lg:text-[20px] font-space uppercase text-black">
      {current === "about" ? (
        <p>{SITE.name}</p>
      ) : (
        <a href="/thebrentgroup/" className="cursor-pointer">
          {SITE.name}
        </a>
      )}
      <div className="flex gap-6 lg:gap-16 items-center">
        {LINKS.map((link) =>
          link.page === current ? (
            <p key={link.page}>{link.label}</p>
          ) : (
            <a key={link.page} href={link.href} className="cursor-pointer">
              {link.label}
            </a>
          ),
        )}
      </div>
    </div>
  );
}
