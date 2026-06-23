export function Mono({ size = 11, color = '#6A7689', spacing = '0.1em', children, style }) {
  return (
    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: size, letterSpacing: spacing, color, ...style }}>
      {children}
    </span>
  );
}
