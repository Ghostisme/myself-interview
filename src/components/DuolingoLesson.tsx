"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Level, Challenge } from '../data/gameData';

export default function DuolingoLesson({ level, onComplete }: { level: Level, onComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [playerHp, setPlayerHp] = useState(100);
  
  const challenge = level.challenges[currentIndex];
  const maxTurns = level.challenges.length;
  const enemyHpPercent = ((maxTurns - currentIndex) / maxTurns) * 100;

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
    if (isCorrect) {
      setFeedback('success');
      if (challenge.type !== 'speak' && challenge.type !== 'interview_qa' && challenge.audioText) {
        playAudio(challenge.audioText || challenge.answer);
      }
    } else {
      setFeedback('error');
      setPlayerHp(prev => Math.max(10, prev - 20)); // Lose HP
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8 font-mono pb-32">
      <div className="max-w-4xl mx-auto">
        
        {/* Header bar / Quit */}
        <div className="flex justify-between items-center mb-6 sm:mb-8 border-b-4 border-double border-slate-600 pb-4">
          <button onClick={onComplete} className="text-yellow-400 hover:text-white uppercase active:translate-y-1">{'< Flee Battle'}</button>
          <span className="text-slate-400 uppercase tracking-widest bg-slate-900 px-3 py-1 border border-slate-700">TURN {currentIndex + 1} / {maxTurns}</span>
        </div>

        {/* Enemy Area */}
        <div className="flex justify-end items-end w-full mb-6 relative">
          <div className="bg-blue-950 border-4 border-white p-3 w-48 sm:w-64 relative shadow-[4px_4px_0_0_rgba(255,255,255,0.2)]">
            <div className="absolute -top-3 -left-3 bg-red-600 text-white text-xs px-2 border-2 border-white tracking-widest font-bold">BOSS</div>
            <h3 className="text-lg sm:text-xl font-bold truncate text-red-300 uppercase">Interviewer</h3>
            <div className="w-full bg-black h-3 sm:h-4 mt-2 border-2 border-white p-[1px]">
              <div className="bg-red-500 h-full transition-all duration-300" style={{ width: `${enemyHpPercent}%` }} />
            </div>
            <p className="text-right text-xs mt-1 text-slate-300">HP</p>
          </div>
          <div className={`text-6xl sm:text-8xl ml-4 sm:ml-6 drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] ${feedback === 'success' ? 'animate-bounce grayscale' : 'animate-pulse'}`}>
            🧛‍♂️
          </div>
        </div>

        {/* Player Area */}
        <div className="flex justify-start items-end w-full mb-8 relative">
          <div className={`text-6xl sm:text-8xl mr-4 sm:mr-6 drop-shadow-[0_0_15px_rgba(0,255,0,0.8)] ${feedback === 'error' ? 'animate-ping grayscale' : ''}`}>
            🧙‍♂️
          </div>
          <div className="bg-blue-950 border-4 border-white p-3 w-48 sm:w-64 relative shadow-[4px_4px_0_0_rgba(255,255,255,0.2)]">
            <div className="absolute -top-3 -right-3 bg-green-600 text-white text-xs px-2 border-2 border-white tracking-widest font-bold">YOU</div>
            <h3 className="text-lg sm:text-xl font-bold truncate text-yellow-400 uppercase">Rich</h3>
            <div className="w-full bg-black h-3 sm:h-4 mt-2 border-2 border-white p-[1px]">
              <div className={`bg-green-500 h-full transition-all duration-300 ${playerHp <= 30 ? 'bg-red-500 animate-pulse' : ''}`} style={{ width: `${playerHp}%` }} />
            </div>
            <p className="text-right text-xs mt-1 text-slate-300">HP</p>
          </div>
        </div>

        {/* Dialog Box */}
        <div className="bg-black border-4 border-white p-4 sm:p-6 w-full mb-8 shadow-[6px_6px_0_0_rgba(255,255,255,1)] relative">
          <div className="absolute -top-4 left-6 bg-black px-2 text-blue-300 text-sm">BATTLE LOG</div>
          <p className="text-slate-400 mb-4 text-xs sm:text-sm uppercase tracking-widest animate-pulse">&gt; The Interviewer casts a spell...</p>
          <p className="text-lg sm:text-2xl text-yellow-400 font-bold leading-relaxed">
            &quot;{challenge.prompt}&quot;
          </p>
        </div>

        {/* Action / Command Menu */}
        <div className="w-full bg-slate-900 border-4 border-double border-slate-500 p-4 sm:p-6">
          <p className="text-center text-slate-400 mb-6 uppercase tracking-widest text-sm">- CHOOSE YOUR ACTION -</p>
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
      </div>

      {/* Feedback Modal (Overlay) */}
      {feedback && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className={`w-full max-w-lg p-6 sm:p-8 border-4 shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-black ${feedback === 'success' ? 'border-green-400' : 'border-red-500'}`}>
            <h3 className={`text-3xl sm:text-4xl font-black mb-4 uppercase text-center ${feedback === 'success' ? 'text-green-400 drop-shadow-[2px_2px_0_rgba(255,255,255,1)]' : 'text-red-500 drop-shadow-[2px_2px_0_rgba(255,255,255,1)]'}`}>
              {feedback === 'success' ? 'CRITICAL HIT!' : 'ATTACK MISSED!'}
            </h3>
            {feedback === 'error' && (
              <div className="bg-slate-900 border-2 border-slate-600 p-4 mt-4 mb-6">
                <p className="text-slate-400 text-xs uppercase mb-2">CORRECT SPELL WAS:</p>
                <p className="font-bold text-white text-lg">{challenge.answer}</p>
              </div>
            )}
            <button 
              onClick={handleNext}
              className={`w-full py-4 border-4 border-white font-bold text-xl text-white uppercase active:translate-y-1 active:shadow-none shadow-[4px_4px_0_0_rgba(255,255,255,1)] ${feedback === 'success' ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'}`}
            >
              {feedback === 'success' ? 'CONTINUE >' : 'TRY AGAIN >'}
            </button>
          </div>
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
    <div className="w-full flex flex-col gap-6">
      <button onClick={onPlay} className="self-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-800 border-2 border-white hover:bg-blue-600 active:translate-y-1 active:shadow-none shadow-[4px_4px_0_0_rgba(255,255,255,1)] flex items-center justify-center text-2xl sm:text-3xl transition-all">
        🔊
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {challenge.options?.map((opt, i) => (
          <button 
            key={i}
            onClick={() => onCheck(opt === challenge.answer)}
            className="p-4 bg-black border-2 border-slate-400 hover:border-white hover:bg-white hover:text-black active:translate-y-1 active:shadow-none shadow-[4px_4px_0_0_rgba(255,255,255,0.5)] text-base sm:text-lg font-bold transition-all text-center uppercase"
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
    <div className="w-full flex flex-col items-center gap-6">
      <button onClick={onPlay} className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-800 border-2 border-white hover:bg-blue-600 active:translate-y-1 active:shadow-none shadow-[4px_4px_0_0_rgba(255,255,255,1)] flex items-center justify-center text-2xl sm:text-3xl transition-all">
        🔊
      </button>
      <textarea 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full bg-black border-4 border-slate-500 p-4 text-base sm:text-lg text-white focus:outline-none focus:border-yellow-400 min-h-[100px] shadow-[inset_0_0_10px_rgba(0,0,0,1)]"
        placeholder="> TYPE YOUR SPELL HERE..."
      />
      <button 
        onClick={() => onCheck(input.trim().toLowerCase() === challenge.answer.toLowerCase())}
        className="w-full py-4 bg-red-700 border-4 border-white hover:bg-red-600 active:translate-y-1 active:shadow-none shadow-[4px_4px_0_0_rgba(255,255,255,1)] font-bold text-lg uppercase tracking-widest text-white transition-all"
      >
        EXECUTE SPELL
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
      <div className="w-full min-h-[120px] bg-black border-4 border-dashed border-slate-600 mb-6 p-4 flex flex-wrap gap-2 items-start content-start shadow-[inset_0_0_10px_rgba(0,0,0,1)]">
        {selectedBlocks.map((b, i) => (
          <button key={i} onClick={() => handleRemove(b)} className="px-3 py-2 bg-blue-900 text-white border-2 border-white hover:bg-red-900 active:translate-y-1 shadow-[2px_2px_0_0_rgba(255,255,255,1)] text-sm sm:text-base">
            {b}
          </button>
        ))}
      </div>
      <div className="w-full flex flex-wrap gap-2 mb-8 justify-center">
        {shuffledBlocks.map((b, i) => (
          <button key={i} onClick={() => handleSelect(b)} className="px-3 py-2 bg-slate-800 text-slate-300 border-2 border-slate-500 hover:bg-white hover:text-black hover:border-white active:translate-y-1 shadow-[2px_2px_0_0_rgba(255,255,255,0.5)] text-sm sm:text-base transition-colors">
            {b}
          </button>
        ))}
      </div>
      <button 
        onClick={() => onCheck(selectedBlocks.join(" ") === (challenge.blocks || []).join(" "))}
        className="w-full py-4 bg-red-700 border-4 border-white hover:bg-red-600 active:translate-y-1 active:shadow-none shadow-[4px_4px_0_0_rgba(255,255,255,1)] font-bold text-lg uppercase tracking-widest text-white transition-all"
      >
        EXECUTE SPELL
      </button>
    </div>
  );
}

// 添加这些类型定义在文件开头，解决 ts-eslint 报错
interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    length: number;
    [key: number]: {
      isFinal: boolean;
      [key: number]: { transcript: string };
    };
  };
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

function SpeakChallenge({ challenge, onCheck, onPlay }: { challenge: Challenge, onCheck: (c: boolean) => void, onPlay: () => void }) {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [hasSupport, setHasSupport] = useState(true);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognitionConstructor) {
      const r = new SpeechRecognitionConstructor();
      r.continuous = true;
      r.interimResults = true;
      r.lang = 'en-US';
      
      r.onresult = (e: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        for (let i = e.resultIndex; i < e.results.length; ++i) {
          if (e.results[i].isFinal) finalTranscript += e.results[i][0].transcript;
        }
        if (finalTranscript) setTranscript(prev => (prev + " " + finalTranscript).trim());
      };
      
      r.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed' || event.error === 'network') {
          setHasSupport(false);
        }
        setIsRecording(false);
      };
      
      r.onend = () => setIsRecording(false);
      recognitionRef.current = r;
      setHasSupport(true);
    } else {
      setHasSupport(false);
    }
    setTranscript("");
  }, [challenge.id]);

  const toggle = () => {
    if (!hasSupport) {
      alert("⚠️ 抱歉，您的浏览器（如微信/部分手机内置浏览器）不支持网页原生语音识别！\n\n💡 完美解决方案：\n请直接点击下方的黑色文本输入框，然后使用【您手机键盘自带的麦克风按钮】进行语音打字！不仅准确率极高，还会自动加标点！\n\n(或者您可以复制网址到 Safari / Chrome 浏览器打开)");
      return;
    }
    if (isRecording) {
      try { recognitionRef.current?.stop(); } catch(e) { console.error(e); }
      setIsRecording(false);
    } else {
      setTranscript("");
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
        setHasSupport(false);
        alert("⚠️ 无法启动麦克风。请确保您已授予网页麦克风权限！\n建议直接点击文本框，使用手机输入法自带的麦克风功能。");
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="bg-black border-2 border-yellow-500 p-4 w-full text-center">
        <p className="text-slate-400 text-xs uppercase mb-2">TARGET INCANTATION</p>
        <div className="text-xl sm:text-2xl font-bold text-white">&quot;{challenge.answer}&quot;</div>
      </div>
      
      <button onClick={onPlay} className="px-6 py-2 bg-blue-800 hover:bg-blue-600 border-2 border-white active:translate-y-1 shadow-[4px_4px_0_0_rgba(255,255,255,1)] uppercase text-sm font-bold">
        🔊 LISTEN TO MAGIC
      </button>
      
      <textarea 
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        className="w-full bg-black border-4 border-slate-500 p-4 text-base text-green-400 focus:outline-none focus:border-yellow-400 min-h-[100px] shadow-[inset_0_0_10px_rgba(0,0,0,1)]"
        placeholder="> CHANT INTO YOUR MICROPHONE... (OR TYPE IF MAGIC FAILS)"
      />

      <button 
        onClick={(e) => { e.preventDefault(); toggle(); }}
        type="button"
        className={`w-20 h-20 sm:w-24 sm:h-24 border-4 border-white shadow-[4px_4px_0_0_rgba(255,255,255,1)] flex items-center justify-center text-3xl sm:text-4xl transition-all ${!hasSupport ? 'bg-slate-700 opacity-80' : isRecording ? 'bg-red-600 animate-pulse' : 'bg-green-700 hover:bg-green-600 active:translate-y-1 active:shadow-none'}`}
      >
        🎤
      </button>

      {!hasSupport && (
        <p className="text-yellow-500 text-xs sm:text-sm text-center px-4 mt-2">
          ⚠️ MICROPHONE MAGIC NOT SUPPORTED IN THIS REALM. PLEASE TYPE YOUR SPELL ABOVE.
        </p>
      )}

      {(!isRecording && transcript) || !hasSupport ? (
        <button 
          onClick={() => {
            const targetWords = challenge.answer.toLowerCase().replace(/[^a-z0-9 ]/g,'').split(' ').filter(Boolean);
            const transcriptWords = transcript.toLowerCase().replace(/[^a-z0-9 ]/g,'').split(' ').filter(Boolean);
            const matches = targetWords.filter(w => transcriptWords.includes(w));
            onCheck(matches.length >= targetWords.length * 0.5);
          }}
          className="w-full py-4 bg-red-700 border-4 border-white hover:bg-red-600 active:translate-y-1 active:shadow-none shadow-[4px_4px_0_0_rgba(255,255,255,1)] font-bold text-lg uppercase tracking-widest text-white transition-all mt-2"
        >
          CAST CHANT
        </button>
      ) : null}
    </div>
  );
}

function InterviewQaChallenge({ challenge, onCheck, onPlay }: { challenge: Challenge, onCheck: (c: boolean) => void, onPlay: () => void }) {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [hasSupport, setHasSupport] = useState(true);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognitionConstructor) {
      const r = new SpeechRecognitionConstructor();
      r.continuous = true;
      r.interimResults = true;
      r.lang = 'en-US';
      
      r.onresult = (e: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        for (let i = e.resultIndex; i < e.results.length; ++i) {
          if (e.results[i].isFinal) finalTranscript += e.results[i][0].transcript;
        }
        if (finalTranscript) setTranscript(prev => (prev + " " + finalTranscript).trim());
      };
      
      r.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed' || event.error === 'network') {
          setHasSupport(false);
        }
        setIsRecording(false);
      };
      
      r.onend = () => setIsRecording(false);
      recognitionRef.current = r;
      setHasSupport(true);
    } else {
      setHasSupport(false);
    }
    setTranscript("");
  }, [challenge.id]);

  const toggle = () => {
    if (!hasSupport) {
      alert("⚠️ 抱歉，您的浏览器（如微信/部分手机内置浏览器）不支持网页原生语音识别！\n\n💡 完美解决方案：\n请直接点击下方的黑色文本输入框，然后使用【您手机键盘自带的麦克风按钮】进行语音打字！不仅准确率极高，还会自动加标点！\n\n(或者您可以复制网址到 Safari / Chrome 浏览器打开)");
      return;
    }
    if (isRecording) {
      try { recognitionRef.current?.stop(); } catch(e) { console.error(e); }
      setIsRecording(false);
    } else {
      setTranscript("");
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
        setHasSupport(false);
        alert("⚠️ 无法启动麦克风。请确保您已授予网页麦克风权限！\n建议直接点击文本框，使用手机输入法自带的麦克风功能。");
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <button onClick={onPlay} className="px-6 py-2 bg-blue-800 hover:bg-blue-600 border-2 border-white active:translate-y-1 shadow-[4px_4px_0_0_rgba(255,255,255,1)] uppercase text-sm font-bold flex items-center gap-2">
        🔊 LISTEN TO BOSS
      </button>

      <textarea 
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        className="w-full bg-black border-4 border-slate-500 p-4 text-base text-yellow-400 focus:outline-none focus:border-red-500 min-h-[120px] shadow-[inset_0_0_10px_rgba(0,0,0,1)] leading-relaxed"
        placeholder="> SPEAK YOUR COUNTER-ATTACK HERE... (OR TYPE IT OUT)"
      />

      <button 
        onClick={(e) => { e.preventDefault(); toggle(); }}
        type="button"
        className={`w-20 h-20 sm:w-24 sm:h-24 border-4 border-white shadow-[4px_4px_0_0_rgba(255,255,255,1)] flex items-center justify-center text-3xl sm:text-4xl transition-all ${!hasSupport ? 'bg-slate-700 opacity-80' : isRecording ? 'bg-red-600 animate-pulse' : 'bg-green-700 hover:bg-green-600 active:translate-y-1 active:shadow-none'}`}
      >
        🎤
      </button>

      {!hasSupport && (
        <p className="text-yellow-500 text-xs sm:text-sm text-center px-4 mt-2">
          ⚠️ MICROPHONE MAGIC NOT SUPPORTED IN THIS REALM.
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
          className="w-full py-4 bg-red-700 border-4 border-white hover:bg-red-600 active:translate-y-1 active:shadow-none shadow-[4px_4px_0_0_rgba(255,255,255,1)] font-bold text-lg uppercase tracking-widest text-white transition-all mt-2"
        >
          STRIKE BACK!
        </button>
      ) : null}
    </div>
  );
}
