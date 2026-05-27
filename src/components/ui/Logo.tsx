import Image from "next/image";

// Logo PNG is 1700×563 (3:1 ratio) after trimming transparent padding

export function LogoMark({ size = 38 }: { size?: number }) {
  return (
    <Image
      src="/logo.png"
      alt="CleanSchile"
      width={size * 3}
      height={size}
      style={{ objectFit: "contain", width: "auto", maxHeight: size }}
      priority
    />
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  const maxH = compact ? 44 : 56;
  return (
    <Image
      src="/logo.png"
      alt="CleanSchile Detailing Car"
      width={compact ? 192 : 240}
      height={compact ? 64 : 80}
      sizes="(max-width: 768px) 140px, 192px"
      style={{ objectFit: "contain", width: "auto", maxHeight: maxH, height: maxH }}
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
      sizes="(max-width: 768px) 200px, 300px"
      style={{ objectFit: "contain", objectPosition: "left center", width: "auto", maxHeight: 100, display: "block" }}
      priority
    />
  );
}
