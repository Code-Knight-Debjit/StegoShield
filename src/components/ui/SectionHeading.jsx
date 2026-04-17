function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center opacity-0 fade-in-up">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{description}</p>
    </div>
  );
}

export default SectionHeading;
