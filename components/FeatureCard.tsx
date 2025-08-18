import { ReactNode } from "react";

export default function FeatureCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode; }) {
  return (
    <div className="card p-8 h-full will-change-transform">
      <div className="mb-4 flex flex-col items-center text-center">
        <div className="h-16 w-16 rounded-2xl bg-base-border/30 flex items-center justify-center mb-4 text-base-mint">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="text-sm leading-6 text-center text-base-muted">{children}</div>
    </div>
  );
}