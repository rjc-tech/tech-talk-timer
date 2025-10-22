import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer } from './Timer';
import { TimerNotification } from './TimerNotification';
import { TIMER_DURATION_OPTIONS, DEFAULT_TIMER_DURATION } from '../constants/timer';

interface TimerSectionProps {
  initialDuration?: number;
}

export const TimerSection: React.FC<TimerSectionProps> = ({ 
  initialDuration = DEFAULT_TIMER_DURATION
}) => {
  const [selectedDuration, setSelectedDuration] = useState<number>(initialDuration);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isTimerCompleted, setIsTimerCompleted] = useState<boolean>(false);
  const navigate = useNavigate();

  // タイマー終了時の処理
  const handleTimerComplete = () => {
    setIsTimerRunning(false);
    setIsTimerCompleted(true);
  };

  // 通知完了時の処理
  const handleNotificationComplete = () => {
    setIsTimerCompleted(false);
  };

  // 時間設定変更
  const handleDurationChange = (duration: number) => {
    setSelectedDuration(duration);
  };

  // 開始/停止ボタン
  const handleStartStop = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  // 新しいセッション（/participantに遷移）
  const handleNewSession = () => {
    setIsTimerRunning(false);
    setIsTimerCompleted(false);
    setSelectedDuration(initialDuration);
    navigate('/participant');
  };

  return (
    <div className="glass-morphism rounded-2xl p-6 text-center">
      {/* 時間設定 */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <label className="text-gray-300">時間設定：</label>
        <select
          value={selectedDuration}
          onChange={(e) => handleDurationChange(Number(e.target.value))}
          disabled={isTimerRunning}
          className={`px-4 py-2 border rounded-lg focus:outline-none transition-all duration-200 ${
            isTimerRunning
              ? 'bg-gray-800/30 border-gray-600 text-gray-500 cursor-not-allowed'
              : 'bg-gray-800/50 border-gray-700 text-white focus:border-purple-500 hover:border-gray-600'
          }`}
        >
          {TIMER_DURATION_OPTIONS.map((time, index) => (
            <option key={index} value={time}>{`${time}分`}</option>
          ))}
        </select>
      </div>

      {/* タイマー表示 */}
      <div className="mb-6">
        <Timer
          initialMinutes={selectedDuration}
          isRunning={isTimerRunning}
          onComplete={handleTimerComplete}
        />
      </div>

      {/* ボタン群 */}
      <div className="flex space-x-3 justify-center">
        <button
          onClick={handleStartStop}
          className="px-8 py-3 gradient-bg text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-2"
        >
          <span>{isTimerRunning ? '停止' : '開始'}</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isTimerRunning ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            ) : (
              <>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </>
            )}
          </svg>
        </button>
        <button 
          onClick={handleNewSession}
          className="px-6 py-3 gradient-bg text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-2"
        >
          <span>新しいセッション</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      <TimerNotification
        isCompleted={isTimerCompleted}
        onComplete={handleNotificationComplete}
      />
    </div>
  );
};
