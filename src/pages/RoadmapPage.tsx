import Nav from "../components/Nav";
import Footer from "../components/Footer";
import RoadmapDiagram from "../components/RoadmapDiagram";
import { ROADMAP } from "../content.generated";

export default function RoadmapPage() {
  const [line1] = ROADMAP.heroTitle;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="bg-[#f7f7f7]">
        <Nav />
        <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-20 pt-8 lg:pt-[193px] pb-8 lg:pb-0 text-center">
          <h1 className="font-charon text-[36px] lg:text-[72px] leading-[1.1] lg:leading-[80px] uppercase bg-gradient-to-r from-[#195b36] to-[#152d70] bg-clip-text text-transparent">
            {line1}
          </h1>
        </div>
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-20">
        <section className="max-w-[700px] mx-auto flex flex-col gap-6 pt-16">
          <h2 className="font-space font-medium text-[24px] text-black">
            {ROADMAP.subheading}
          </h2>
          <div
            className="md-content font-space font-light text-[16px] leading-[20px] text-black"
            dangerouslySetInnerHTML={{ __html: ROADMAP.bodyHtml }}
          />
        </section>

        <section className="max-w-[1280px] mx-auto pb-24 pt-16">
          <RoadmapDiagram />
        </section>
      </div>

      <Footer />
    </div>
  );
}
