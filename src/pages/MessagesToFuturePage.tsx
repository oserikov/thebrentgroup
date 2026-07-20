import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { MESSAGES_TO_FUTURE } from "../content.generated";

export default function MessagesToFuturePage() {
  const [line1, line2] = MESSAGES_TO_FUTURE.heroTitle;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="bg-[#f7f7f7]">
        <Nav current="messages-to-future" />
        <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-20 pt-8 lg:pt-[193px] pb-8 lg:pb-0 text-center">
          <h1 className="font-charon text-[36px] lg:text-[72px] leading-[1.1] lg:leading-[80px] uppercase bg-gradient-to-r from-[#195b36] to-[#152d70] bg-clip-text text-transparent">
            {line1}
            <br />
            {line2}
          </h1>
        </div>
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-20">
        <section className="max-w-[700px] mx-auto flex flex-col gap-6 pb-24 pt-16">
          <h2 className="font-space font-medium text-[24px] text-black">
            {MESSAGES_TO_FUTURE.subheading}
          </h2>
          <div
            className="md-content font-space font-light text-[16px] leading-[20px] text-black"
            dangerouslySetInnerHTML={{ __html: MESSAGES_TO_FUTURE.bodyHtml }}
          />
        </section>
      </div>

      <Footer />
    </div>
  );
}
