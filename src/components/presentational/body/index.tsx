import styles from "./styles.scss";

export function Body({ children }: { children?: React.ReactNode }) {
  return (
    <div className={styles.body}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
