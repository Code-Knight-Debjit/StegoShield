function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/80 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60";
  const variants = {
    primary:
      "bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 text-slate-950 shadow-lg shadow-cyan-500/20 hover:-translate-y-0.5 hover:shadow-cyan-400/30",
    secondary:
      "border border-white/12 bg-white/6 text-cyan-50 hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-cyan-300/10",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
