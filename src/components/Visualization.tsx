import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Scene } from './Scene';
import { useGameStore } from '../store/gameStore';
import { useState, useEffect } from 'react';

export function Visualization() {
  const { numDisks, setNumDisks, start, isPlaying, reset } = useGameStore();
  const [inputValue, setInputValue] = useState(numDisks.toString());

  useEffect(() => {
    setInputValue(numDisks.toString());
  }, [numDisks]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    const parsed = parseInt(value);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 8) {
      setNumDisks(parsed);
    }
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 left-4 z-10 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <label className="text-white">Number of Disks:</label>
            <input
              type="number"
              min="1"
              max="8"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={() => {
                const parsed = parseInt(inputValue);
                if (isNaN(parsed) || parsed < 1) {
                  setInputValue('1');
                  setNumDisks(1);
                } else if (parsed > 8) {
                  setInputValue('8');
                  setNumDisks(8);
                }
              }}
              className="w-20 px-2 py-1 rounded bg-white/20 text-white"
              disabled={isPlaying}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={start}
              disabled={isPlaying}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Start
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
        <color attach="background" args={['#1a1a1a']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Scene />
        <OrbitControls />
      </Canvas>
    </div>
  );
}