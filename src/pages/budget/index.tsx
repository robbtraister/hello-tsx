import { Budget as BudgetComponent } from "src/components/consumers/budget";
import { Scene } from "src/components/presentational/scene";
import { Widget } from "src/components/presentational/widget";

export function Budget() {
  return (
    <Scene title="Budget">
      <Widget>
        <div style={{ margin: "0 auto", width: "50%" }}>
          <BudgetComponent />
        </div>
      </Widget>
    </Scene>
  );
}
