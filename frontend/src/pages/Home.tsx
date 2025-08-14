import Button from "@/components/Button";

export default function Home() {
  return (
    <div id="homeScreen" className="screen active">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Chat Session
            </h1>
            <p className="text-xl text-gray-300">チームの雑談を楽しく、効率的に</p>
          </div>
          <div className="glass-morphism rounded-2xl p-8 md:p-12 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-purple-300">使い方</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                <p className="text-gray-300">参加者の名前を入力します</p>
              </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                  <p className="text-gray-300">ファシリテーターがランダムに選ばれます</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                  <p className="text-gray-300">トークテーマを選択します</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                  <p className="text-gray-300">時間を設定してセッションを開始！</p>
                </div>
            </div>
            <Button path="/participant">はじめる</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
