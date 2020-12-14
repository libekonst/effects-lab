import { useCallback, useEffect, useRef } from "react";
import { defer, Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { useSubject } from "../useSubject";
import { Result, isFailure } from "./Result";

type Handlers<V> = {
  loading: () => void;
  success: (value: V) => void;
  failure: (err: string) => void;
};

export const handleEffect = <T>(effect: () => Observable<Result<T>>) => ({
  when(handlers: Handlers<T>) {
    const effect$ = defer(() => {
      handlers.loading();
      return effect();
    });

    const sub = effect$.subscribe((result) => {
      if (isFailure(result)) handlers.failure(result.message);
      else handlers.success(result.value);
    });

    return () => sub.unsubscribe();
  },
});

export const useObservableEffect = <T>(
  effect: () => Observable<Result<T>>,
  handlers: Handlers<T>
) => {
  // If not useRef, will re-create handlers on first loading() call, resetting the useEffect.
  const refHandlers = useRef(handlers).current;

  const subject = useSubject<"run">();
  useEffect(() => {
    const sub = subject
      .pipe(
        tap(() => refHandlers.loading()),
        switchMap(() => effect())
      )
      .subscribe((result) => {
        if (isFailure(result)) refHandlers.failure(result.message);
        else refHandlers.success(result.value);
      });

    return () => sub.unsubscribe();
  }, [effect, refHandlers, subject]);

  const runEffect = useCallback(() => subject.next("run"), [subject]);

  return runEffect;
};
