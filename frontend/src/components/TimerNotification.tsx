import React, { useEffect } from 'react';
import { TIMER_NOTIFICATION } from '../constants/timer';

interface TimerNotificationProps {
  isCompleted: boolean;
  onComplete: () => void;
}

export const TimerNotification: React.FC<TimerNotificationProps> = ({ 
  isCompleted, 
  onComplete 
}) => {
  // 音声通知の再生
  const playNotificationSound = () => {
    try {
      // Web Audio APIを使用してビープ音を生成
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // ビープ音を生成する関数
      const createBeep = (delay: number) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          // ビープ音の設定
          oscillator.frequency.setValueAtTime(TIMER_NOTIFICATION.AUDIO.FREQUENCY, audioContext.currentTime);
          oscillator.type = 'sine';
          
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + TIMER_NOTIFICATION.AUDIO.DURATION);
          
          // ビープ音を鳴らす
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + TIMER_NOTIFICATION.AUDIO.DURATION);
        }, delay);
      };
      
      // 指定された回数のビープ音を順次再生
      for (let i = 0; i < TIMER_NOTIFICATION.AUDIO.REPEAT_COUNT; i++) {
        createBeep(i * TIMER_NOTIFICATION.AUDIO.REPEAT_INTERVAL);
      }
    } catch (error) {
      console.warn('音声通知の再生に失敗しました:', error);
    }
  };

  // タイマー終了時の処理
  useEffect(() => {
    if (isCompleted) {
      // 音声通知を再生
      playNotificationSound();
      
      // 設定時間後に自動でリセット
      const timer = setTimeout(() => {
        onComplete();
      }, TIMER_NOTIFICATION.VISUAL_DISPLAY_DURATION);

      return () => clearTimeout(timer);
    }
  }, [isCompleted, onComplete]);

  // 視覚的フィードバック
  if (!isCompleted) return null;

  return (
    <div className="fixed inset-0 bg-red-500/20 flex items-center justify-center z-50 pointer-events-none">
      <div className="text-6xl md:text-8xl font-bold text-red-500 animate-bounce">
        ⏰ 時間終了！
      </div>
    </div>
  );
};
