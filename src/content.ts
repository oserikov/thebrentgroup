export const MISSION = `We develop technical countermeasures that make dangerous biological software harder for AI agents to misuse, and machine-legible warning notices embedded in preprints that enter the pre-training corpora of near-future AI models. Work is coordinated with leadership at arXiv and bioRxiv and with developers of biological design tools`;

export const PULL_QUOTE = `Led by biosecurity advisor Roger Brent – 25+ years working with U.S. defense agencies – our team combines deep biological expertise with frontier AI safety research to build technical countermeasures against AI-enabled biological risk`;

export interface Person {
  name: string;
  role: string;
  bio: string;
}

export const PEOPLE: Person[] = [
  {
    name: "Roger Brent",
    role: "Principal Investigator",
    bio: "Dr. Brent has led independent research groups since 1985 — at Harvard/MGH, the Molecular Sciences Institute in Berkeley (1997–2009), and the Fred Hutchinson Cancer Center (2009–2024). He is best known for 1980s work establishing the modular nature of transcription regulators. For over 25 years he has advised US government bodies on defense against biological attack and emerging infectious disease. In June 2024 he closed his biological laboratory to commit fully to AI × bio safety.",
  },
  {
    name: "Oleg Serikov",
    role: "Researcher",
    bio: "PhD on interpretability of where and when linguistic competences emerge in LLMs. Oleg's interpretability framework was adopted by the BLOOM LLM megaproject; his research is published in Nature Scientific Data and at leading NLP interpretability venues. At Palisade Research, Oleg led the AI safety team whose work reached millions of viewers. He also kicked off KAUST's sovereign LLM programme — training the team, running the first experiments, and planning the five-year roadmap that secured the project's long-term funding. Previously, Oleg executed grant-funded AI interpretability research at AIRI and MIPT.",
  },
  {
    name: "Dmitrii Volkov",
    role: "Advisor",
    bio: "Dmitrii advises on security engineering, honeypot continuity, and Palisade infrastructure interfaces. His prior work includes the LLM Agent Honeypot (Volkov et al., 2024), which has captured and analyzed over 1.7 million interactions across 10 countries, and Biollama (Volkov et al., 2025), testing whether LLMs can be fine-tuned into biology lab assistants.",
  },
];

export interface Publication {
  text: string;
  url?: string;
}

export const PUBLICATIONS: Publication[] = [
  {
    text: "Brent, McKelvey & Matheny (2024). The New Bioweapons: How Synthetic Biology Could Destabilize the World. Foreign Affairs.",
    url: "https://www.foreignaffairs.com/world/new-bioweapons-covid-biology",
  },
  {
    text: "Williams et al. (2026). Developing a risk-scoring tool for artificial intelligence–enabled biological design. RAND RR-A4490-1.",
    url: "https://www.rand.org/pubs/research_reports/RRA4490-1.html",
  },
  {
    text: "Brent & McKelvey (2025). Contemporary AI foundation models increase biological weapons risk. arXiv:2506.13798.",
  },
  {
    text: "Brent (2005). In the valley of the shadow of death. MIT DSpace.",
    url: "https://dspace.mit.edu/handle/1721.1/34914",
  },
  {
    text: "Palisade Research (2024). End-to-end autonomous AI hacking.",
    url: "https://palisaderesearch.org/blog/end-to-end-hacking",
  },
  {
    text: "Volkov et al. (2024). LLM Agent Honeypot. arXiv:2410.13919.",
    url: "https://palisaderesearch.org/blog/llm-honeypot",
  },
  {
    text: "Volkov et al. (2025). Biollama.",
    url: "https://palisaderesearch.org/blog/biollama",
  },
  {
    text: "Williams et al. — explainer (LinkedIn).",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7428597484945321984/",
  },
  {
    text: "Williams et al. — future work (LinkedIn).",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7443501693507661824/",
  },
];

export const CONTACT_NAME = "Oleg Serikov";
export const CONTACT_EMAIL = "srkvoa@gmail.com";
