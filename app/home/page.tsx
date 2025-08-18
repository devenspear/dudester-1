import Section from "@/components/Section";
import { Card } from "@/components/Card";
import FeatureCard from "@/components/FeatureCard";
import { HOME, PILLARS } from "@/content";
import { Sparkles, BrainCircuit, Rocket, Hexagon, Send } from "lucide-react";
import Link from "next/link";

const icons = [
  <Sparkles className="h-8 w-8" />, 
  <BrainCircuit className="h-8 w-8" />, 
  <Rocket className="h-8 w-8" />
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Full Background Image */}
      <div className="relative w-full">
        {/* Background Image Container */}
        <div 
          className="w-full h-[320px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
          style={{
            backgroundImage: 'url("/images/hero-background.jpeg")',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#0B0B0C'
          }}
        />
      </div>

      {/* Hero Content Below Image */}
      <Section>
        <div className="text-center max-w-4xl mx-auto px-2">
          <h1 className="h1 mb-3">{HOME.hero}</h1>
          {HOME.subhead && (
            <p className="text-base text-base-muted max-w-3xl mx-auto px-2">{HOME.subhead}</p>
          )}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link className="btn btn-accent" href="/agenda">See the Summit Agenda</Link>
            <Link className="btn" href="/about">Meet the Founders</Link>
          </div>
        </div>
      </Section>

      {/* Pillars Section with Enhanced Cards */}
      <Section title="Pillars">
        <div className="grid gap-8 sm:grid-cols-3">
          {PILLARS.map((p, i) => (
            <div 
              key={p.title}
              className="animate-card"
              style={{
                animationDelay: `${i * 0.1}s`
              }}
            >
              <FeatureCard title={p.title} icon={icons[i] ?? <Sparkles className="h-8 w-8" />}>
                {p.body}
              </FeatureCard>
            </div>
          ))}
        </div>
      </Section>

      {/* Focus & Proof Section - Removed bullets and buttons */}
      <Section title="Focus & Proof">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="animate-card" style={{ animationDelay: '0s' }}>
            <Card title={HOME.features[0].title} icon={<Hexagon className="h-8 w-8" />}>
              {HOME.features[0].body}
            </Card>
          </div>
          <div className="animate-card" style={{ animationDelay: '0.1s' }}>
            <Card title={HOME.features[1].title} icon={<Send className="h-8 w-8" />}>
              {HOME.features[1].body}
            </Card>
          </div>
          <div className="animate-card" style={{ animationDelay: '0.2s' }}>
            <Card title={HOME.features[2].title} icon={<Rocket className="h-8 w-8" />}>
              {HOME.features[2].body}
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}