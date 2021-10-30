export function YesScript({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <div {...props} className="yes-script">
      {children}
    </div>
  );
}
