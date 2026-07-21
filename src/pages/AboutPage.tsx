import { useRef, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PersonCard from "../components/PersonCard";
import FundingStamp from "../components/FundingStamp";
import { ABOUT, PEOPLE } from "../content.generated";

export default function AboutPage() {
  const [line1, line2] = ABOUT.heroTitle;
  const [activeTab, setActiveTab] = useState<"publications" | "document-hub">("publications");
  const missionRef = useRef<HTMLDivElement>(null);
  const pullQuoteRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="bg-[#f7f7f7] relative">
        <Nav current="about" />

        <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-20">
          <div className="pt-8 lg:pt-[127px] pb-[54px] text-center">
            <h1 className="font-charon text-[40px] lg:text-[72px] leading-[1.1] lg:leading-[80px] uppercase bg-gradient-to-r from-[#195b36] to-[#152d70] bg-clip-text text-transparent">
              {line1}
              <br />
              {line2}
            </h1>
          </div>

          <div
            ref={missionRef}
            className="md-content font-space font-light text-[20px] text-black text-center max-w-[619px] mx-auto pb-16 lg:pb-24"
            dangerouslySetInnerHTML={{ __html: ABOUT.missionHtml }}
          />
        </div>

        {/* Overlaid on the seam between the mission text above and the pull-
            quote below, not reserving flow space of its own — position:
            absolute anchored to this section's own bottom edge. Given both
            neighboring refs so it can measure real overlap and shrink itself
            rather than guessing a size that happens to fit. */}
        <FundingStamp aboveRef={missionRef} belowRef={pullQuoteRef} />
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-20">
        <p
          ref={pullQuoteRef}
          className="font-space font-medium text-[20px] lg:text-[24px] text-black text-right max-w-[690px] lg:ml-auto mt-16 lg:mt-[110px] leading-[normal]"
        >
          {ABOUT.pullQuote.trim()
            .split("\n")
            .map((line, i, lines) => (
              <span key={i}>
                {line}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
        </p>

        <section className="mt-16 lg:mt-[80px] flex flex-col gap-16">
          <h2 className="font-charon text-[36px] uppercase text-black">
            {ABOUT.peopleHeading}
          </h2>
          <div className="flex flex-col lg:flex-row gap-7 items-stretch lg:items-start flex-wrap">
            {PEOPLE.map((person) => (
              <PersonCard key={person.name} {...person} />
            ))}
          </div>
        </section>

        <section className="mt-16 lg:mt-[124px] flex flex-col gap-16 pb-24 uppercase">
          <div className="flex flex-wrap gap-7 items-baseline text-[28px] lg:text-[36px] font-charon">
            <button
              type="button"
              onClick={() => setActiveTab("publications")}
              className={`cursor-pointer uppercase ${activeTab === "publications" ? "text-black" : "text-[#aeb6b0]"}`}
            >
              {ABOUT.publicationsHeading}
            </button>
            <p className="text-black">/</p>
            <button
              type="button"
              onClick={() => setActiveTab("document-hub")}
              className={`cursor-pointer uppercase ${activeTab === "document-hub" ? "text-black" : "text-[#aeb6b0]"}`}
            >
              {ABOUT.documentHubLabel}
            </button>
          </div>
          {/* Both panels stay mounted, stacked in the same grid cell, so the
              section's height is always the max of the two — switching tabs
              swaps which one is visible without the shorter panel ever
              shrinking the container (and the footer below it) down. */}
          <div className="grid">
            <div
              className={`md-content font-space font-light text-[16px] leading-[24px] text-black max-w-[800px] col-start-1 row-start-1 ${
                activeTab === "publications" ? "" : "invisible"
              }`}
              dangerouslySetInnerHTML={{ __html: ABOUT.publicationsHtml }}
            />
            <div
              className={`md-content font-space font-light text-[16px] leading-[24px] text-black max-w-[800px] col-start-1 row-start-1 ${
                activeTab === "document-hub" ? "" : "invisible"
              }`}
              dangerouslySetInnerHTML={{ __html: ABOUT.documentHubHtml }}
            />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
