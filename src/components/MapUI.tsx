"use client";
import React from 'react';
import { gameData, Level } from '../data/gameData';

export default function MapUI({ onSelectLevel }: { onSelectLevel: (level: Level) => void }) {
  return (
    <div className="flex flex-col items-center p-8 bg-slate-900 min-h-screen text-slate-100">
      <h1 className="text-4xl font-bold mb-4 text-emerald-400">⚔️ AI 面试通关大挑战</h1>
      <p className="mb-12 text-slate-400">化身 AI 全栈工程师，击败英语面试官！</p>
      
      <div className="relative flex flex-col items-center w-full max-w-md gap-8">
        {gameData.levels.map((level, index) => (
          <div key={level.id} className="relative flex flex-col items-center w-full group">
            {/* Connection Line */}
            {index !== gameData.levels.length - 1 && (
              <div className="absolute w-2 h-16 bg-slate-700 -bottom-12 z-0" />
            )}
            
            <button 
              onClick={() => onSelectLevel(level)}
              className="z-10 bg-slate-800 border-4 border-emerald-500 rounded-full w-24 h-24 flex items-center justify-center text-3xl hover:bg-emerald-600 hover:scale-110 transition-all shadow-[0_0_15px_rgba(16,185,129,0.5)]"
            >
              {index === 0 ? '🗡️' : index === gameData.levels.length - 1 ? '🐉' : '🔥'}
            </button>
            <div className="mt-4 text-center">
              <h3 className="font-bold text-lg text-emerald-300">{level.title}</h3>
              <p className="text-sm text-slate-400">{level.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
