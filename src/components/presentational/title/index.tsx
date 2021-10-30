import styles from "./styles.scss";

export function Title({ children }: { children?: React.ReactNode }) {
  return (
    <div className={styles.header}>
      <div className={styles.hatching} />
      <div className={styles.title}>{children}</div>
    </div>
  );
}
