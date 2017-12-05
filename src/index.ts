import { Observable } from './types';

export type ObservableResult = { values: any[] } | { error: any };

/**
 * Waits for a collection of observables to _close_ (finish in success _or_ error).
 *
 * Returns any errors encountered, as well as values (as an array of results from `next`),
 * in the same order as the observables were given.
 */
export default function waitForObservables(...observables: Observable[]): Promise<ObservableResult[]> {
  return new Promise(resolve => {
    if (!observables.length) {
      throw new Error(`waitFor must be given at least one observable`);
    }

    const results: ObservableResult[] = [];
    let numFinished = 0;
    function markOneFinished(index: number, result: ObservableResult) {
      numFinished += 1;
      results[index] = result;

      if (numFinished < observables.length) return;
      resolve(results);
    }

    observables.forEach((observable, index) => {
      const values: any[] = [];
      observable.subscribe({
        next(value: any) {
          values.push(value);
        },
        complete() {
          markOneFinished(index, { values });
        },
        error(error: any) {
          markOneFinished(index, { error });
        },
      });
    });
  });
}
