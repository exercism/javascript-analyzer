export function all<A, P extends ((...args: A[]) => boolean)>(...predicates: P[]) {
  return (...args: A[]) => predicates.every(predicate => predicate(...args))
}
