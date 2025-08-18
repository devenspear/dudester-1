import Section from "@/components/Section";
import { Card } from "@/components/Card";

const bios = [
  {
    name: "Deven Spear",
    text: "Multidisciplinary futurist and innovation strategist; decades building at the nexus of wellness, real estate, AI, and blockchain. Systems thinker; relentless shipper."
  },
  {
    name: "Michael C. Worthington",
    text: "Serial entrepreneur/operator across software, data, and growth. Pragmatic builder who turns vision into dependable execution."
  },
  {
    name: "Sean Harrison",
    text: "Product-minded technologist focused on UX, scalable systems, and go-to-market orchestration; bridges code, design, and narrative."
  },
  {
    name: "David Wilson",
    text: "Veteran technologist and business strategist; pattern-spotter in analytics, automation, and durable value creation."
  }
];

export default function About() {
  return (
    <Section title="The Founders">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {bios.map(b => (
          <Card key={b.name} title={b.name}>{b.text}</Card>
        ))}
      </div>
    </Section>
  );
}


