import { Link } from "react-router-dom";
import React, { useState, KeyboardEvent, ChangeEvent } from "react";

export default function Participant() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [newParticipant, setNewParticipant] = useState("");

  const handleAddParticipant = () => {
    if (newParticipant.trim()) {
      setParticipants([...participants, newParticipant.trim()]);
      setNewParticipant("");
    }
  };

  const handleRemoveParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#0a061f] text-white p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4 text-purple-300">参加者を入力</h1>
        <p className="text-base md:text-lg text-gray-400 mb-8">セッションに参加するメンバーを追加してください</p>

        <div className="bg-[#1a1533] p-6 rounded-lg">
          <div className="space-y-4">
            {participants.map((participant, index) => (
              <div key={index} className="flex items-center justify-between bg-[#262042] p-3 rounded">
                <span>{participant}</span>
                <button
                  onClick={() => handleRemoveParticipant(index)}
                  className="p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            ))}
            
            <div className="border border-dashed border-[#4a4373] p-3 rounded">
              <input
                type="text"
                value={newParticipant}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewParticipant(e.target.value)}
                onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    handleAddParticipant();
                  }
                }}
                placeholder="参加者名"
                className="w-full bg-transparent outline-none"
              />
            </div>
            
            <button 
              onClick={handleAddParticipant}
              className="w-full py-3 border-2 border-dashed border-gray-600 hover:border-purple-500 rounded-lg text-gray-400 hover:text-purple-400 transition-colors"
            >
              + 参加者を追加
            </button>
          </div>

          <div className="mt-6 flex justify-between">
            <Link 
              to="/"
              className="px-6 py-2 rounded bg-[#262042] hover:bg-[#312952] transition-colors"
            >
              戻る
            </Link>
            <Link
              to="/talk"
              className="px-6 py-2 rounded bg-[#6c5dd3] hover:bg-[#7d6de3] transition-colors"
            >
              次へ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}