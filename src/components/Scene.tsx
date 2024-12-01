import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../store/gameStore';
import { useRef } from 'react';
import { Mesh, Vector3 } from 'three';

const ROD_HEIGHT = 5;
const ROD_RADIUS = 0.1;
const BASE_WIDTH = 10;
const BASE_HEIGHT = 0.5;
const DISK_HEIGHT = 0.4;

export function Scene() {
  const { pegs, currentMove, moveProgress } = useGameStore();
  const disksRef = useRef<{ [key: number]: Mesh }>({});

  useFrame(() => {
    if (currentMove && moveProgress < 1) {
      const disk = disksRef.current[currentMove.disk];
      if (disk) {
        const startPeg = pegs[currentMove.from].position;
        const endPeg = pegs[currentMove.to].position;
        const startHeight = (pegs[currentMove.from].disks.length + 1) * DISK_HEIGHT;
        const endHeight = (pegs[currentMove.to].disks.length) * DISK_HEIGHT;
        
        const startPos = new Vector3(
          startPeg[0],
          startPeg[1] + startHeight,
          startPeg[2]
        );
        const endPos = new Vector3(
          endPeg[0],
          endPeg[1] + endHeight,
          endPeg[2]
        );
        
        // Calculate arc movement
        const midPoint = startPos.clone().lerp(endPos, 0.5);
        midPoint.y += 3; // Arc height
        
        const p1 = startPos;
        const p2 = midPoint;
        const p3 = endPos;
        
        // Quadratic Bezier curve
        const t = moveProgress;
        const pos = new Vector3();
        pos.x = Math.pow(1-t, 2) * p1.x + 2*(1-t)*t * p2.x + t*t * p3.x;
        pos.y = Math.pow(1-t, 2) * p1.y + 2*(1-t)*t * p2.y + t*t * p3.y;
        pos.z = Math.pow(1-t, 2) * p1.z + 2*(1-t)*t * p2.z + t*t * p3.z;
        
        disk.position.copy(pos);
      }
    }
  });

  return (
    <group>
      {/* Base */}
      <mesh position={[0, -ROD_HEIGHT/2 - BASE_HEIGHT/2, 0]}>
        <boxGeometry args={[BASE_WIDTH, BASE_HEIGHT, BASE_WIDTH/3]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Rods */}
      {Object.entries(pegs).map(([peg, { position }]) => (
        <mesh key={peg} position={position}>
          <cylinderGeometry args={[ROD_RADIUS, ROD_RADIUS, ROD_HEIGHT]} />
          <meshStandardMaterial color="#666" />
        </mesh>
      ))}

      {/* Disks */}
      {Object.entries(pegs).map(([peg, { position: [x, y, z], disks }]) => 
        disks.map((diskSize, index) => {
          const width = 0.5 + diskSize * 0.3;
          const diskY = y + index * DISK_HEIGHT;
          return (
            <mesh
              key={`${peg}-${diskSize}`}
              ref={(mesh) => {
                if (mesh) disksRef.current[diskSize] = mesh;
              }}
              position={[x, diskY, z]}
            >
              <cylinderGeometry args={[width, width, DISK_HEIGHT, 32]} />
              <meshStandardMaterial color={`hsl(${diskSize * 30}, 70%, 50%)`} />
            </mesh>
          );
        })
      )}
    </group>
  );
}