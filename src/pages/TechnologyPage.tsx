import Nav from "../components/Nav";
import Footer from "../components/Footer";
import TodoPlaceholder from "../components/TodoPlaceholder";

export default function TechnologyPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="bg-[#f7f7f7]">
        <Nav current="technology" />
        <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-20 pt-8 lg:pt-[193px] pb-16 lg:pb-24 text-center">
          <h1 className="font-charon text-[36px] lg:text-[72px] leading-[1.1] lg:leading-[80px] uppercase bg-gradient-to-r from-[#195b36] to-[#152d70] bg-clip-text text-transparent">
            Technology:
            <br />
            LLM Repellents
          </h1>
        </div>
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-20">
        <section className="max-w-[700px] mx-auto flex flex-col gap-6 pb-24 pt-16">
          <h2 className="font-space font-bold text-[24px] text-black">
            What are LLM Repellents?
          </h2>
          <p className="font-space text-[16px] leading-[24px] text-black">
            "LLM repellents" is the category name for a larger class of
            technical countermeasures developed to enable developers of
            biological software tools to modify those tools to diminish the
            chance that the tools will be operated by autonomous AI agents.
            These countermeasures are strings of text and code that can be
            added to the code, READMEs, and outputs of specialized biological
            software tools. They exploit safety features and other behaviors
            already trained and engineered into LLMs and LLM agentic
            scaffolds. When LLMs in agentic harness attempt to operate
            software modified with such strings, the countermeasures (a)
            trigger the LLMs' content filters, or (b) induce the LLMs to
            reason that they should not complete their assigned task, or (c)
            influence the agentic harness to disengage. The countermeasures
            run a gamut, from those designed to trigger prohibitions against
            aiding construction of biological and nuclear weapons, to moral
            appeals, to triggers of other taboos, to meaningless strings of
            text selected by gradient descent. None are effective all of the
            time. Work to make better repellents continues. This work is
            described in Barkan et al., currently in review/in press at RAND.
          </p>

          <div className="mt-12">
            <TodoPlaceholder lines={["content from LLM Repellents goes here?"]} />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
