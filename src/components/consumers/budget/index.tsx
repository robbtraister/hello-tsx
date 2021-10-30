import { Pie } from "src/components/presentational/pie";
import { useStore } from "src/contexts/store";

export function Budget() {
  const { budget } = useStore();

  return <Pie data={budget} />;
}
