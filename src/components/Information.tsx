import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { useGameStore } from '../store/gameStore';
import { codeExamples } from '../utils/codeExamples';

const languageMap = {
  javascript: 'javascript',
  python: 'python',
  cpp: 'cpp'
} as const;

export function Information() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const { numDisks, moves, currentMoveIndex } = useGameStore();
  
  const totalMoves = Math.pow(2, numDisks) - 1;

  return (
    <div className="p-8 bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Algorithm Analysis Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Algorithm Analysis</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-400">Time Complexity</h3>
                <p className="text-gray-300">O(2ⁿ) - Exponential time complexity</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400">Space Complexity</h3>
                <p className="text-gray-300">O(n) - Linear space complexity due to recursion stack</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400">Formula</h3>
                <p className="text-gray-300">Total moves = 2ⁿ - 1, where n is the number of disks</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400">Current Progress</h3>
                <p className="text-gray-300">
                  Move {currentMoveIndex} of {totalMoves}
                  <span className="ml-2 text-sm">
                    ({((currentMoveIndex / totalMoves) * 100).toFixed(1)}%)
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Moves History Section */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Moves History</h2>
            <div className="h-[calc(100%-2rem)] overflow-y-auto rounded">
              {moves.slice(0, currentMoveIndex + 1).map((move, index) => (
                <div 
                  key={index} 
                  className={`mb-2 p-2 rounded ${
                    index === currentMoveIndex 
                      ? 'bg-blue-500/20 text-blue-300 border-l-4 border-blue-500' 
                      : 'text-gray-300'
                  }`}
                >
                  Move disk {move.disk} from {move.from} to {move.to}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Code Implementation Section */}
        <div className="bg-gray-900 p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-2xl font-bold">Implementation</h2>
            <div className="flex gap-2">
              {Object.keys(codeExamples).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedLanguage === lang
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[400px] rounded-lg overflow-hidden border border-gray-700">
            <Editor
              height="100%"
              defaultLanguage={languageMap[selectedLanguage]}
              value={codeExamples[selectedLanguage]}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                wrappingIndent: 'indent',
                lineNumbers: 'on',
                renderLineHighlight: 'all',
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}