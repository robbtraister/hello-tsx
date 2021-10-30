import React, { useState } from "react";
import { v4 } from "uuid";

export function Input({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const [id] = useState(v4);
  return (
    <>
      <input {...props} id={id} />
      <label htmlFor={id}>{label}</label>
    </>
  );
}
