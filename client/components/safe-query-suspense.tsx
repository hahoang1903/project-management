import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

type SafeQuerySuspenseProps = {
  children: React.ReactNode;
  fallback: React.ReactNode;
  errorFallback: (props: FallbackProps) => React.ReactNode;
};

const SafeQuerySuspense = ({
  children,
  fallback,
  errorFallback,
}: SafeQuerySuspenseProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={errorFallback}>
          <Suspense fallback={fallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default SafeQuerySuspense;
