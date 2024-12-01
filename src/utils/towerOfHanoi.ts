export type Move = {
  disk: number;
  from: string;
  to: string;
};

export function solveTowerOfHanoi(n: number, source: string, auxiliary: string, target: string): Move[] {
  const moves: Move[] = [];

  function hanoi(n: number, from: string, aux: string, to: string) {
    if (n === 1) {
      moves.push({ disk: n, from, to });
      return;
    }
    hanoi(n - 1, from, to, aux);
    moves.push({ disk: n, from, to });
    hanoi(n - 1, aux, from, to);
  }

  hanoi(n, source, auxiliary, target);
  return moves;
}