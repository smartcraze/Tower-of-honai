import React from 'react';

export function Guide() {
  return (
    <div className="absolute top-4 right-4 z-10 bg-white/10 p-6 rounded-lg backdrop-blur-sm text-white max-w-md">
      <h2 className="text-xl font-bold mb-4">Tower of Hanoi Guide</h2>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Formula</h3>
        <p className="mb-2">Number of moves required: 2ⁿ - 1</p>
        <p>where n is the number of disks</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Example Calculations</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>1 disk: 2¹ - 1 = 1 move</li>
          <li>2 disks: 2² - 1 = 3 moves</li>
          <li>3 disks: 2³ - 1 = 7 moves</li>
          <li>4 disks: 2⁴ - 1 = 15 moves</li>
        </ul>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">JavaScript Implementation</h3>
          <pre className="bg-gray-800 p-3 rounded-md overflow-x-auto">
            <code className="text-sm text-white">{`function towerOfHanoi(n, source, auxiliary, target) {
  if (n === 1) {
    console.log(\`Move disk 1 from \${source} to \${target}\`);
    return;
  }
  towerOfHanoi(n - 1, source, target, auxiliary);
  console.log(\`Move disk \${n} from \${source} to \${target}\`);
  towerOfHanoi(n - 1, auxiliary, source, target);
}`}</code>
          </pre>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Python Implementation</h3>
          <pre className="bg-gray-800 p-3 rounded-md overflow-x-auto">
            <code className="text-sm text-white">{`def tower_of_hanoi(n, source, auxiliary, target):
    if n == 1:
        print(f"Move disk 1 from {source} to {target}")
        return
    tower_of_hanoi(n - 1, source, target, auxiliary)
    print(f"Move disk {n} from {source} to {target}")
    tower_of_hanoi(n - 1, auxiliary, source, target)`}</code>
          </pre>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">C++ Implementation</h3>
          <pre className="bg-gray-800 p-3 rounded-md overflow-x-auto">
            <code className="text-sm text-white">{`void towerOfHanoi(int n, char source, char auxiliary, char target) {
    if (n == 1) {
        cout << "Move disk 1 from " << source << " to " << target << endl;
        return;
    }
    towerOfHanoi(n - 1, source, target, auxiliary);
    cout << "Move disk " << n << " from " << source << " to " << target << endl;
    towerOfHanoi(n - 1, auxiliary, source, target);
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}