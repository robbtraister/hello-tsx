import { useEffect } from "react";

import { Title } from "../title";
import { Widget } from "../widget";

export function Scene({
  title,
  children,
}: {
  children?: React.ReactNode;
  title: string;
}) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <Widget>
        <Title>{title}</Title>
      </Widget>
      {children}
    </>
  );
}
