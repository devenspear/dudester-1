import Section from "@/components/Section";
import { FOUNDERS, ABOUT_PAGE_COPY } from "@/content";

export default function About(){
  return (
    <Section title={ABOUT_PAGE_COPY.headline} kicker="About">
      <p className="text-base text-base-muted max-w-3xl mb-8">{ABOUT_PAGE_COPY.subhead}</p>
      <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
        {FOUNDERS.map((f) => (
          <div key={f.name} className="card card-hover p-6 flex flex-col">
            <div className="flex-1 flex flex-col">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-base-fg">{f.name}</h3>
                <p className="text-sm font-medium text-base-accent mt-1">{f.role}</p>
              </div>
              <img
                src={`/images/founder-${f.name.split(' ')[0].toLowerCase()}.png`}
                alt={`${f.name} portrait`}
                className="mb-4 w-full rounded-2xl border border-base-border object-cover aspect-square"
              />
              <p className="text-sm leading-relaxed text-base-muted flex-1">{f.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}