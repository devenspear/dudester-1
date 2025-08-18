import Section from "@/components/Section";
import { Card } from "@/components/Card";

const fri = [
  { t: "1:00–2:00", d: "Welcome reception (bourbon tasting + gourmet bites)" },
  { t: "2:00–3:30", d: "Founder MVP demos (10 minutes each)" },
  { t: "3:30–5:30", d: "Convergence workshop (select unified product)" },
  { t: "5:30–6:30", d: "Social break (bourbon flight, chef appetizers)" },
  { t: "6:30–8:30", d: "Sprint #1: Fusion build" },
  { t: "8:30–9:30", d: "Fireside reflections + toast" }
];

const sat = [
  { t: "8:30–9:00", d: "Breakfast & reset" },
  { t: "9:00–11:30", d: "Sprint #2: Prototype polish (three 45–50min loops)" },
  { t: "11:30–12:00", d: "Launch prep" },
  { t: "12:00–12:30", d: "Soft launch (Vercel/TestFlight)" },
  { t: "12:30–1:00", d: "Closing circle, champagne, next steps" }
];

export default function Agenda() {
  return (
    <>
      <Section title="Dudester Summit — Professional Hackathon Agenda">
        <h3 className="mt-2 text-sm uppercase tracking-widest text-base-muted">Friday</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {fri.map(i => <Card key={i.t} title={i.t}>{i.d}</Card>)}
        </div>

        <h3 className="mt-8 text-sm uppercase tracking-widest text-base-muted">Saturday (Half-Day)</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {sat.map(i => <Card key={i.t} title={i.t}>{i.d}</Card>)}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Card title="Vision">Why this product matters now.</Card>
          <Card title="Roles">Architect • Builder • Curator • Integrator.</Card>
          <Card title="Stack">Next.js • Vercel • AI copilots.</Card>
          <Card title="Sprints">90-minute loops; demo or it didn’t happen.</Card>
          <Card title="Launch">Deployed live by Saturday noon.</Card>
          <Card title="Rituals">Bourbon toast • Champagne close.</Card>
        </div>
      </Section>
    </>
  );
}


