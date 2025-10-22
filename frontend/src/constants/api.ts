/**
 * API関連の定数
 */

// リクエストURL
export const BASE_URL = "http://localhost:8080";

// リクエストパス
export const TOPICS_PATH = "/" /* "/api/themes/randoms" */ ;

// テーマの型
export type Theme = {
  id: number;
  theme: string;
  category: string;
  created_at: string;
};

// 固定のトピック配列（通信エラー時およびモック用）
export const TOPICS = [
    "最近学んだ技術やツール",
    "開発で苦労したバグの話",
    "おすすめのVSCode拡張機能",
    "好きなプログラミング言語とその理由",
    "キーボードやマウスのこだわり",
    "リモートワークの工夫",
    "コードレビューで気をつけていること",
    "最近読んだ技術書",
    "AIツールの活用方法",
    "副業やOSSの話",
    "テストコードの書き方",
    "アーキテクチャの設計思想",
    "チーム開発のTips",
    "デバッグの極意",
    "パフォーマンス改善の経験"
];
