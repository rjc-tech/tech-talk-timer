/**
 * タイマー関連の定数
 */

// タイマーで選択可能な時間（分単位）
export const TIMER_DURATION_OPTIONS = [1, 2, 3, 5, 10, 15, 20, 30] as const;

// デフォルトのタイマー時間（分）
export const DEFAULT_TIMER_DURATION = 3;

// タイマー通知の設定
export const TIMER_NOTIFICATION = {
  // 音声通知の設定
  AUDIO: {
    FREQUENCY: 800, // Hz
    DURATION: 0.5, // 秒
    REPEAT_COUNT: 3, // 繰り返し回数
    REPEAT_INTERVAL: 600, // 繰り返し間隔（ミリ秒）
  },
  // 視覚的フィードバックの表示時間（ミリ秒）
  VISUAL_DISPLAY_DURATION: 3000,
} as const;
