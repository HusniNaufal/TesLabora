import { Apple, Coffee, AlertCircle, MessageCircleHeart } from "lucide-react";

export default function Education() {
  return (
    <>
      <div className="space-y-4 animate-fade-in">
        <h2 className="text-xl font-bold text-gray-800 px-1">Edukasi Lambung</h2>

        <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-yellow-400">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <AlertCircle size={20} className="text-yellow-500" /> Pola Makan 4 Jam
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">Lambung kosong terlalu lama dapat meningkatkan produksi asam. Makan porsi kecil tapi sering (tiap 4 jam) membantu menetralkan asam lambung secara alami.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-green-500">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <Apple size={20} className="text-green-500" /> Makanan Sahabat Lambung
          </h3>
          <ul className="text-sm text-gray-600 list-disc ml-5 space-y-1">
            <li>Oatmeal (Menyerap asam)</li>
            <li>Jahe (Anti-inflamasi)</li>
            <li>Sayuran hijau (Brokoli, Bayam)</li>
            <li>Daging tanpa lemak</li>
            <li>Pisang & Melon</li>
          </ul>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-red-500">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <Coffee size={20} className="text-red-500" /> Pemicu GERD
          </h3>
          <p className="text-sm text-gray-600">Hindari makanan pedas, gorengan, kopi, cokelat, dan buah yang terlalu asam (jeruk/lemon) saat perut kosong.</p>
        </div>
        <a
          href="https://www.halodoc.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-105 block w-full bg-[#cdb891] text-shadow-amber-600 py-4 rounded-xl font-bold shadow-lg active:scale-95 transition flex items-center justify-center gap-2 mt-6"
        >
          🩺 Konsultasi Dokter Sekarang
        </a>
      </div>
    </>
  );
}
