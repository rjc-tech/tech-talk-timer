import { Link } from "react-router-dom";
import React, { useState, ChangeEvent, useEffect } from "react";
import { Toast } from "../components/Toast";

// 最小参加者数の定義
const MIN_PARTICIPANTS = 2;

export default function Participant() {
  // 参加者入力フィールドの配列を管理
  const [inputFields, setInputFields] = useState<string[]>(() => {
    const saved = localStorage.getItem('participantInputs');
    return saved ? JSON.parse(saved) : [''];  // 初期状態で1つの空の入力フィールド
  });

  // エラーメッセージの状態管理
  const [error, setError] = useState<string | null>(null);

  // 入力フィールドの値を更新
  const handleInputChange = (index: number, value: string) => {
    const newFields = [...inputFields];
    newFields[index] = value;
    setInputFields(newFields);
  };

  // 入力フィールドを追加
  const handleAddField = () => {
    setInputFields([...inputFields, '']);
  };

  // 入力フィールドを削除
  const handleRemoveField = (index: number) => {
    const newFields = inputFields.filter((_: string, i: number) => i !== index);
    setInputFields(newFields.length > 0 ? newFields : ['']); // 最低1つのフィールドを維持
  };

  // LocalStorageに状態を保存
  useEffect(() => {
    localStorage.setItem('participantInputs', JSON.stringify(inputFields));
  }, [inputFields]);

  // 次へボタンのクリック処理
  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const nonEmptyFields = inputFields.filter((field: string) => field.trim() !== '');
    
    if (nonEmptyFields.length < MIN_PARTICIPANTS) {
      e.preventDefault(); // リンクの遷移をキャンセル
      setError(`参加者を${MIN_PARTICIPANTS}名以上入力してください`);
      return;
    }

    // 重複チェック
    const uniqueFields = new Set(nonEmptyFields);
    if (uniqueFields.size !== nonEmptyFields.length) {
      e.preventDefault();
      setError('同じ名前の参加者が存在します');
      return;
    }

    setError(null);
    localStorage.setItem('participants', JSON.stringify(nonEmptyFields));
  };

  // UIレンダリング
  return (
    <div className="min-h-screen bg-[#0a061f] text-white p-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* ヘッダー部分 */}
        <h1 className="text-3xl font-bold mb-4 text-purple-300">参加者を入力</h1>
        <p className="text-base md:text-lg text-gray-400 mb-8">セッションに参加するメンバーを追加してください</p>

        <div className="bg-[#1a1533] p-6 rounded-lg">
          {/* トースト通知 */}
          <Toast message={error} onClose={() => setError(null)} />

          <div className="space-y-4">
            {/* 参加者入力フィールド */}
            {inputFields.map((field: string, index: number) => (
              <div key={index} className="flex items-center justify-between space-x-2">
                <input
                  type="text"
                  value={field}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(index, e.target.value)}
                  placeholder="参加者名"
                  className="flex-1 px-4 py-3 bg-[#262042] rounded outline-none"
                />
                <button
                  onClick={() => handleRemoveField(index)}
                  className="p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            ))}
            
            {/* 参加者追加ボタン */}
            <button 
              onClick={handleAddField}
              className="w-full py-3 border-2 border-dashed border-gray-600 hover:border-purple-500 rounded-lg text-gray-400 hover:text-purple-400 transition-colors"
            >
              + 参加者を追加
            </button>
          </div>

          {/* ナビゲーションボタン */}
          <div className="mt-6 flex justify-between">
            <Link 
              to="/"
              className="px-6 py-2 rounded bg-[#262042] hover:bg-[#312952] transition-colors"
            >
              戻る
            </Link>
            <Link
              to="/talk"
              onClick={handleNext}
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