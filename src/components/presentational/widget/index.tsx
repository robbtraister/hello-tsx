import styles from "./styles.scss";

export function Widget({
  children,
  className = "",
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.widget} ${className || ""}`.trim()} {...props}>
      {children}
    </div>
  );
}
