type LogoProps = {
  inverse?: boolean;
};

export function Logo({ inverse = false }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-3" aria-label="Doodle Dynamo home">
      <span
        className="relative grid h-9 w-9 place-items-center bg-dd-navy text-sm font-extrabold text-white"
        aria-hidden="true"
      >
        <span className="translate-x-[1px]">DD</span>
      </span>
      <span
        className={`text-sm font-extrabold tracking-[-0.045em] sm:text-base ${
          inverse ? "text-white" : "text-dd-ink"
        }`}
      >
        Doodle<br className="hidden sm:block" /> Dynamo
      </span>
    </span>
  );
}
