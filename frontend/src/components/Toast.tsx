import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  duration?: number; // トースト表示時間（ミリ秒）
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  onClose, 
  duration = 3000 // デフォルトで3秒表示
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const fadeOutDuration = 300; // フェードアウトの時間（ミリ秒）

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false); // フェードアウト開始
        setTimeout(() => {
          onClose(); // フェードアウト完了後にトーストを閉じる
        }, fadeOutDuration);
      }, duration - fadeOutDuration); // フェードアウト時間を考慮して早めにタイマーを開始

      return () => {
        clearTimeout(timer);
        setIsVisible(false);
      };
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="bg-red-950 border-2 border-red-500 text-red-200 px-8 py-4 rounded-lg shadow-xl min-w-[320px]">
        <div className="flex items-center space-x-3">
          {/* エラーアイコン */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-lg">{message}</span>
        </div>
      </div>
    </div>
  );
};