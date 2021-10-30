import { Graph } from "../../presentational/graph";

import { useStore } from "../../../contexts/store";

export function Retirement() {
  const { retirement } = useStore();

  return <Graph data={retirement} />;
}
