import { Scene } from "src/components/presentational/scene";
import { Widget } from "src/components/presentational/widget";

export function Profile() {
  return (
    <Scene title="Profile">
      <Widget>
        <a href="/logout">logout</a>
      </Widget>
    </Scene>
  );
}
