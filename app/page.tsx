import Section from "@/components/Section";
import Link from "next/link";
import { LANDING } from "@/content";

export default function Landing(){
  return (
    <Section kicker="Dudester" title={<span className="h1">{LANDING.h1}</span>}>
      <p className="max-w-2xl text-base text-base-muted">{LANDING.subhead}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {LANDING.ctas.map((c) => (
          <Link
            key={c.href}
            href={c.href as any}
            className={`btn ${c.style === "accent" ? "btn-accent" : ""}`}
          >
            {c.label}
          </Link>
        ))}
      </div>
    </Section>
  );
}