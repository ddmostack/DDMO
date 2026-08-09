import Image from "next/image";

type LogoProps = {
  className?: string;
  inverse?: boolean;
};

export function Logo({ className = "", inverse = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center ${className}`} aria-label="Doodle Dynamo home">
      <Image
        src="/logo.png"
        alt="Doodle Dynamo"
        width={160}
        height={50}
        className={`h-8 sm:h-9 w-auto object-contain transition-transform duration-300 ${
          inverse ? "brightness-0 invert" : "mix-blend-multiply contrast-125"
        }`}
        priority
      />
    </span>
  );
}
