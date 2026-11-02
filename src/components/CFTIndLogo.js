export default function CFTIndLogo({ size = "md", className = "" }) {
  const sizes = {
    sm: { height: 28, textSize: "text-xl" },
    md: { height: 38, textSize: "text-3xl" },
    lg: { height: 50, textSize: "text-4xl" },
  };
  const { height, textSize } = sizes[size] || sizes.md;
  const width = Math.round(height * (19 / 40));

  return (
    <span
      className={`inline-flex items-end gap-0.5 font-[family-name:var(--font-plus-jakarta)] font-extrabold tracking-tight leading-none ${textSize} ${className}`}
    >
      <span className="text-navy">CFT</span>
      <svg
        width={width}
        height={height}
        viewBox="0 0 70 128"
        aria-hidden="true"
        style={{ marginBottom: "-4px" }}
      >
        <path d="M31 48C9 45 4 27 7 11c20-2 30 19 24 37Z" fill="#F8BE3D" />
        <path d="M38 48C38 20 53 6 68 3c2 27-10 44-30 45Z" fill="#268D55" />
        <path d="M28 51h18v48H28Z" fill="#153A5B" />
        <path d="M28 99l9 24 9-24Z" fill="#F8D6B3" />
        <path d="m34 114 3 9 4-9Z" fill="#153A5B" />
        <path d="M37 51v48" stroke="white" strokeWidth="3" />
      </svg>
      <span className="text-green">nd</span>
    </span>
  );
}
