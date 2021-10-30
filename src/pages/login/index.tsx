import { RouteChildrenProps } from "react-router-dom";

import { Scene } from "src/components/presentational/scene";
import { Widget } from "src/components/presentational/widget";

export function Login({ location }: RouteChildrenProps) {
  const uri = encodeURIComponent(`${location.pathname}${location.search}`);
  return (
    <Scene title="Login">
      <Widget>
        <a href={`/auth/google?redirect=${uri}`}>Google</a>
      </Widget>
      <Widget>
        <a href={`/auth/facebook?redirect=${uri}`}>Facebook</a>
      </Widget>
    </Scene>
  );
}
