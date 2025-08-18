import { ReactNode } from "react";
export function Card({ title, icon, children }: { title?: string; icon?: ReactNode; children: ReactNode; }) {
  return (
    <div className="card card-hover p-6">
      {(title || icon) && (
        <div className="mb-3 flex items-center gap-3">
          {icon && <span className="text-base-mint">{icon}</span>}
          {title && <h3 className="text-base font-semibold">{title}</h3>}
        </div>
      )}
      <div className="text-sm leading-6">{children}</div>
    </div>
  );
}


