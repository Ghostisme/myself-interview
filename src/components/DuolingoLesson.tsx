"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Level, Challenge } from '../data/gameData';

export default function DuolingoLesson({ level, onComplete }: { level: Level, onComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  
  const challenge = level.challenges[currentIndex];

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  const handleNext = () => {
    setFeedback(null);
    if (currentIndex < level.challenges.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); 
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'en-US';
      msg.rate = 0.9; 

      const voices = window.speechSynthesis.getVoices();
      const preferredVoices = [
        "Google US English",
        "Microsoft Zira",
        "Samantha",
        "Karen"
      ];

      let selectedVoice = null;
      for (const name of preferredVoices) {
        selectedVoice = voices.find(v => v.name.includes(name));
        if (selectedVoice) break;
      }

      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang.startsWith('en-US') && v.name.includes('Female')) 
                     || voices.find(v => v.lang.startsWith('en'));
      }

      if (selectedVoice) {
        msg.voice = selectedVoice;
      }

      window.speechSynthesis.speak(msg);
    }
  };

  const checkAnswer = (isCorrect: boolean) => {
    setFeedback(isCorrect ? 'success' : 'error');
    if (isCorrect && challenge.type !== 'speak' && challenge.type !== 'interview_qa' && challenge.audioText) {
      playAudio(challenge.audioText || challenge.answer);
    }
  };

  const progress = ((currentIndex) / level.challenges.length) * 100;

  return (
    <div className="flex flex-col items-center p-4 sm:p-8 bg-slate-900 min-h-screen text-slate-100 w-full overflow-x-hidden">
      <div className="w-full max-w-2xl mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4 px-2">
        <button onClick={onComplete} className="text-slate-400 hover:text-white text-2xl font-bold p-2 active:scale-90 transition-transform">✕</button>
        <div className="flex-1 h-3 sm:h-4 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-emerald-400 text-center w-full max-w-2xl px-2">
        {challenge.prompt}
      </h2>

      <div className="flex-1 w-full max-w-2xl flex flex-col items-center px-2">
        {challenge.type === 'multiple_choice' && (
          <MultipleChoiceChallenge challenge={challenge} onCheck={checkAnswer} onPlay={() => playAudio(challenge.audioText || '')} />
        )}
        {challenge.type === 'listen_type' && (
          <ListenTypeChallenge challenge={challenge} onCheck={checkAnswer} onPlay={() => playAudio(challenge.audioText || '')} />
        )}
        {challenge.type === 'translate_blocks' && (
          <TranslateBlocksChallenge challenge={challenge} onCheck={checkAnswer} onPlayWord={playAudio} />
        )}
        {challenge.type === 'speak' && (
          <SpeakChallenge challenge={challenge} onCheck={checkAnswer} onPlay={() => playAudio(challenge.audioText || '')} />
        )}
        {challenge.type === 'interview_qa' && (
          <InterviewQaChallenge challenge={challenge} onCheck={checkAnswer} onPlay={() => playAudio(challenge.audioText || '')} />
        )}
      </div>

      {feedback && (
        <div className={`w-full max-w-2xl mt-6 sm:mt-8 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-4 ${feedback === 'success' ? 'bg-emerald-900/50 border-2 border-emerald-500' : 'bg-red-900/50 border-2 border-red-500'}`}>
          <div className="flex-1 text-center sm:text-left">
            <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${feedback === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
              {feedback === 'success' ? '🎉 太棒了！' : '❌ 还需要再练习一下'}
            </h3>
            {feedback === 'error' && (
              <p className="text-sm sm:text-base text-slate-300">
                正确答案是: <span className="font-bold text-white">{challenge.answer}</span>
              </p>
            )}
          </div>
          <button 
            onClick={handleNext}
            className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-lg text-white shadow-lg active:scale-95 transition-transform ${feedback === 'success' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-red-600 hover:bg-red-500'}`}
          >
            继续 ➡️
          </button>
        </div>
      )}
    </div>
  );
}

function MultipleChoiceChallenge({ challenge, onCheck, onPlay }: { challenge: Challenge, onCheck: (c: boolean) => void, onPlay: () => void }) {
  useEffect(() => {
    onPlay();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge.id]);

  return (
    <div className="w-full flex flex-col gap-4">
      <button onClick={onPlay} className="self-center mb-6 sm:mb-8 w-20 h-20 sm:w-24 sm:h-24 bg-blue-600 hover:bg-blue-500 active:scale-90 transition-transform rounded-full text-3xl sm:text-4xl shadow-lg flex items-center justify-center">
        🔊
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {challenge.options?.map((opt, i) => (
          <button 
            key={i}
            onClick={() => onCheck(opt === challenge.answer)}
            className="p-4 sm:p-6 bg-slate-800 border-2 border-slate-600 hover:border-blue-500 active:bg-slate-700 rounded-xl sm:rounded-2xl text-base sm:text-lg font-medium text-slate-200 transition-all text-center"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function ListenTypeChallenge({ challenge, onCheck, onPlay }: { challenge: Challenge, onCheck: (c: boolean) => void, onPlay: () => void }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    onPlay();
    setInput("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge.id]);

  return (
    <div className="w-full flex flex-col items-center gap-4 sm:gap-6">
      <button onClick={onPlay} className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-600 hover:bg-blue-500 active:scale-90 transition-transform rounded-full text-3xl sm:text-4xl shadow-lg flex items-center justify-center">
        🔊
      </button>
      <textarea 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full bg-slate-800 border-2 border-slate-600 p-3 sm:p-4 rounded-xl text-base sm:text-lg text-white focus:outline-none focus:border-blue-500 min-h-[100px]"
        placeholder="Type what you hear... (请在这里打字)"
      />
      <button 
        onClick={() => onCheck(input.trim().toLowerCase() === challenge.answer.toLowerCase())}
        className="w-full py-3 sm:py-4 bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-transform rounded-xl font-bold text-base sm:text-lg shadow-lg"
      >
        检查答案
      </button>
    </div>
  );
}

function TranslateBlocksChallenge({ challenge, onCheck, onPlayWord }: { challenge: Challenge, onCheck: (c: boolean) => void, onPlayWord: (text: string) => void }) {
  const [shuffledBlocks, setShuffledBlocks] = useState<string[]>([]);
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);

  useEffect(() => {
    if(challenge.blocks) {
      const b = [...challenge.blocks];
      b.sort(() => Math.random() - 0.5);
      setShuffledBlocks(b);
      setSelectedBlocks([]);
    }
  }, [challenge]);

  const handleSelect = (b: string) => {
    onPlayWord(b); 
    setSelectedBlocks([...selectedBlocks, b]);
    setShuffledBlocks(shuffledBlocks.filter(x => x !== b));
  };
  const handleRemove = (b: string) => {
    setShuffledBlocks([...shuffledBlocks, b]);
    setSelectedBlocks(selectedBlocks.filter(x => x !== b));
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full min-h-[120px] border-b-2 border-slate-600 mb-6 flex flex-wrap gap-2 sm:gap-3 pb-4 items-end">
        {selectedBlocks.map((b, i) => (
          <button key={i} onClick={() => handleRemove(b)} className="px-3 py-2 sm:px-4 sm:py-2 bg-slate-700 text-white rounded-lg border border-slate-500 active:scale-95 text-sm sm:text-base shadow-sm">
            {b}
          </button>
        ))}
      </div>
      <div className="w-full flex flex-wrap gap-2 sm:gap-3 mb-6 justify-center">
        {shuffledBlocks.map((b, i) => (
          <button key={i} onClick={() => handleSelect(b)} className="px-3 py-2 sm:px-4 sm:py-2 bg-slate-800 text-slate-300 rounded-lg border border-slate-600 active:scale-95 text-sm sm:text-base shadow-sm">
            {b}
          </button>
        ))}
      </div>
      <button 
        onClick={() => onCheck(selectedBlocks.join(" ") === (challenge.blocks || []).join(" "))}
        className="w-full py-3 sm:py-4 bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-transform rounded-xl font-bold text-base sm:text-lg shadow-lg"
      >
        检查连招
      </button>
    </div>
  );
}

function SpeakChallenge({ challenge, onCheck, onPlay }: { challenge: Challenge, onCheck: (c: boolean) => void, onPlay: () => void }) {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [hasSupport, setHasSupport] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const r = new SpeechRecognition();
      r.continuous = true;
      r.interimResults = true;
      r.lang = 'en-US';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      r.onresult = (e: any) => {
        let finalTranscript = '';
        for (let i = e.resultIndex; i < e.results.length; ++i) {
          if (e.results[i].isFinal) finalTranscript += e.results[i][0].transcript;
        }
        if (finalTranscript) setTranscript(prev => (prev + " " + finalTranscript).trim());
      };
      r.onerror = () => setIsRecording(false);
      r.onend = () => setIsRecording(false);
      recognitionRef.current = r;
      setHasSupport(true);
    } else {
      setHasSupport(false);
    }
    setTranscript("");
  }, [challenge.id]);

  const toggle = () => {
    if (!hasSupport) return;
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setTranscript("");
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 sm:gap-6">
      <div className="text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-4 text-center">&quot;{challenge.answer}&quot;</div>
      <button onClick={onPlay} className="px-4 py-2 sm:px-6 sm:py-2 bg-slate-700 hover:bg-slate-600 active:scale-95 transition-transform rounded-lg text-sm sm:text-base">🔊 听示范</button>
      
      <textarea 
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        className="w-full bg-slate-800 border border-slate-600 p-3 sm:p-4 rounded-xl text-base text-white focus:outline-none focus:border-blue-500 min-h-[100px] mt-2"
        placeholder="点击下方麦克风开始朗读... (⚠️提示：如果识别错了，你可以直接点这里手动打字修改！)"
      />

      <button 
        onClick={toggle}
        disabled={!hasSupport}
        className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full text-3xl sm:text-4xl shadow-lg flex items-center justify-center transition-all ${!hasSupport ? 'bg-slate-700 opacity-50 cursor-not-allowed' : isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-600 hover:bg-blue-500 active:scale-90'}`}
      >
        🎤
      </button>

      {!hasSupport && (
        <p className="text-yellow-500 text-xs sm:text-sm text-center px-4 mt-2">
          ⚠️ 当前浏览器(如微信/部分手机)不支持语音识别。<br/>请直接在上方输入框打字，或使用 Chrome/Safari 浏览器。
        </p>
      )}

      {!isRecording && transcript && (
        <button 
          onClick={() => {
            const targetWords = challenge.answer.toLowerCase().replace(/[^a-z0-9 ]/g,'').split(' ').filter(Boolean);
            const transcriptWords = transcript.toLowerCase().replace(/[^a-z0-9 ]/g,'').split(' ').filter(Boolean);
            const matches = targetWords.filter(w => transcriptWords.includes(w));
            onCheck(matches.length >= targetWords.length * 0.5);
          }}
          className="w-full py-3 sm:py-4 bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-transform rounded-xl font-bold text-base sm:text-lg shadow-lg mt-2"
        >
          提交语音
        </button>
      )}
    </div>
  );
}

function InterviewQaChallenge({ challenge, onCheck, onPlay }: { challenge: Challenge, onCheck: (c: boolean) => void, onPlay: () => void }) {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [hasSupport, setHasSupport] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const r = new SpeechRecognition();
      r.continuous = true;
      r.interimResults = true;
      r.lang = 'en-US';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      r.onresult = (e: any) => {
        let finalTranscript = '';
        for (let i = e.resultIndex; i < e.results.length; ++i) {
          if (e.results[i].isFinal) finalTranscript += e.results[i][0].transcript;
        }
        if (finalTranscript) setTranscript(prev => (prev + " " + finalTranscript).trim());
      };
      r.onerror = () => setIsRecording(false);
      r.onend = () => setIsRecording(false);
      recognitionRef.current = r;
      setHasSupport(true);
    } else {
      setHasSupport(false);
    }
    setTranscript("");
  }, [challenge.id]);

  const toggle = () => {
    if (!hasSupport) return;
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setTranscript("");
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 sm:gap-6">
      <div className="w-full bg-slate-800 p-4 sm:p-6 rounded-2xl flex gap-3 sm:gap-4 items-start border border-slate-700">
        <div className="text-3xl sm:text-4xl">🧑‍💼</div>
        <div className="flex-1">
          <p className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-slate-200">&quot;{challenge.prompt}&quot;</p>
          <button onClick={onPlay} className="px-3 py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 transition-transform rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2">
            🔊 听问题
          </button>
        </div>
      </div>

      <textarea 
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        className="w-full bg-slate-800 border border-slate-600 p-3 sm:p-4 rounded-xl text-base text-white focus:outline-none focus:border-blue-500 min-h-[120px]"
        placeholder="点击麦克风录音... (⚠️提示：如果麦克风不可用或识别有误，请直接在此处手动打字！)"
      />

      <button 
        onClick={toggle}
        disabled={!hasSupport}
        className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full text-3xl sm:text-4xl shadow-lg flex items-center justify-center transition-all ${!hasSupport ? 'bg-slate-700 opacity-50 cursor-not-allowed' : isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-600 hover:bg-blue-500 active:scale-90'}`}
      >
        🎤
      </button>

      {!hasSupport && (
        <p className="text-yellow-500 text-xs sm:text-sm text-center px-4 mt-2">
          ⚠️ 当前浏览器/环境不支持语音识别，请直接在上方打字。
        </p>
      )}

      {(!isRecording && transcript) || !hasSupport ? (
        <button 
          onClick={() => {
            const keywords = challenge.answer.split(' ');
            const t = transcript.toLowerCase();
            const hits = keywords.filter(kw => t.includes(kw));
            onCheck(hits.length >= Math.max(1, keywords.length - 1)); 
          }}
          className="w-full py-3 sm:py-4 bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-transform rounded-xl font-bold text-base sm:text-lg shadow-lg mt-2"
        >
          提交反击
        </button>
      ) : null}
    </div>
  );
}
