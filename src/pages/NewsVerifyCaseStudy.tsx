import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Check,
  FileText,
  Globe2,
  Image as ImageIcon,
  Layers3,
  ScanSearch,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { applyPageMeta } from "@/lib/pageMeta";
import analyzerScreen from "@/assets/projects/newsverify-1.jpg";
import pipelineScreen from "@/assets/projects/newsverify-2.jpg";

const SITE_URL = "https://ritiksharma.lovable.app";

const NewsVerifyCaseStudy = () => {
  useEffect(() => {
    const restoreMeta = applyPageMeta({
      title: "NewsVerify: Fake News Detection with ML & NLP | Case Study",
      description:
        "NewsVerify detects fake news with Python, Flask, NLTK, TF-IDF and a Passive Aggressive Classifier (96% accuracy on 30,000+ Kaggle articles), plus Gemini-grounded claim checks.",
      path: "/projects/newsverify",
      type: "article",
    });
    const structuredData = document.createElement("script");
    structuredData.type = "application/ld+json";
    structuredData.dataset.newsverifyCaseStudy = "true";
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: "NewsVerify: Fake News Detection using Machine Learning and NLP",
          description:
            "Case study of NewsVerify, a fake news detection app using an NLP pipeline (regex cleaning, NLTK tokenization, stopword removal, lemmatization, TF-IDF) and a Passive Aggressive Classifier with ~96% accuracy.",
          url: `${SITE_URL}/projects/newsverify`,
          image: [`${SITE_URL}${analyzerScreen}`, `${SITE_URL}${pipelineScreen}`],
          author: { "@type": "Person", name: "Ritik Sharma", url: SITE_URL },
          keywords: "fake news detection, machine learning, NLP, TF-IDF, Passive Aggressive Classifier, Flask, NLTK, scikit-learn, Kaggle fake news dataset",
          inLanguage: "en",
          mainEntity: { "@id": `${SITE_URL}/projects/newsverify#app` },
        },
        {
          "@type": "SoftwareApplication",
          "@id": `${SITE_URL}/projects/newsverify#app`,
          name: "NewsVerify",
          applicationCategory: "NewsApplication",
          operatingSystem: "Web, Android, iOS",
          url: "https://truth-verifier--Techtitans999.replit.app",
          description:
            "Real-time fake news detection that classifies news articles as REAL or FAKE from their content, built with Python, Flask, Pandas, NumPy, scikit-learn, NLTK, Seaborn and Matplotlib.",
          featureList: [
            "Text, URL and image input",
            "NLP pipeline: regex cleaning, lowercasing, tokenization, stopword removal, lemmatization, TF-IDF",
            "Passive Aggressive Classifier with ~96% accuracy (80/20 split)",
            "Trained on 30,000+ Kaggle fake news articles",
            "Mobile-responsive PWA",
          ],
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          author: { "@type": "Person", name: "Ritik Sharma", url: SITE_URL },
        },
      ],
    }).replace(/</g, "\\u003c");
    document.head.appendChild(structuredData);
    return () => {
      restoreMeta();
      structuredData.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="relative overflow-hidden border-b border-border pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="absolute inset-0 bg-gradient-hero" aria-hidden="true" />
          <div className="container relative mx-auto max-w-6xl px-6">
            <Link
              to="/#projects"
              className="mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Back to projects
            </Link>
            <div className="grid items-end gap-10 lg:grid-cols-[1.35fr_0.65fr]">
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-mono uppercase text-primary">
                  <span>Project case study</span>
                  <span className="text-border" aria-hidden="true">/</span>
                  <span>Team Tech Titans</span>
                  <span className="text-border" aria-hidden="true">/</span>
                  <span>2022—2026</span>
                </div>
                <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
                  NewsVerify<span className="text-primary">.</span>
                </h1>
                <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
                  A multimodal news-checking app pairing fast machine-learning classification with live, source-grounded AI analysis.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild>
                    <a href="https://truth-verifier--Techtitans999.replit.app" target="_blank" rel="noopener noreferrer">
                      Open NewsVerify <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <a href="#results" className="inline-flex min-h-10 items-center gap-2 px-3 text-sm font-medium text-muted-foreground hover:text-foreground">
                    Explore the results <ArrowDown className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-l border-border pl-6 sm:grid-cols-4 lg:grid-cols-2">
                <div><div className="text-3xl font-bold text-primary">96%</div><div className="mt-1 text-xs text-muted-foreground">ML test accuracy</div></div>
                <div><div className="text-3xl font-bold text-foreground">30K+</div><div className="mt-1 text-xs text-muted-foreground">labeled articles</div></div>
                <div><div className="text-3xl font-bold text-foreground">3</div><div className="mt-1 text-xs text-muted-foreground">input modes</div></div>
                <div><div className="text-3xl font-bold text-foreground">6,000</div><div className="mt-1 text-xs text-muted-foreground">held-out test articles</div></div>
              </div>
            </div>
            <div className="mt-16 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-5 text-sm text-muted-foreground">
              <span>B.Tech CSE capstone</span><span>BGSBU, Rajouri</span><span>My role: Team Lead & Backend</span>
            </div>
          </div>
        </section>

        <section id="problem" className="scroll-mt-24 border-b border-border py-16 md:py-24">
          <div className="container mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[0.7fr_1.3fr] md:gap-16">
            <div>
              <p className="mb-3 font-mono text-xs uppercase text-primary">01 / The problem</p>
              <h2 className="text-3xl font-bold md:text-4xl">Fast claims need more than a label.</h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>Misleading stories can move quickly, while checking them manually takes time. A single “real” or “fake” label also leaves readers without enough context to judge a claim.</p>
              <p>NewsVerify set out to make an initial assessment accessible on mobile, then explain the reasoning with individual claims and references. The project combines a pattern-based classifier with a separate generative-AI analysis path, rather than asking one model to do everything.</p>
              <div className="border-l-2 border-primary py-1 pl-5 text-foreground">The goal: help people pause, inspect evidence, and make a better-informed decision before sharing.</div>
            </div>
          </div>
        </section>

        <section id="approach" className="scroll-mt-24 border-b border-border py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 font-mono text-xs uppercase text-primary">02 / The approach</p>
              <h2 className="text-3xl font-bold md:text-4xl">One story, two complementary engines.</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">A shared analyzer accepts text, a web address, or a screenshot. The machine-learning result provides a quick signal; grounded claim checks add context and traceable sources.</p>
            </div>
            <div className="grid gap-0 border-y border-border md:grid-cols-3 md:divide-x md:divide-border">
              <div className="py-7 md:px-7 md:first:pl-0">
                <div className="mb-5 flex h-11 w-11 items-center justify-center border border-primary/30 text-primary"><FileText className="h-5 w-5" /></div>
                <p className="mb-2 font-mono text-xs text-primary">INPUT</p>
                <h3 className="text-xl font-semibold">Three ways to check</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Paste article text (at least 15 characters), submit a URL, or upload an image. Screenshot text is extracted for analysis.</p>
                <div className="mt-5 flex gap-4 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1"><FileText className="h-3.5 w-3.5" />Text</span><span className="inline-flex items-center gap-1"><Globe2 className="h-3.5 w-3.5" />URL</span><span className="inline-flex items-center gap-1"><ImageIcon className="h-3.5 w-3.5" />Image</span></div>
              </div>
              <div className="border-t border-border py-7 md:border-t-0 md:px-7">
                <div className="mb-5 flex h-11 w-11 items-center justify-center border border-project/30 text-project"><ScanSearch className="h-5 w-5" /></div>
                <p className="mb-2 font-mono text-xs text-project">ENGINE 01 · CLASSIFY</p>
                <h3 className="text-xl font-semibold">Text patterns, made measurable</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">The NLP flow cleans and normalizes text, tokenizes it, removes stopwords, lemmatizes words, and converts text to TF-IDF features. A Passive Aggressive Classifier predicts REAL or FAKE.</p>
                <p className="mt-4 text-xs text-muted-foreground">Regex cleaning → lowercase → NLTK → stopwords → lemmas → TF-IDF → PAC</p>
              </div>
              <div className="border-t border-border py-7 md:border-t-0 md:px-7 md:last:pr-0">
                <div className="mb-5 flex h-11 w-11 items-center justify-center border border-skill/30 text-skill"><Sparkles className="h-5 w-5" /></div>
                <p className="mb-2 font-mono text-xs text-skill">ENGINE 02 · INVESTIGATE</p>
                <h3 className="text-xl font-semibold">Claims checked against the live web</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Gemini 2.5 Flash extracts key claims and uses Google Search grounding to look for supporting or conflicting information, returning a 0–100 score, claim-level reasoning, and source citations.</p>
              </div>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">The classifier metrics below evaluate the ML model on its held-out dataset; they are not an accuracy claim for the separate live-grounding analysis.</p>
          </div>
        </section>

        <section id="architecture" className="scroll-mt-24 border-b border-border py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 font-mono text-xs uppercase text-primary">03 / Architecture</p>
              <h2 className="text-3xl font-bold md:text-4xl">A mobile client with a typed analysis API.</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">The project evolved from a static Flask NLP prototype into a cross-platform analyzer backed by a TypeScript service and a Python model pipeline.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
              <div className="border border-border p-5">
                <Smartphone className="mb-4 h-5 w-5 text-primary" />
                <h3 className="font-semibold">Expo mobile app</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Expo SDK 52, React Native, TypeScript, Expo Router, AsyncStorage, and sharing.</p>
              </div>
              <div className="hidden items-center justify-center text-muted-foreground md:flex"><ArrowUpRight className="h-4 w-4" /></div>
              <div className="border border-border p-5">
                <Layers3 className="mb-4 h-5 w-5 text-project" />
                <h3 className="font-semibold">Node.js API</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Express + TypeScript endpoints with Zod validation, documented API types, and a health check.</p>
              </div>
              <div className="hidden items-center justify-center text-muted-foreground md:flex"><ArrowUpRight className="h-4 w-4" /></div>
              <div className="border border-border p-5">
                <ShieldCheck className="mb-4 h-5 w-5 text-skill" />
                <h3 className="font-semibold">Analysis services</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Python + scikit-learn + NLTK for classification; Gemini + Search grounding for current claim evidence.</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3 border border-border px-5 py-4 text-sm text-muted-foreground">
              <Check className="h-4 w-4 shrink-0 text-primary" />
              <span>Packaged as a pnpm monorepo and deployed over HTTPS on Replit Cloud, according to the project documentation.</span>
            </div>
          </div>
        </section>

        <section id="results" className="scroll-mt-24 border-b border-border py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 font-mono text-xs uppercase text-primary">04 / Results</p>
              <h2 className="text-3xl font-bold md:text-4xl">Evaluated on 6,000 held-out articles.</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">The reported test set uses an 80/20 stratified split. The confusion-matrix counts below sum to all 6,000 test examples.</p>
            </div>
            <div className="grid min-w-0 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="grid min-w-0 grid-cols-2 gap-px self-start border border-border bg-border">
                {[
                  ["96.0%", "Overall accuracy"], ["96.0%", "FAKE-class F1"],
                  ["95.1%", "FAKE precision"], ["97.0%", "FAKE recall"],
                ].map(([value, label]) => <div key={label} className="min-w-0 bg-background p-5"><div className="text-3xl font-bold text-primary">{value}</div><div className="mt-2 text-xs text-muted-foreground">{label}</div></div>)}
              </div>
              <div className="min-w-0">
                <h3 className="mb-4 text-lg font-semibold">Confusion matrix <span className="font-normal text-muted-foreground">· Actual vs predicted</span></h3>
                <div className="max-w-full overflow-x-auto border border-border">
                  <table className="w-full min-w-[440px] border-collapse text-left text-sm">
                    <thead><tr className="border-b border-border text-xs text-muted-foreground"><th scope="col" className="p-3 font-medium">Actual class</th><th scope="col" className="p-3 font-medium">Predicted FAKE</th><th scope="col" className="p-3 font-medium">Predicted REAL</th></tr></thead>
                    <tbody>
                      <tr className="border-b border-border"><th scope="row" className="p-3 font-medium">FAKE</th><td className="p-3 font-mono text-primary">2,910 <span className="font-sans text-xs text-muted-foreground">correct</span></td><td className="p-3 font-mono">90 <span className="font-sans text-xs text-muted-foreground">missed</span></td></tr>
                      <tr><th scope="row" className="p-3 font-medium">REAL</th><td className="p-3 font-mono">150 <span className="font-sans text-xs text-muted-foreground">false alarm</span></td><td className="p-3 font-mono text-primary">2,850 <span className="font-sans text-xs text-muted-foreground">correct</span></td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Training data: 30,000+ Kaggle articles, supplemented by the LIAR dataset. Reported model figures come from the project overview and should be interpreted in the context of that test split.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 font-mono text-xs uppercase text-primary">In the app</p>
              <h2 className="text-3xl font-bold md:text-4xl">A result that shows its work.</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">The interface pairs a clear score with claim-by-claim findings and source credibility context.</p>
            </div>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <figure>
                <img src={analyzerScreen} alt="NewsVerify mobile analysis screen showing a truth score, individual claim checks, and source credibility" className="mx-auto max-h-[680px] w-full max-w-[620px] rounded-md border border-border object-contain" loading="lazy" />
                <figcaption className="mt-3 text-xs text-muted-foreground">Mobile analysis view · supplied project screenshot</figcaption>
              </figure>
              <figure>
                <img src={pipelineScreen} alt="NewsVerify project visualization illustrating the NLP processing and model evaluation pipeline" className="w-full rounded-md border border-border" loading="lazy" />
                <figcaption className="mt-3 text-xs text-muted-foreground">Processing and evaluation overview · supplied project screenshot</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[0.7fr_1.3fr] md:gap-16">
            <div>
              <p className="mb-3 font-mono text-xs uppercase text-primary">What comes next</p>
              <h2 className="text-3xl font-bold md:text-4xl">From a strong prototype to broader reach.</h2>
            </div>
            <div>
              <p className="leading-relaxed text-muted-foreground">The documented next steps focus on making checks useful to more people and across more contexts: Hindi, Urdu, and regional-language support; a browser extension; and alerts for trending misinformation.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild><a href="https://truth-verifier--Techtitans999.replit.app" target="_blank" rel="noopener noreferrer">Open NewsVerify <ArrowUpRight className="ml-2 h-4 w-4" /></a></Button>
                <Button asChild variant="outline"><Link to="/#projects"><ArrowLeft className="mr-2 h-4 w-4" />More projects</Link></Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NewsVerifyCaseStudy;