export default function Section({
  kicker, title, children
}: { kicker?: string; title?: string | React.ReactNode; children: React.ReactNode; }) {
  return (
    <section className="container-max my-10 space-y-4">
      {kicker && (
        <p className="text-xs uppercase tracking-widest text-base-muted">{kicker}</p>
      )}
      {title && (
        <h2 className="h2">{title}</h2>
      )}
      {children}
    </section>
  );
}


