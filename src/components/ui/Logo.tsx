import Image from "next/image";

export function LogoMark({ size = 38 }: { size?: number }) {
  return (
    <Image
      src="/logo.png"
      alt="CleanSchile"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
      priority
    />
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  const h = compact ? 80 : 96;
  return (
    <Image
      src="/logo.png"
      alt="CleanSchile Detailing Car"
      width={h}
      height={h}
      style={{ objectFit: "contain" }}
      priority
    />
  );
}

export function LogoFull() {
  return (
    <Image
      src="/logo.png"
      alt="CleanSchile Detailing Car"
      width={260}
      height={90}
      style={{ objectFit: "contain" }}
      priority
    />
  );
}
