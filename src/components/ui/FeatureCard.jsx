function FeatureCard({ icon: Icon, title, description, accent = "teal", delayClass = "" }) {
  const accentMap = {
    teal: "from-teal-400/20 to-cyan-400/5 text-teal-300",
    blue: "from-sky-400/20 to-blue-400/5 text-sky-300",
    green: "from-emerald-400/20 to-teal-400/5 text-emerald-300",
  };

  return (
    <article
      className={`glass-panel group rounded-3xl p-6 opacity-0 fade-in-up ${delayClass} transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40`}
    >
      <div
        className={`mb-5 inline-flex rounded-2xl bg-gradient-to-br ${accentMap[accent]} p-3`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
    </article>
  );
}

export default FeatureCard;
