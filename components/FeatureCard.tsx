import { ReactNode } from "react";
export default function FeatureCard({
  icon, title, children
}: { icon: ReactNode; title: string; children: ReactNode; }) {
  return (
    <div className="card card-hover p-6">
      <div className="mb-3 flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-base-border/50 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <div className="text-sm leading-6">{children}</div>
    </div>
  );
}


