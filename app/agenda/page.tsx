import Section from "@/components/Section";
import { Card } from "@/components/Card";
import { AGENDA } from "@/content";

export default function Agenda(){
  return (
    <>
      <Section title={AGENDA.name} kicker="Agenda">
        <p className="text-base text-base-muted">{AGENDA.theme}</p>
        <p className="mt-2 text-sm text-base-muted">{AGENDA.venue}</p>

        <h3 className="mt-8 text-sm uppercase tracking-widest text-base-muted">Friday</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {AGENDA.friday.map((i) => (
            <Card key={i.time} title={`${i.time} — ${i.title}`}>
              <p>{i.detail}</p>
              {i.outcomes && (
                <ul className="mt-2 list-disc pl-5 text-sm text-base-muted space-y-1">
                  {i.outcomes.map((o) => <li key={o}>{o}</li>)}
                </ul>
              )}
            </Card>
          ))}
        </div>

        <h3 className="mt-10 text-sm uppercase tracking-widest text-base-muted">Saturday (Half-Day)</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {AGENDA.saturday.map((i) => (
            <Card key={i.time} title={`${i.time} — ${i.title}`}>
              <p>{i.detail}</p>
              {i.outcomes && (
                <ul className="mt-2 list-disc pl-5 text-sm text-base-muted space-y-1">
                  {i.outcomes.map((o) => <li key={o}>{o}</li>)}
                </ul>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AGENDA.roles.map((r) => (
            <Card key={r.name} title={r.name}>{r.focus}</Card>
          ))}
          <Card title="Rituals">
            <ul className="list-disc pl-5 text-sm text-base-muted space-y-1">
              {AGENDA.rituals.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </Card>
          <Card title="Stack Hints">
            <ul className="list-disc pl-5 text-sm text-base-muted space-y-1">
              {AGENDA.stackHints.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </Card>
        </div>
      </Section>
    </>
  );
}