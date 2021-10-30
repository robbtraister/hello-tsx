import { Budget } from "src/components/consumers/budget";
import { Counter } from "src/components/counter";
import { Goals } from "src/components/consumers/goals";
import { Retirement } from "src/components/consumers/retirement";
import { Meter } from "src/components/presentational/meter";
import { Transactions } from "src/components/consumers/transactions";
import { Scene } from "src/components/presentational/scene";
import { Widget } from "src/components/presentational/widget";

import styles from "./styles.scss";

const Dashboard = () => (
  <Scene title="Home">
    <div className={styles.grid}>
      <Widget>
        <div className={styles.score}>
          <div className={styles.title}>Your Score</div>
          <Meter value={85} title="Wellness Score" />
        </div>
        <div className={styles.score}>
          <div className={`${styles.title} ${styles.peer}`}>Your Peers</div>
          <Meter value={92} title="Wellness Score" color="#808" />
        </div>
      </Widget>
      <Widget>
        <Retirement />
      </Widget>
      <Widget>
        <Budget />
      </Widget>
      <Widget>
        <Goals />
      </Widget>
      <Widget>
        <Counter right />
        <div style={{ height: "200px" }} />
      </Widget>
      <Widget>
        <h3 className={styles.title}>All Accounts</h3>
        <Transactions />
      </Widget>
      <Widget>
        data
        <div style={{ height: "200px" }} />
      </Widget>
      <Widget>
        scroll
        <div style={{ height: "400px" }} />
      </Widget>
    </div>
  </Scene>
);

export { Dashboard };
