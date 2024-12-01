export const codeExamples = {
  javascript: `// Tower of Hanoi Implementation in JavaScript
function towerOfHanoi(n, source, auxiliary, target) {
  // Base case: if only one disk, move it directly
  if (n === 1) {
    console.log(\`Move disk 1 from \${source} to \${target}\`);
    return;
  }
  
  // Move n-1 disks from source to auxiliary using target as temporary
  towerOfHanoi(n - 1, source, target, auxiliary);
  
  // Move the nth disk from source to target
  console.log(\`Move disk \${n} from \${source} to \${target}\`);
  
  // Move n-1 disks from auxiliary to target using source as temporary
  towerOfHanoi(n - 1, auxiliary, source, target);
}

// Example usage:
console.log("Solving Tower of Hanoi with 3 disks:");
towerOfHanoi(3, 'A', 'B', 'C');`,

  python: `# Tower of Hanoi Implementation in Python
def tower_of_hanoi(n, source, auxiliary, target):
    # Base case: if only one disk, move it directly
    if n == 1:
        print(f"Move disk 1 from {source} to {target}")
        return
    
    # Move n-1 disks from source to auxiliary using target as temporary
    tower_of_hanoi(n - 1, source, target, auxiliary)
    
    # Move the nth disk from source to target
    print(f"Move disk {n} from {source} to {target}")
    
    # Move n-1 disks from auxiliary to target using source as temporary
    tower_of_hanoi(n - 1, auxiliary, source, target)

# Example usage:
print("Solving Tower of Hanoi with 3 disks:")
tower_of_hanoi(3, 'A', 'B', 'C')`,

  cpp: `// Tower of Hanoi Implementation in C++
#include <iostream>
using namespace std;

void towerOfHanoi(int n, char source, char auxiliary, char target) {
    // Base case: if only one disk, move it directly
    if (n == 1) {
        cout << "Move disk 1 from " << source << " to " << target << endl;
        return;
    }
    
    // Move n-1 disks from source to auxiliary using target as temporary
    towerOfHanoi(n - 1, source, target, auxiliary);
    
    // Move the nth disk from source to target
    cout << "Move disk " << n << " from " << source << " to " << target << endl;
    
    // Move n-1 disks from auxiliary to target using source as temporary
    towerOfHanoi(n - 1, auxiliary, source, target);
}

int main() {
    cout << "Solving Tower of Hanoi with 3 disks:" << endl;
    towerOfHanoi(3, 'A', 'B', 'C');
    return 0;
}`
} as const;