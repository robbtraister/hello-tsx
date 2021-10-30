import { Goals } from "src/components/consumers/goals";
import { Retirement } from "src/components/consumers/retirement";
import { Scene } from "src/components/presentational/scene";
import { Widget } from "src/components/presentational/widget";

import styles from "./styles.scss";

export function Guidance() {
  return (
    <Scene title="Guidance">
      <div className={styles.grid}>
        <Widget>
          <Retirement />
        </Widget>
        <Widget>
          <Goals />
        </Widget>
        <Widget>
          <Goals />
        </Widget>
      </div>
    </Scene>
  );
}
