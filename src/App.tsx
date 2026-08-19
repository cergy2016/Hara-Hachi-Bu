/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { SetupScreen } from './components/SetupScreen';
import { ActiveTimer } from './components/ActiveTimer';
import { HalfwayPauseModal } from './components/HalfwayPauseModal';
import { CompletionScreen } from './components/CompletionScreen';
import { MindfulScaleGuide } from './components/MindfulScaleGuide';
import { EmbedCodeModal } from './components/EmbedCodeModal';
import { TimerPhase, MealSessionRecord } from './types';
import { zenAudio } from './utils/audio';

export default function App() {
  const [phase, setPhase] = useState<TimerPhase>('setup');
  const [totalSeconds, setTotalSeconds] = useState<number>(20 * 60);
  const [halfwaySeconds, setHalfwaySeconds] = useState<number>(10 * 60);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(20 * 60);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [bitePacerEnabled, setBitePacerEnabled] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Modals
  const [showPhilosophy, setShowPhilosophy] = useState<boolean>(false);
  const [showEmbedCode, setShowEmbedCode] = useState<boolean>(false);

  // Current session log
  const [currentSession, setCurrentSession] = useState<MealSessionRecord>({
    id: '',
    timestamp: Date.now(),
    durationMinutes: 20,
    actualSeconds: 0,
    fullnessRating: 8,
    completedFully: true,
    presetName: '20 Minutes',
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronize audio player sound status
  useEffect(() => {
    zenAudio.soundEnabled = soundEnabled;
  }, [soundEnabled]);

  // Main countdown timer effect
  useEffect(() => {
    if (phase === 'phase1' || phase === 'phase2') {
      if (!isPaused) {
        timerRef.current = setInterval(() => {
          setRemainingSeconds((prev) => {
            // Check for halfway mark
            if (phase === 'phase1' && prev <= totalSeconds - halfwaySeconds) {
              clearInterval(timerRef.current!);
              zenAudio.playSingingBowl('halfway');
              setPhase('halfway_pause');
              return prev;
            }

            // Check for completion
            if (prev <= 1) {
              clearInterval(timerRef.current!);
              handleCompleteMeal(8);
              return 0;
            }

            return prev - 1;
          });
        }, 1000);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, isPaused, totalSeconds, halfwaySeconds]);

  const handleStartMeal = (config: { totalMinutes: number; halfwayMinutes: number; bitePacerEnabled: boolean }) => {
    const totalSecs = config.totalMinutes * 60;
    const halfSecs = config.halfwayMinutes * 60;

    setTotalSeconds(totalSecs);
    setHalfwaySeconds(halfSecs);
    setRemainingSeconds(totalSecs);
    setBitePacerEnabled(config.bitePacerEnabled);
    setIsPaused(false);
    setPhase('phase1');

    setCurrentSession({
      id: String(Date.now()),
      timestamp: Date.now(),
      durationMinutes: config.totalMinutes,
      actualSeconds: 0,
      fullnessRating: 8,
      completedFully: false,
      presetName: `${config.totalMinutes} Min Meal`,
    });

    zenAudio.playSingingBowl('start');
  };

  const handleSelectPhase = (targetPhase: TimerPhase) => {
    if (targetPhase === 'phase1') {
      setIsPaused(false);
      setPhase('phase1');
    } else if (targetPhase === 'halfway_pause') {
      if (timerRef.current) clearInterval(timerRef.current);
      zenAudio.playSingingBowl('halfway');
      setPhase('halfway_pause');
    } else if (targetPhase === 'completed') {
      handleCompleteMeal(8);
    } else {
      setPhase(targetPhase);
    }
  };

  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
    zenAudio.playSingingBowl('tick');
  };

  const handleAddMinute = () => {
    setRemainingSeconds((prev) => prev + 60);
    setTotalSeconds((prev) => prev + 60);
    zenAudio.playSingingBowl('tick');
  };

  const handleSubtractMinute = () => {
    setRemainingSeconds((prev) => Math.max(5, prev - 60));
    zenAudio.playSingingBowl('tick');
  };

  const handleTriggerCheckInEarly = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    zenAudio.playSingingBowl('halfway');
    setPhase('halfway_pause');
  };

  const handleContinueAfterPause = (fullnessRating: number) => {
    setCurrentSession((prev) => ({
      ...prev,
      fullnessRating,
    }));
    setPhase('phase2');
    setIsPaused(false);
  };

  const handleFinishEarly = (fullnessRating: number) => {
    handleCompleteMeal(fullnessRating);
  };

  const handleCompleteMeal = (fullnessRating: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    zenAudio.playSingingBowl('complete');

    const spentSecs = Math.max(1, totalSeconds - remainingSeconds);
    setCurrentSession((prev) => ({
      ...prev,
      actualSeconds: spentSecs,
      fullnessRating,
      completedFully: true,
    }));

    setPhase('completed');
  };

  const handleResetToSetup = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('setup');
    setIsPaused(false);
    setRemainingSeconds(totalSeconds);
    zenAudio.playSingingBowl('tick');
  };

  const totalMinutesDisplay = Math.round(totalSeconds / 60);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#333333] font-serif flex flex-col justify-between selection:bg-[#8A9A5B]/20 selection:text-[#333333]">
      <div className="w-full flex-1 flex flex-col">
        {/* Editorial Top Navigation */}
        <Header
          phase={phase}
          totalMinutes={totalMinutesDisplay}
          soundEnabled={soundEnabled}
          isPaused={isPaused}
          onSelectPhase={handleSelectPhase}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          onOpenEmbed={() => setShowEmbedCode(true)}
          onOpenPhilosophy={() => setShowPhilosophy(true)}
        />

        {/* Main Stage Grid Container */}
        <main className="flex-1 flex flex-col justify-center">
          {phase === 'setup' && (
            <SetupScreen onStartMeal={handleStartMeal} />
          )}

          {(phase === 'phase1' || phase === 'phase2') && (
            <ActiveTimer
              totalSeconds={totalSeconds}
              remainingSeconds={remainingSeconds}
              halfwaySeconds={halfwaySeconds}
              currentPhase={phase}
              isPaused={isPaused}
              bitePacerEnabled={bitePacerEnabled}
              onTogglePause={handleTogglePause}
              onAddMinute={handleAddMinute}
              onSubtractMinute={handleSubtractMinute}
              onTriggerCheckIn={handleTriggerCheckInEarly}
              onReset={handleResetToSetup}
            />
          )}

          {phase === 'halfway_pause' && (
            <HalfwayPauseModal
              onContinueMeal={handleContinueAfterPause}
              onFinishEarly={handleFinishEarly}
            />
          )}

          {phase === 'completed' && (
            <CompletionScreen
              session={currentSession}
              onRestart={handleResetToSetup}
              onOpenPhilosophy={() => setShowPhilosophy(true)}
            />
          )}
        </main>
      </div>

      {/* Philosophy Modal */}
      {showPhilosophy && (
        <MindfulScaleGuide onClose={() => setShowPhilosophy(false)} />
      )}

      {/* Embed Code Modal for chungbooks.fr */}
      {showEmbedCode && (
        <EmbedCodeModal onClose={() => setShowEmbedCode(false)} />
      )}

      {/* Editorial Footer */}
      <footer className="h-16 border-t border-[#333333]/10 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 text-[10px] uppercase tracking-widest font-sans font-bold opacity-60 max-w-6xl mx-auto w-full gap-2 sm:gap-0">
        <div>Designed for ChungBooks.fr &bull; 腹八分目</div>
        <div className="flex gap-6">
          <button
            onClick={() => setShowPhilosophy(true)}
            className="hover:opacity-100 hover:text-[#8A9A5B] transition-colors cursor-pointer"
          >
            Philosophy
          </button>
          <button
            onClick={() => setShowEmbedCode(true)}
            className="hover:opacity-100 hover:text-[#8A9A5B] transition-colors cursor-pointer"
          >
            Embed Widget
          </button>
        </div>
      </footer>
    </div>
  );
}
