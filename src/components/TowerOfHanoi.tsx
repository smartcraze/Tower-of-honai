import React from 'react';
import { Visualization } from './Visualization';
import { Information } from './Information';

export function TowerOfHanoi() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-900">
      <div className="h-[60vh]">
        <Visualization />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Information />
      </div>
    </div>
  );
}