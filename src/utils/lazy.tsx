import { lazy, Suspense } from "react";

export function makeLazy<C extends React.ComponentType<any>>(
  componentLoader: () => Promise<{ default: C }>
): React.ComponentType<React.ComponentPropsWithRef<C>> {
  const LazyComponent = lazy(componentLoader);
  return (props: React.ComponentPropsWithRef<C>) => (
    <Suspense fallback={null}>
      <LazyComponent {...props} />
    </Suspense>
  );
}
