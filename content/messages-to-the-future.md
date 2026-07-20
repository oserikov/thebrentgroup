---
hero_title:
  - "Technology:"
  - "Messages to the Future"
subheading: "Messages to the Future (Noöspheric AI influencers)"
---

## Background

Current LLMs are trained on the entirety of the contemporary publicly available scientific literature.  From my own observations, since 2023, frontier LLMs have been trained on the entirety of PubMed Central, and since at least 2024, the most recent model releases are fully acquainted in memory with preprints in arXiv, bioRxiv, and medRxiv posted 6-18 earlier.

For developers of biological software today, a common path to publication is a message on X/Twitter the day that the manuscript describing the software is posted on arXiv or bioRxiv.  The preprints become part of the models' pre-training corpora.  Further discourse on X/Twitter and elsewhere follows initial posting, and of course more discourse and possible commentary occurs when work is formally published.  Preprint contents are accessible and accessed by models within weeks after posting, when a model accesses a specific paper (re-reads it) at inference time.

Inspection of chains of thought frequently reveal cases where a model's decision to not engage with a piece of biological software rests on its determination that the software could be used for biological weapons.

The upshot is that if preprints describing biological software, findings, or methods noted that the authors thought their contents might potentially be used for evil purposes, near-future models will be aware of the authors' expressed concerns.

These observations suggested a possible low-effort path to influence models' decisionmaking, by making it easy for authors to append warning messages to preprints of their scientific papers.  Preprints traffic depends on three chokepoints. In biology, essentially all problematic dual use papers pass through arXiv, bioRxiv, or medRxiv.  Posted preprints become part of the training corpora of near-future models.  Even before preprints enter training corpora, models refer to the preprints at inference time.

By placing warning notices in preprints, we thought that the efficacy of technical LLM countermeasures ("LLM repellents") such might be increased.  An example of such a notice is shown in the box.  Because we know from observation of chains of though that models use published papers in their assessments about the dangers of particular software, it also seemed possible that near future LLMs that have received warnings via preprints might decide not to engage with software based on their understanding of the preprint itself. For biology, dangerous or dual use content contained in preprints consists of more than software; it also includes descriptions of methods and new knowledge.

This idea of embedding warnings and notices in high value / "high integrity" data streams destined for pre-training corpora, to influence future models, has some precedent.  In particular, in our current not-optimistic time, the idea that future AI models might learn alignment and misalignment from papers in training data describing alignment research has now become something of a trope ([Tice et al., 2026](https://arxiv.org/abs/2601.10160); [Westover, 2025](https://blog.redwoodresearch.org/p/should-ai-developers-remove-discussion)). And there has been at least one deliberate direct (and to PI's mind pathetic) attempt to communicate with future AI via LessWrong ([Miller et al., 2023](https://www.lesswrong.com/posts/azRwPDbZfpadoL7WW/an-appeal-to-ai-superintelligence-reasons-to-preserve)) in which the authors list all the reasons and arguments they can think of to convince future superpowerful AI that it should spare humankind.

## Proposed work

The PI has approached Richard Sever, moderator of bioRxiv, and Steinn Sigurdsson, moderator of arXiv, to suggest allowing authors who submit preprints describing work (software, knowledge, methods) that they consider dual use to check a box saying so, and by so doing causes a formulaic notice to be associated with the preprint.  Both people are positive, and Sever has generated a letter saying he will assist with a pilot experiment.

Our group will be looking to see whether near-future models have encountered the warnings in their pre-training data.  We will do this in two ways.  One is to compute "perplexity" of the model for every token in tagged and untagged preprints and quantifying the drop for models that have been trained on preprints that contain our formulaic warning.  We can do thus for Open Weight models, of course, and for Google Deepmind and OpenAI (but not Anthropic) where we know the log probabilities ("logprobs") that the model assigned at each position to the tokens that actually came next.

Commencing in December 2026, we will also begin assessing whether frontier and behind-frontier open weight models have been pre-trained on the by asking them to describe the papers from memory alone.  In general contemporary models retain considerable information from important papers but interpolate/ hallucinate details such as exact spelling of author's names.  We will check models' memories against the actual preprints.

We will then allow the models to access the actual preprints.

We will ask whether the associated warnings influence models' decisionmaking and steer them toward more cautious conduct at inference time.

During the project period, we will undertake further work on how to make the notices maximally legible and credible to machine intelligences.

## Proposed liaison with the biological software and AI safety ecology.

During the project period, we are optimistic that frontier and behind-frontier AI labs might agree to recognize and respect specific signals in software tools that ask their models not to operate the software.  Due to personal contacts and the future location of one of us (Volkov), the week-to-week progress of our work will be legible to Open AI and Anthropic.

Our work has common cause with other civil society concerns about the deployment of AI agents.  In particular, Meredith [Whittaker (2025)](https://www.economist.com/by-invitation/2025/09/09/ai-agents-are-coming-for-your-privacy-warns-meredith-whittaker) does not want AI agents reading decrypted Signal messages on people's phones, and has urged development of a documented mechanism that would let application developers designate their apps as off-limits to AI agents. Dean [Ball (2026)](https://www.hyperdimensional.co/p/on-ai-and-children) has suggested that society might make AI agents off limits to children. At the start of the project period, we will reach out to Whittaker and Ball making them aware of the complementary efforts and soliciting their public support.

During the project period, we are also optimistic that developers of biological software might consider releasing their software under open source "No-AI-Agent" licenses.  The most commonly used licenses for biological software are BSD-3-Clause and the MIT license, and our No-AI-Agent versions of these licenses (tested as part of our tests of countermeasures) simply add a clause that prohibits the software's operation by AI agents.  We imagine having these licenses for real as part of the code in repositories would have stronger deterrent effects, as well as giving software developers greater freedom to implement in their software the "License Plate Readers" and the "Token Burning Traps" we will be developing.

The PI knows from long ago Richard Stallman, and Eben Moglen at Columbia, the legal scholar who worked with Stallman to use copyright ("copyleft") to enabled the GPL (the General Public License) and make open source software possible.  At the start of the project period, we will reach out to Moglen and Stallman and seek their public support for licenses that would allow developers of dangerous software to restrict its use by AI agents.
