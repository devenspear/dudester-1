import Section from "@/components/Section";
import { Card } from "@/components/Card";
import { ORG } from "@/content";

export default function Organization(){
  return (
    <Section title={ORG.headline} kicker="Organization">
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Structure">{ORG.structure}</Card>
        <Card title="Governance">{ORG.governance}</Card>
        <Card title="Cadence">{ORG.cadence}</Card>
        <Card title="IP">{ORG.ip}</Card>
        <Card title="Revenue">{ORG.revenue}</Card>
        <Card title="Privacy">{ORG.privacy}</Card>
      </div>
    </Section>
  );
}