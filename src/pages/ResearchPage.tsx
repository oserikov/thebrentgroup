import Nav from "../components/Nav";
import Footer from "../components/Footer";
import TodoPlaceholder from "../components/TodoPlaceholder";

export default function ResearchPage() {
  return (
    <div className="bg-[#f7f7f7] min-h-screen flex flex-col">
      <Nav current="research" />

      <div className="max-w-[1440px] w-full mx-auto px-20">
        <div className="pt-24 lg:pt-[272px] pb-16 lg:pb-[128px] text-center px-6">
          <h1 className="font-charon text-[28px] lg:text-[72px] leading-[1.1] lg:leading-[80px] uppercase bg-gradient-to-r from-[#195b36] to-[#152d70] bg-clip-text text-transparent lg:whitespace-nowrap">
            Research:
            <br />
            Expertise and relevant prior work
          </h1>
        </div>

        <section className="max-w-[700px] mx-auto flex flex-col gap-6 pb-24 px-6 lg:px-0">
          <h2 className="font-space font-bold text-[24px] text-black">
            Volkov, Serikov, and coworkers — expertise and relevant prior work
          </h2>
          <p className="font-space text-[16px] leading-[24px] text-black">
            Palisade-era AI-safety work that underwrites the monitoring
            component of the present proposal. Volkov, Serikov, and
            colleagues continue to carry out relevant work on AI-enabled
            harm. In an earlier demonstration, Volkov and team showed that
            current AI systems can autonomously execute harmful end-to-end
            offensive actions (Bondarenko et al. 2025). In 2024–2025, Volkov
            and colleagues (
            <a
              href="https://palisaderesearch.org/blog/biollama"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Volkov et al. (2025)
            </a>{" "}
            and Dev, 2025) contributed to a study that made safety-degraded
            open-weight LLMs and fine-tuned those into being biology lab
            assistants. Brent and coworkers contributed training materials
            for that project, and became acquainted with Volkov during the
            course of that work. In continuing work, Reworr and Volkov
            (2024a and 2024b) have deployed honeypot infrastructure that has
            to date captured and analyzed over 1.7 million interactions with
            weakly defended Linux systems in 10 countries. The system
            distinguishes AI-agent traffic from conventional bot traffic.
            This is a working surveillance system for which we maintain
            codebase and operational experience.
          </p>

          <div className="mt-12">
            <TodoPlaceholder
              lines={[
                "content from relevant prior work goes here?",
                "Brent's archives?",
              ]}
            />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
