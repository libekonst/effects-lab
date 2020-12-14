import { useEffect, useMemo } from "react";
import { Subject } from "rxjs";

export const useSubject = <T>(seed?: T) => {
  const subject = useMemo(() => new Subject<T>(), []);
  useEffect(() => () => subject.complete(), [subject]);

  return subject;
};
