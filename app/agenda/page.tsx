import Section from "@/components/Section";
import { Card } from "@/components/Card";
import { Clock, CalendarDays } from "lucide-react";
import { AGENDA } from "@/content";

export default function Agenda(){
  return (
    <>
      <Section title={AGENDA.name} kicker="Agenda">
        <p className="text-base text-base-muted">{AGENDA.theme}</p>
        <p className="mt-2 text-sm text-base-muted">{AGENDA.venue}</p>

        <h2 className="h2 mt-10 flex items-center gap-2"><CalendarDays className="h-5 w-5" /> Friday</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {AGENDA.friday.map((i) => (
            <Card key={i.time} title={`${i.title}`} icon={<Clock className="h-5 w-5" />}>
              <p className="text-sm text-base-muted"><span className="font-medium">{i.time}</span> — {i.detail}</p>
            </Card>
          ))}
        </div>

        <h2 className="h2 mt-10 flex items-center gap-2"><CalendarDays className="h-5 w-5" /> Saturday (Half-Day)</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {AGENDA.saturday.map((i) => (
            <Card key={i.time} title={`${i.title}`} icon={<Clock className="h-5 w-5" />}>
              <p className="text-sm text-base-muted"><span className="font-medium">{i.time}</span> — {i.detail}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AGENDA.roles.map((r) => (
            <Card key={r.name} title={r.name}>{r.focus}</Card>
          ))}
          <Card title="Rituals">{AGENDA.rituals.join(" • ")}</Card>
          <Card title="Stack Hints">{AGENDA.stackHints.join(" • ")}</Card>
        </div>
      </Section>
    </>
  );
}