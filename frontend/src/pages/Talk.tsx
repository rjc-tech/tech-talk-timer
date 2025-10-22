import { useEffect, useState } from "react";

export default function Talk() {
  const [facilitator, setFacilitator] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);
  const timeSelectList = [3, 5, 10, 15, 20, 30];

  // コンポーネントのマウント時にファシリテーターとトピックリストを選択
  useEffect(() => {
    // LocalStorageから参加者リストを取得
    const savedParticipants = localStorage.getItem('participants');
    if (savedParticipants) {
      const participants = JSON.parse(savedParticipants) as string[];
      // ランダムに1人選択
      const randomIndex = Math.floor(Math.random() * participants.length);
      setFacilitator(participants[randomIndex]);
    }

    // APIからトピックリストを取得
    const mockTopics = [
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
    ]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

    setTopics(mockTopics);

  }, []); // 空の依存配列で初回のみ実行

  return (
    <div id="sessionScreen" className="screen active">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左側：ファシリテーター */}
          <div className="lg:col-span-1">
            <div className="glass-morphism rounded-2xl p-6 text-center space-y-4">
              <h3 className="text-xl font-semibold text-purple-300">ファシリテーター</h3>
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span id="facilitatorIcon" className="text-4xl font-bold text-white">
                    {facilitator ? facilitator.charAt(0).toUpperCase() : '?'}
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-lg">👑</span>
                </div>
              </div>
              <p id="facilitatorName" className="text-2xl font-semibold">
                {facilitator || 'ランダム選択中...'}
              </p>

            </div>
          </div>

          {/* 右側：メインコンテンツ */}
          <div className="lg:col-span-2 space-y-6">
            {/* トークテーマ */}
            <div className="glass-morphism rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-purple-300 mb-4">トークテーマを選択</h3>
              <div id="topicsList" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {
                  topics.map((topic, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedTopic(topic)}
                      className={`text-center theme-card p-4 bg-gray-800/50 border border-gray-700 rounded-lg cursor-pointer hover:border-purple-500 ${selectedTopic === topic ? "selected" : ""}`}>
                        <div className="text-3xl mb-2">{['💡', '🚀', '⚡'][index]}</div>
                        <p className="text-sm">{topic}</p>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* タイマー */}
            <div className="glass-morphism rounded-2xl p-6 text-center space-y-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <label className="text-gray-300">時間設定：</label>
                <select id="timeSelect" defaultValue={5} className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500">
                  {
                    timeSelectList.map((time, index) => (
                      <option key={index} value={time}>{`${time}分`}</option>
                    ))
                  }
                </select>
              </div>

              <div id="timerDisplay" className="text-6xl md:text-8xl font-bold tabular-nums bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                00:00
              </div>

              <div className="flex space-x-3 justify-center">
                <button id="timerButton" onClick={() => {/* toggleTimer() */}} className="px-8 py-3 gradient-bg text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-2">
                  <span>開始</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </button>
                <button onClick={() => {/* newSession() */}} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors">
                  新しいセッション
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
