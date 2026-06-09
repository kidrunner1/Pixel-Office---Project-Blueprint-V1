export const AUTH_FORM_STYLES = {
  card: "border-2 border-slate-700 bg-[#0b1727] p-6 shadow-[7px_7px_0_#020617] sm:p-8",
  eyebrow: "text-xs font-black text-emerald-300",
  title: "mt-3 text-2xl font-black text-white",
  description: "mt-2 text-sm leading-6 text-slate-400",
  form: "space-y-5",
  field: "space-y-2",
  label: "block text-sm font-bold text-slate-200",
  input:
    "w-full border-2 border-slate-600 bg-[#07111f] px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20",
  error:
    "border-2 border-rose-500/70 bg-rose-950/60 px-3 py-3 text-sm text-rose-100",
  submitButton:
    "w-full border-2 border-slate-950 bg-emerald-300 px-4 py-3 text-sm font-black text-emerald-950 shadow-[4px_4px_0_#020617] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-200 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300 disabled:shadow-none motion-reduce:transition-none",
  footer: "mt-7 text-center text-sm text-slate-400",
  link: "font-bold text-emerald-200 underline decoration-emerald-400/50 underline-offset-4 hover:text-emerald-100",
} as const;
