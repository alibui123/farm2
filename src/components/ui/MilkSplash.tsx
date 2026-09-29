export function MilkSplash({
  className = "",
  fill = "currentColor",
  opacity = 1,
}: {
  className?: string;
  fill?: string;
  opacity?: number;
}) {
  return (
    <svg
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M92 248c-38-42-48-108-18-152 26-38 78-58 126-46 22 6 42 18 64 16 28-2 48-24 76-28 48-6 98 24 118 68 14 30 10 66 28 94 22 34 66 48 78 86 14 44-18 96-64 108-28 8-58-2-86 6-34 10-58 42-94 48-48 8-102-14-128-54-18-28-18-64-40-88-16-18-40-28-60-58z"
        fill={fill}
        opacity={opacity}
      />
      <path
        d="M420 96c18-22 52-28 74-12 16 12 22 34 16 54-4 14-16 24-20 38-6 22 8 44 2 66-8 28-40 44-68 38-22-4-40-22-44-44-6-28 8-56 22-80 8-14 10-40 18-60z"
        fill={fill}
        opacity={opacity * 0.7}
      />
      <ellipse cx="168" cy="118" rx="28" ry="36" fill={fill} opacity={opacity * 0.55} />
    </svg>
  );
}

export function MilkDrop({
  className = "",
  fill = "currentColor",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 32"
      className={className}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M12 1C12 1 3 13.2 3 20.2C3 25.3 7 29 12 29C17 29 21 25.3 21 20.2C21 13.2 12 1 12 1Z" />
    </svg>
  );
}
