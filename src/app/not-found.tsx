import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 p-6">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">😕</div>
        <h1 className="text-4xl font-bold text-slate-900 mb-3">404</h1>
        <p className="text-slate-500 text-lg mb-8">
          Открытка не найдена или ссылка устарела
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
          💌 На главную
        </Link>
      </div>
    </div>
  );
}
