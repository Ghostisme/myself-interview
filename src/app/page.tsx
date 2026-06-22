"use client";
import React, { useState } from "react";
import MapUI from "../components/MapUI";
import DuolingoLesson from "../components/DuolingoLesson";
import { Level } from "../data/gameData";

export default function Home() {
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);

  const handleComplete = () => {
    setCurrentLevel(null);
  };

  if (!currentLevel) {
    return <MapUI onSelectLevel={setCurrentLevel} />;
  }

  // Unified Lesson component that renders multiple challenges
  return <DuolingoLesson level={currentLevel} onComplete={handleComplete} />;
}
