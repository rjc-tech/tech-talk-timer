import React, { useEffect, useState } from 'react';

interface TimerProps {
  initialMinutes: number;
  isRunning: boolean;
  onComplete?: () => void;
  onTimeUpdate?: (seconds: number) => void;
}

export const Timer: React.FC<TimerProps> = ({ 
  initialMinutes, 
  isRunning, 
  onComplete,
  onTimeUpdate 
}) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60); // 秒単位で管理
  const [lastUsedMinutes, setLastUsedMinutes] = useState(initialMinutes); // 前回使用した時間設定を保存
  const [wasRunning, setWasRunning] = useState(false); // 前回の実行状態を保存

  // タイマーの実行状態の変更を検知
  useEffect(() => {
    if (!isRunning && wasRunning) {
      // タイマーが停止された時
      setLastUsedMinutes(initialMinutes);
    } else if (isRunning && !wasRunning) {
      // タイマーが開始された時
      if (lastUsedMinutes !== initialMinutes) {
        // 停止中に時間が変更されていた場合、新しい時間でリセット
        setTimeLeft(initialMinutes * 60);
        setLastUsedMinutes(initialMinutes);
      }
    }
    setWasRunning(isRunning);
  }, [isRunning, initialMinutes, lastUsedMinutes]);

  // 時間設定が変更された時の処理（タイマーが停止中の場合のみ）
  useEffect(() => {
    if (!isRunning && initialMinutes !== lastUsedMinutes) {
      // タイマーが停止中で時間設定が変更された場合、新しい時間でリセット
      setTimeLeft(initialMinutes * 60);
      setLastUsedMinutes(initialMinutes);
    }
  }, [initialMinutes, isRunning, lastUsedMinutes]);

  // カウントダウン処理
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          const newValue = prev <= 1 ? 0 : prev - 1;
          onTimeUpdate?.(newValue);
          return newValue;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning, timeLeft, onTimeUpdate]);

  // タイマー完了時の処理（別のuseEffectで分離）
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      onComplete?.();
    }
  }, [timeLeft, isRunning, onComplete]);

  // 時間を「MM:SS」形式でフォーマット
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="text-6xl md:text-8xl font-bold tabular-nums bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
      {formatTime(timeLeft)}
    </div>
  );
};