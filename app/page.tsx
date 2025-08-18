import Link from "next/link";
import Section from "@/components/Section";

export default function Landing() {
  return (
    <Section
      kicker="Dudester"
      title={<span className="h1">Wisdom-coded. AI-fueled.</span>}
    >
      <p className="max-w-2xl text-base text-base-muted">
        Four RTP founders vibecoding useful software—and shipping it fast.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/login" className="btn btn-accent">Enter Members Area</Link>
        <Link href="/agenda" className="btn">View Agenda</Link>
      </div>
    </Section>
  );
}


