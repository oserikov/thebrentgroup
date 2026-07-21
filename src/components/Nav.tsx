import { SITE } from "../content.generated";

export type Page = "about" | "technology" | "messages-to-future" | "credibility" | "roadmap";

const TECHNOLOGY_LINKS: { page: Page; label: string; href: string }[] = [
  { page: "technology", label: "LLM Repellents", href: "/thebrentgroup/technology.html" },
  {
    page: "messages-to-future",
    label: "Messages to the Future",
    href: "/thebrentgroup/messages-to-the-future.html",
  },
  { page: "roadmap", label: "Roadmap", href: "/thebrentgroup/roadmap.html" },
];

function TechnologyLink({ link, current }: { link: (typeof TECHNOLOGY_LINKS)[number]; current?: Page }) {
  return link.page === current ? (
    <p className="whitespace-nowrap text-black/50">{link.label}</p>
  ) : (
    <a href={link.href} className="whitespace-nowrap cursor-pointer hover:opacity-60">
      {link.label}
    </a>
  );
}

export default function Nav({ current }: { current?: Page }) {
  const technologyActive = current === "technology" || current === "messages-to-future" || current === "roadmap";

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
        {current === "about" ? (
          <p>about</p>
        ) : (
          <a href="/thebrentgroup/" className="cursor-pointer">
            about
          </a>
        )}

        <div className="relative group">
          {technologyActive ? (
            <p className="cursor-default">TECHNOLOGY</p>
          ) : (
            <a href="/thebrentgroup/technology.html" className="cursor-pointer">
              TECHNOLOGY
            </a>
          )}
          {/* Mobile: centered under the word as one real (non-absolutely-
              positioned) flex row — the earlier per-item absolute-anchor
              version centered the visible *gap* more precisely, but its
              wrapper collapsed to zero height (all children absolute), which
              left a dead strip between "TECHNOLOGY" and the links where the
              mouse was over neither element, breaking the hover chain
              mid-move. A real flex row has no such gap, at the cost of
              centering the whole two-label block rather than the gap exactly
              (visible off-center by a few px since the two labels differ in
              width). Desktop: left-aligned stack under the word's start. */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 top-full pt-1 hidden group-hover:block z-10">
            <div className="flex flex-row gap-4 lg:flex-col lg:gap-2 lowercase [font-variant:small-caps] text-[14px] lg:text-[15px]">
              {TECHNOLOGY_LINKS.map((link) => (
                <TechnologyLink key={link.page} link={link} current={current} />
              ))}
            </div>
          </div>
        </div>

        {current === "credibility" ? (
          <p>Credibility</p>
        ) : (
          <a href="/thebrentgroup/credibility.html" className="cursor-pointer">
            Credibility
          </a>
        )}
      </div>
    </div>
  );
}
