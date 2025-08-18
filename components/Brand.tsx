export default function Brand({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <span className="absolute -top-1 -left-1 h-1.5 w-1.5 rounded-full bg-base-accent" />
        <span className="absolute -top-1 left-1.5 h-1.5 w-1.5 rounded-full bg-base-mint" />
        <span className="absolute -top-1 left-4 h-1.5 w-1.5 rounded-full bg-base-accent" />
        <span className="sr-only">Dudester</span>
      </div>
      <span className="text-sm font-semibold tracking-wide uppercase">Dudester</span>
    </div>
  );
}


