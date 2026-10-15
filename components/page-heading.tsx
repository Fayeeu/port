type Props = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export function PageHeading({ eyebrow, title, description, className = "" }: Props) {
  return (
    <header className={`mb-10 ${className}`}>
      <p className="mb-2.5 text-xs font-semibold tracking-wide text-ink/60">
        {eyebrow}
      </p>
      <h2 className="font-hero text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl leading-[1.2]">
        {title}
      </h2>
      <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-muted">
        {description}
      </p>
    </header>
  );
}
