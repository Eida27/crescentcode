import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  LayoutTemplate,
  Mail,
  Palette,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { sendContactInquiry } from "@/app/actions";
import { ContactForm } from "@/components/contact-form";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    title: "Business Websites",
    description:
      "Clear, polished websites for service businesses that need credibility, structure, and a steady path to inquiries.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Portfolio Websites",
    description:
      "Modern personal sites that frame your work, expertise, and story with enough restraint to feel premium.",
    icon: LayoutTemplate,
  },
  {
    title: "Landing Pages",
    description:
      "Focused pages for offers, launches, and campaigns with sharp hierarchy and a conversion-ready contact flow.",
    icon: Rocket,
  },
];

const skills = [
  "Next.js and React",
  "Responsive UI systems",
  "Professional landing pages",
  "Business-focused copy structure",
  "Contact and lead flows",
  "Performance-minded builds",
];

const process = [
  {
    step: "01",
    title: "Clarify",
    description:
      "Define the audience, offer, sections, and action you want visitors to take.",
  },
  {
    step: "02",
    title: "Shape",
    description:
      "Turn the message into a modern page structure with strong visual rhythm and useful calls to action.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Implement the site with responsive layouts, clean components, and production-ready details.",
  },
  {
    step: "04",
    title: "Launch",
    description:
      "Verify the page across screen sizes and prepare the contact path for real inquiries.",
  },
];

const proofPoints = [
  "No invented testimonials or client claims",
  "Service-first sections ready for real work samples",
  "Contact form wired for Gmail delivery through Resend",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-stone-100">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-zinc-950/72 backdrop-blur-xl">
        <nav
          className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8"
          aria-label="Primary navigation"
        >
          <a
            href="#top"
            className="flex min-w-0 items-center gap-3"
            aria-label="Endless Refinement home"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-stone-100 p-1.5 shadow-sm shadow-black/20">
              <Image
                src="/endless-refinement-logo.png"
                alt=""
                width={28}
                height={28}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="truncate text-sm font-semibold text-stone-50">
              Crescent Code
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm text-stone-300 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-teal-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden h-10 items-center gap-2 rounded-md bg-stone-100 px-4 text-sm font-semibold text-zinc-950 transition hover:bg-teal-200 sm:inline-flex"
          >
            Start
            <ArrowRight aria-hidden="true" size={16} />
          </a>
        </nav>
      </header>

      <section
        id="top"
        className="relative isolate flex min-h-[86svh] items-end overflow-hidden"
      >
        <Image
          src="/crescent-code-showcase.png"
          alt="Premium web design workspace with responsive website mockups"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,13,15,0.94)_0%,rgba(9,13,15,0.75)_43%,rgba(9,13,15,0.34)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-[linear-gradient(0deg,#090d0f_0%,rgba(9,13,15,0)_100%)]" />

        <div className="mx-auto flex min-w-0 w-full max-w-7xl px-5 pb-16 pt-32 sm:px-8 lg:pb-24">
          <div className="min-w-0 w-full max-w-3xl">
            <p className="mb-5 inline-flex max-w-full items-start gap-2 rounded-md border border-teal-300/30 bg-teal-300/10 px-3 py-2 text-sm font-medium leading-6 text-teal-100 sm:items-center">
              <ShieldCheck aria-hidden="true" className="shrink-0" size={16} />
              Websites for businesses and portfolios
            </p>
            <h1 className="max-w-[calc(100vw-2.5rem)] break-words text-5xl font-semibold leading-[1.02] text-stone-50 sm:max-w-none sm:text-6xl lg:text-7xl">
              Crescent Code
            </h1>
            <p className="mt-7 max-w-[calc(100vw-2.5rem)] break-words text-lg leading-8 text-stone-200 sm:max-w-2xl sm:text-xl">
              I build polished websites for businesses and professionals.
              Modern design, clear structure, and contact-ready pages.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-teal-300 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-teal-200 sm:w-auto"
              >
                Start a project
                <ArrowRight aria-hidden="true" size={17} />
              </a>
              <a
                href="#services"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-white/18 bg-white/8 px-5 text-sm font-semibold text-stone-100 transition hover:border-amber-200/55 hover:bg-amber-200/10 sm:w-auto"
              >
                View services
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-8 sm:grid-cols-3 sm:px-8">
          {[
            ["Focus", "Business and portfolio websites"],
            ["Style", "Premium, modern, and responsive"],
            ["Contact", "Inquiries sent to Gmail"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-white/10 p-5">
              <p className="text-sm text-amber-200">{label}</p>
              <p className="mt-2 text-lg font-semibold text-stone-50">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="bg-[#101719] py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-teal-200">Services</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-stone-50 sm:text-5xl">
              Websites that feel considered before a visitor reads a word.
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-300">
              The first version is service-focused and honest. It explains what
              Crescent Code can build now while leaving clean space for future
              case studies.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="rounded-lg border border-white/10 bg-white/[0.04] p-6 transition hover:border-teal-300/35 hover:bg-white/[0.06]"
                >
                  <div className="flex size-11 items-center justify-center rounded-md bg-teal-300/12 text-teal-100">
                    <Icon aria-hidden="true" size={22} />
                  </div>
                  <h3 className="mt-8 text-xl font-semibold text-stone-50">
                    {service.title}
                  </h3>
                  <p className="mt-4 leading-7 text-stone-300">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-amber-200">Skills</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-stone-50 sm:text-5xl">
              Web development with a practical business lens.
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-300">
              The work is built around clear messaging, responsive execution,
              and the details that make a site feel trustworthy on day one.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {skills.map((skill) => (
              <div
                key={skill}
                className="flex min-h-20 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4"
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="shrink-0 text-teal-200"
                  size={20}
                />
                <span className="font-medium text-stone-100">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="bg-[#151714] py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold text-teal-200">Process</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-stone-50 sm:text-5xl">
                A straightforward path from rough idea to polished page.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {process.map((item) => (
                <article
                  key={item.step}
                  className="rounded-lg border border-white/10 bg-zinc-950/45 p-6"
                >
                  <p className="font-mono text-sm text-amber-200">
                    {item.step}
                  </p>
                  <h3 className="mt-6 text-xl font-semibold text-stone-50">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-stone-300">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-7">
            <div className="flex items-center gap-3 text-teal-100">
              <BadgeCheck aria-hidden="true" size={24} />
              <p className="text-sm font-semibold">Credibility without filler</p>
            </div>
            <h2 className="mt-7 text-3xl font-semibold leading-tight text-stone-50 sm:text-4xl">
              A professional first impression without pretending there are
              client results we have not added yet.
            </h2>
          </div>

          <div className="space-y-4">
            {proofPoints.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-5"
              >
                <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-md bg-amber-200 text-zinc-950">
                  <CheckCircle2 aria-hidden="true" size={16} />
                </span>
                <p className="leading-7 text-stone-200">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#0b1112] py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-amber-200">
              <Mail aria-hidden="true" size={17} />
              Contact
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-stone-50 sm:text-5xl">
              Tell me what you want your website to do.
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-300">
              Share the goal, the type of site, and the details you already
              know. Submissions are prepared to send to
              anulabac30@gmail.com through the configured email provider.
            </p>

            <div className="mt-10 grid gap-4">
              {[
                {
                  icon: Code2,
                  title: "Built with Next.js",
                  text: "A modern foundation for fast pages and clean growth.",
                },
                {
                  icon: Palette,
                  title: "Designed for polish",
                  text: "Strong spacing, responsive sections, and a premium tone.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
                  >
                    <Icon aria-hidden="true" className="text-teal-200" />
                    <h3 className="mt-4 font-semibold text-stone-50">
                      {item.title}
                    </h3>
                    <p className="mt-2 leading-7 text-stone-300">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.05] p-5 shadow-2xl shadow-black/30 sm:p-7">
            <ContactForm action={sendContactInquiry} />
          </div>
        </div>
      </section>
    </main>
  );
}
