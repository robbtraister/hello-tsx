import { useState } from "react";

export function Counter({ right }: { right?: boolean }) {
  const [count, setCount] = useState(0);

  const inc = () => setCount((c) => c + 1);

  return (
    <div style={{ textAlign: right ? "right" : "left" }}>
      <button onClick={inc}>inc</button>: {count}
    </div>
  );
}
