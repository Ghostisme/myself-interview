"use client";
import React from 'react';
import { Level, gameData } from '../data/gameData';

export default function MapUI({ onSelectLevel }: { onSelectLevel: (level: Level) => void }) {
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8 font-mono pb-20 selection:bg-yellow-400 selection:text-black">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 mt-4">
          <h1 className="text-4xl sm:text-5xl font-black text-yellow-400 drop-shadow-[4px_4px_0_rgba(220,38,38,1)] tracking-widest mb-2 border-y-4 border-dashed border-slate-600 py-4">
            INTERVIEW QUEST
          </h1>
          <p className="text-slate-400 mt-4 text-sm sm:text-base animate-pulse">PRESS START TO BEGIN YOUR CAREER JOURNEY</p>
        </div>

        {/* Player Stats Box */}
        <div className="bg-blue-950 border-4 border-white p-4 sm:p-6 mb-8 shadow-[8px_8px_0_0_rgba(255,255,255,0.2)]">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="text-6xl sm:text-7xl bg-black border-4 border-white p-2 shadow-[inset_0_0_10px_rgba(0,0,0,1)]">🧙‍♂️</div>
            <div className="flex-1 w-full">
              <div className="flex justify-between items-end mb-2 border-b-2 border-slate-500 pb-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 tracking-wider">RICH</h2>
                <span className="text-slate-300">Lv. 99</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 mb-4">CLASS: AI FULLSTACK WIZARD</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold w-6 text-red-400">HP</p>
                  <div className="flex-1 bg-black h-4 border-2 border-white p-[1px]">
                    <div className="bg-red-500 h-full w-full"></div>
                  </div>
                  <p className="text-xs w-10 text-right">999</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold w-6 text-blue-400">MP</p>
                  <div className="flex-1 bg-black h-4 border-2 border-white p-[1px]">
                    <div className="bg-blue-500 h-full w-full"></div>
                  </div>
                  <p className="text-xs w-10 text-right">999</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quest Board */}
        <div className="bg-black border-4 border-yellow-600 p-4 sm:p-6 shadow-[8px_8px_0_0_rgba(180,83,9,1)]">
          <h2 className="text-xl sm:text-2xl text-center text-yellow-500 mb-6 font-bold tracking-widest">- SELECT DUNGEON -</h2>
          <div className="flex flex-col gap-4">
            {gameData.levels.map((level, index) => (
              <button 
                key={level.id}
                onClick={() => onSelectLevel(level)}
                className="group bg-slate-900 border-2 border-white p-3 sm:p-4 text-left hover:bg-white hover:text-black transition-colors active:translate-y-1 active:shadow-none shadow-[4px_4px_0_0_rgba(255,255,255,1)] flex items-center gap-4"
              >
                <div className="text-3xl sm:text-4xl w-12 text-center group-hover:animate-bounce">
                  {index === 0 ? '🗡️' : index === gameData.levels.length - 1 ? '🐉' : '📜'}
                </div>
                <div className="flex-1 border-l-2 border-dashed border-slate-500 pl-4 group-hover:border-slate-300">
                  <h3 className="font-bold text-base sm:text-lg group-hover:text-black text-yellow-400 uppercase">{level.title}</h3>
                  <p className="text-xs sm:text-sm group-hover:text-slate-800 text-slate-400 mt-1">{level.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}