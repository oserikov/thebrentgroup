import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PersonCard from "../components/PersonCard";
import { MISSION, PULL_QUOTE, PEOPLE, PUBLICATIONS } from "../content";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="bg-[#f7f7f7]">
        <Nav current="about" />

        <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-20">
          <div className="pt-8 lg:pt-[127px] pb-[54px] text-center">
            <h1 className="font-charon text-[40px] lg:text-[72px] leading-[1.1] lg:leading-[80px] uppercase bg-gradient-to-r from-[#195b36] to-[#152d70] bg-clip-text text-transparent">
              Unconventional AI ×
              <br />
              Bio Countermeasures
            </h1>
          </div>

          <p className="font-space font-light text-[20px] text-black text-center max-w-[619px] mx-auto pb-16 lg:pb-24">
            {MISSION}. Our two fundamental pillars are{" "}
            <a href="/thebrentgroup/technology.html" className="underline">
              LLM Repellents
            </a>
            , and Messages to the Future.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-20">
        <p className="font-space font-medium text-[20px] lg:text-[24px] text-black text-right max-w-[690px] lg:ml-auto mt-16 lg:mt-[110px] leading-[normal]">
          {PULL_QUOTE}
        </p>

        <section className="mt-16 lg:mt-[80px] flex flex-col gap-16">
          <h2 className="font-charon text-[36px] uppercase text-black">People</h2>
          <div className="flex flex-col lg:flex-row gap-7 items-stretch lg:items-start flex-wrap">
            {PEOPLE.map((person) => (
              <PersonCard key={person.name} {...person} />
            ))}
          </div>
        </section>

        <section className="mt-16 lg:mt-[124px] flex flex-col gap-16 pb-24 uppercase">
          <div className="flex flex-wrap gap-7 items-baseline text-[28px] lg:text-[36px] font-charon">
            <p className="text-black">publications</p>
            <p className="text-black">/</p>
            <p className="text-[#aeb6b0]">Document hub</p>
          </div>
          <ul className="list-disc pl-6 font-space font-light text-[16px] leading-[24px] text-black max-w-[800px] flex flex-col gap-0">
            {PUBLICATIONS.map((pub) => (
              <li key={pub.text}>
                {pub.text}{" "}
                {pub.url && (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {pub.url}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Footer />
    </div>
  );
}
