import Section from "@/components/Section";
import { Card } from "@/components/Card";

export default function Organization() {
  return (
    <Section title="Organization">
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Structure">
          Dudester LLC as founder’s collective → product studio → operating company.
          Equal founding interests. Clear IP assignment to the entity.
        </Card>
        <Card title="Governance">
          Majority decisions; rotating chair for tie-break. Simple operating agreement.
        </Card>
        <Card title="Cadence">
          Monthly “Dudester Drop” demo. Annual Summit & Hackathon. Quarterly roadmap review.
        </Card>
        <Card title="IP & Revenue">
          Code in Dudester GitHub; IP owned by entity. Revenue share per project or pooled model.
        </Card>
        <Card title="Compliance">
          NDAs for guests/contractors. Privacy-first data practices.
        </Card>
      </div>
    </Section>
  );
}


