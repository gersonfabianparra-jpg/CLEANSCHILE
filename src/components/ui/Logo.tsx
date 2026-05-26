import Image from "next/image";

// Logo PNG is 1700×563 (3:1 ratio) after trimming transparent padding

export function LogoMark({ size = 38 }: { size?: number }) {
  return (
    <Image
      src="/logo.png"
      alt="CleanSchile"
      width={size * 3}
      height={size}
      style={{ objectFit: "contain" }}
      priority
    />
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  const h = compact ? 64 : 80;
  return (
    <Image
      src="/logo.png"
      alt="CleanSchile Detailing Car"
      width={h * 3}
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
      width={300}
      height={100}
      style={{ objectFit: "contain" }}
      priority
    />
  );
}
