import { of, timer } from "rxjs";
import { catchError, debounceTime, mapTo, tap } from "rxjs/operators";
import { createSuccess, createFailure } from "./lib/Result";

export const mockService = () => {
  return timer(3000).pipe(
    mapTo(createSuccess(123)),
    tap(() => {
      if (Math.random() > 0.5) throw new Error();
    }),
    catchError(() => of(createFailure("something went wrong")))
  );
};
