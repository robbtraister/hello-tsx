import styles from "./styles.scss";

import { Meter } from "src/components/presentational/meter";
import { Scene } from "src/components/presentational/scene";
import { Widget } from "src/components/presentational/widget";
import { useStore } from "src/contexts/store";

function Entry({
  value,
  total,
  title,
  description,
}: {
  value: number;
  total?: number;
  title: string;
  description?: string;
}) {
  return (
    <Widget className={styles.entry}>
      <div className={styles.meter}>
        <Meter value={value} total={total} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </Widget>
  );
}

export function Score() {
  const { score } = useStore();
  return (
    <Scene title="Score">
      <div className={styles.grid}>
        <Widget className={styles.total}>
          <div className={styles.title}>Your Score</div>
          <Meter value={score.value} title="Wellness Score" />
          <div className={styles.description}>
            <div className={styles.title}>Get the Complete Picture</div>
            <div>
              Add your savings, checking, credit card, loan, investment, 401(k),
              IRA, and other bank accounts so we can score you accurately
            </div>
            <div className={styles.peer}>
              <div className={styles.title}>Your Peers</div>
              <Meter value={score.peer} title="Wellness Score" color="#808" />
            </div>
          </div>
        </Widget>
        {score.entries.map((entry) => (
          <Entry {...entry} key={entry.title} />
        ))}
      </div>
    </Scene>
  );
}

export default Score;
