import Section from "@/components/Section";
import { Card } from "@/components/Card";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Section
        title={<span className="h1">A founder guild of four 60-year-olds vibecoding the future—playful, insightful, relentlessly shipping.</span>}
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <Card title="Ageless Innovation">
            Built since ’95, built for ’30. Experience isn’t baggage—it’s compound interest.
          </Card>
          <Card title="Vibecoding Method">
            AI copilots, rapid loops, demos over decks. Ship &gt; Shout.
          </Card>
          <Card title="Launch Bias">
            Ship small. Learn fast. Iterate in public. Put it in users’ hands.
          </Card>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="btn" href="/agenda">View Agenda</Link>
          <Link className="btn" href="/about">Meet the Founders</Link>
          <Link className="btn btn-accent" href="/discuss">Open Discussion</Link>
        </div>
      </Section>
    </>
  );
}


