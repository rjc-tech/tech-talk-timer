import { TimerSection } from "@/components/TimerSection";
import { BASE_URL, Theme, TOPICS, TOPICS_PATH } from "@/constants/api";
import { DEFAULT_TIMER_DURATION } from "@/constants/timer";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Talk() {
  const [facilitator, setFacilitator] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);

  // コンポーネントのマウント時にファシリテーターとトピックリストを選択
  useEffect(() => {

    const fetchInitialData = async () => {

      // LocalStorageから参加者リストを取得
      const savedParticipants = localStorage.getItem('participants');
      if (savedParticipants) {
        const participants = JSON.parse(savedParticipants) as string[];
        // ランダムに1人選択
        const randomIndex = Math.floor(Math.random() * participants.length);
        setFacilitator(participants[randomIndex]);
      }

      // APIからトピックリストを取得
      try {

        const response = await axios.get(`${BASE_URL}${TOPICS_PATH}`);
        const themes = response.data as Theme[];

        // Mock
        console.log("response: ", topics);
        const mockTopics = TOPICS.sort(() => 0.5 - Math.random()).slice(0, 3);
        setTopics(mockTopics);

        // setTopics(themes.map(item => item.theme));

      } catch (error) {
        // API取得失敗時はモックデータをフォールバックとして使用
        console.error("トピックの取得に失敗しました。モックデータを使用します。", error);
        const mockTopics = TOPICS.sort(() => 0.5 - Math.random()).slice(0, 3);
        setTopics(mockTopics);
      }
    };

    fetchInitialData();

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
            <TimerSection 
              initialDuration={DEFAULT_TIMER_DURATION} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
