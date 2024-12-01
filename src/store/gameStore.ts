import { create } from 'zustand';
import { solveTowerOfHanoi, Move } from '../utils/towerOfHanoi';

interface GameState {
  numDisks: number;
  pegs: {
    [key: string]: {
      position: [number, number, number];
      disks: number[];
    };
  };
  moves: Move[];
  currentMoveIndex: number;
  currentMove: Move | null;
  moveProgress: number;
  isPlaying: boolean;
  setNumDisks: (n: number) => void;
  start: () => void;
  reset: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  numDisks: 3,
  pegs: {
    A: {
      position: [-4, -2.25, 0],
      disks: [3, 2, 1]
    },
    B: {
      position: [0, -2.25, 0],
      disks: []
    },
    C: {
      position: [4, -2.25, 0],
      disks: []
    }
  },
  moves: [],
  currentMoveIndex: 0,
  currentMove: null,
  moveProgress: 0,
  isPlaying: false,

  setNumDisks: (n) => set((state) => ({
    numDisks: n,
    pegs: {
      A: {
        position: [-4, -2.25, 0],
        disks: Array.from({ length: n }, (_, i) => n - i)
      },
      B: {
        position: [0, -2.25, 0],
        disks: []
      },
      C: {
        position: [4, -2.25, 0],
        disks: []
      }
    }
  })),

  start: () => {
    const { numDisks } = get();
    const moves = solveTowerOfHanoi(numDisks, 'A', 'B', 'C');
    set({ moves, isPlaying: true, currentMoveIndex: 0, currentMove: moves[0] });
    
    const animate = () => {
      const state = get();
      if (!state.isPlaying) return;

      if (state.currentMoveIndex >= state.moves.length) {
        set({ isPlaying: false });
        return;
      }

      const progress = state.moveProgress + 0.02;
      if (progress >= 1) {
        // Update peg states when move is complete
        const currentMove = state.moves[state.currentMoveIndex];
        const newPegs = { ...state.pegs };
        const disk = newPegs[currentMove.from].disks.pop()!;
        newPegs[currentMove.to].disks.push(disk);

        set((state) => ({
          pegs: newPegs,
          currentMoveIndex: state.currentMoveIndex + 1,
          moveProgress: 0,
          currentMove: state.moves[state.currentMoveIndex + 1] || null
        }));
      } else {
        set({
          moveProgress: progress,
          currentMove: state.moves[state.currentMoveIndex]
        });
      }

      requestAnimationFrame(animate);
    };

    animate();
  },

  reset: () => {
    const { numDisks } = get();
    set({
      pegs: {
        A: {
          position: [-4, -2.25, 0],
          disks: Array.from({ length: numDisks }, (_, i) => numDisks - i)
        },
        B: {
          position: [0, -2.25, 0],
          disks: []
        },
        C: {
          position: [4, -2.25, 0],
          disks: []
        }
      },
      currentMoveIndex: 0,
      currentMove: null,
      moveProgress: 0,
      isPlaying: false,
      moves: []
    });
  }
}));