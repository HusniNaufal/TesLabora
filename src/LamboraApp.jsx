import React, { useState, useEffect, useRef } from "react";
import { Bell, BookOpen, Gamepad2, Home, Heart, Apple, Coffee, Pizza, Utensils, AlertCircle, Clock, CheckCircle } from "lucide-react";
//import "index.css";
const LamboraApp = () => {
  const [activeTab, setActiveTab] = useState("home");

  // State Global untuk Game & Kesehatan
  const [health, setHealth] = useState(100);
  const [nextMealTime, setNextMealTime] = useState(null);
  const [notificationPermission, setNotificationPermission] = useState("default");

  // Request notification permission on load
  useEffect(() => {
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const requestNotification = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
    }
  };

  // Navigasi
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeView setActiveTab={setActiveTab} />;
      case "tracker":
        return <TrackerView nextMealTime={nextMealTime} setNextMealTime={setNextMealTime} requestNotification={requestNotification} setHealth={setHealth} />;
      case "edukasi":
        return <EducationView />;
      case "game":
        return <GameView health={health} setHealth={setHealth} nextMealTime={nextMealTime} />;
      default:
        return <HomeView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 text-gray-800 font-sans flex flex-col max-w mx-auto shadow-2xl overflow-hidden border-x border-pink-100">
      {/* Header */}
      <header className="bg-linear-to-r from-pink-500 to-rose-400 p-4 text-white shadow-md z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Heart className="fill-white" size={24} /> Lambora
          </h1>
          <div className="text-xs bg-white/20 px-2 py-1 rounded-full">Sehat Bersama</div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 pb-24 scroll-smooth">{renderContent()}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w bg-white border-t border-gray-200 flex justify-around p-3 pb-5 z-20 shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
        <NavButton active={activeTab === "home"} onClick={() => setActiveTab("home")} icon={<Home size={20} />} label="Beranda" />
        <NavButton active={activeTab === "tracker"} onClick={() => setActiveTab("tracker")} icon={<Clock size={20} />} label="Jadwal" />
        <NavButton active={activeTab === "game"} onClick={() => setActiveTab("game")} icon={<Gamepad2 size={20} />} label="Booster" />
        <NavButton active={activeTab === "edukasi"} onClick={() => setActiveTab("edukasi")} icon={<BookOpen size={20} />} label="Edukasi" />
      </nav>
    </div>
  );
};

// --- Components ---

const NavButton = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? "text-pink-600 -translate-y-1" : "text-gray-400 hover:text-pink-400"}`}>
    <div className={`${active ? "bg-pink-100 p-1.5 rounded-xl" : ""}`}>{icon}</div>
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

const HomeView = ({ setActiveTab }) => (
  <div className="space-y-6 animate-fade-in">
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Halo, Sobat Lambora!</h2>
      <p className="text-gray-500 text-sm mb-4">Sudahkah kamu menjaga asam lambungmu hari ini?</p>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => setActiveTab("tracker")} className="bg-rose-100 text-rose-600 p-3 rounded-2xl text-sm font-bold hover:bg-rose-200 transition">
          ⏰ Atur Makan
        </button>
        <button onClick={() => setActiveTab("game")} className="bg-emerald-100 text-emerald-600 p-3 rounded-2xl text-sm font-bold hover:bg-emerald-200 transition">
          🎮 Main Game
        </button>
      </div>
    </div>

    <div className="space-y-2">
      <h3 className="font-bold text-gray-700 px-1">Status Terkini</h3>
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between">
        <div>
          <p className="text-blue-100 text-xs">Kondisi Lambung</p>
          <p className="font-bold text-lg">Stabil</p>
        </div>
        <CheckCircle size={32} className="text-blue-200" />
      </div>
    </div>
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
    </div>
  </div>
);

const TrackerView = ({ nextMealTime, setNextMealTime, requestNotification, setHealth }) => {
  const [timeLeft, setTimeLeft] = useState("");

  // Logic Timer 4 Jam
  useEffect(() => {
    if (!nextMealTime) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = nextMealTime - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft("WAKTUNYA MAKAN!");

        // Trigger Notification
        if (Notification.permission === "granted") {
          new Notification("Lambora Reminder", {
            body: "Sudah 4 jam! Waktunya isi perut agar asam lambung tidak naik.",
            icon: "https://cdn-icons-png.flaticon.com/512/706/706164.png",
          });
        }

        // Hukuman Game: Jika telat makan, kurangi health 5 poin (sesuai request)
        setHealth((prev) => Math.max(0, prev - 5));
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}j ${minutes}m ${seconds}d`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextMealTime, setHealth]);

  const startTimer = () => {
    requestNotification();
    // Set 4 jam dari sekarang
    const fourHoursLater = new Date().getTime() + 4 * 60 * 60 * 1000;
    // const fourHoursLater = new Date().getTime() + (10 * 1000); // UNCOMMENT UNTUK TESTING (10 detik)
    setNextMealTime(fourHoursLater);
  };

  const resetTimer = () => {
    setNextMealTime(null);
    setTimeLeft("");
  };

  return (
    <div className="space-y-6 text-center animate-fade-in">
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-pink-100">
        <div className="w-40 h-40 bg-pink-50 rounded-full mx-auto flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 border-4 border-pink-200 rounded-full animate-pulse"></div>
          {nextMealTime ? <div className="text-3xl font-mono font-bold text-pink-600">{timeLeft}</div> : <Clock size={64} className="text-pink-300" />}
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-2">Jadwal Makan 4 Jam</h2>
        <p className="text-gray-500 text-sm mb-6">Kami akan mengingatkanmu setiap 4 jam sekali untuk menjaga kadar asam lambung.</p>

        {!nextMealTime ? (
          <button onClick={startTimer} className="w-full bg-pink-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-pink-200 active:scale-95 transition">
            Mulai Hitung Mundur
          </button>
        ) : (
          <div className="space-y-3">
            <div className="text-xs text-orange-500 font-medium bg-orange-50 py-2 rounded-lg">Notifikasi aktif. Jangan tutup tab ini sepenuhnya.</div>
            <button onClick={resetTimer} className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition">
              Reset / Saya Sudah Makan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const EducationView = () => (
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
  </div>
);

const GameView = ({ health, setHealth, nextMealTime }) => {
  const [characterState, setCharacterState] = useState("normal"); // normal, happy, sick
  const [feedback, setFeedback] = useState("");
  const [showMenu, setShowMenu] = useState(false); // State untuk menampilkan menu makanan

  // Database Makanan
  const foods = [
    { name: "Oatmeal", type: "good", icon: "🥣" },
    { name: "Pisang", type: "good", icon: "🍌" },
    { name: "Brokoli", type: "good", icon: "🥦" },
    { name: "Gorengan", type: "bad", icon: "🍤" },
    { name: "Kopi", type: "bad", icon: "☕" },
    { name: "Sambal", type: "bad", icon: "🌶️" },
    { name: "Pepaya", type: "good", icon: "🥔" },
    { name: "Cokelat", type: "bad", icon: "🍫" },
  ];

  const handleSelectFood = (food) => {
    // Tutup menu
    setShowMenu(false);
    setFeedback(`Kamu memberi: ${food.name} ${food.icon}`);

    if (food.type === "good") {
      setHealth((prev) => Math.min(100, prev + 5));
      setCharacterState("happy");
      setTimeout(() => setCharacterState("normal"), 1500);
    } else {
      setHealth((prev) => Math.max(0, prev - 10)); // Request: berkurang jika ga sehat
      setCharacterState("sick");
      setTimeout(() => setCharacterState("normal"), 2000);
    }
  };

  // Visual Karakter
  const getCharacterEmoji = () => {
    if (health <= 0) return "💀";
    if (characterState === "sick") return "🤢"; // Hijau saat sakit (makan kotor)
    if (characterState === "happy") return "😋";
    if (health < 50) return "🥴";
    return "😊";
  };

  // Warna Karakter (Visual Filter)
  const getCharacterColor = () => {
    if (characterState === "sick") return "filter hue-rotate-90 sepia transition-all duration-500"; // Efek hijau
    return "transition-all duration-300";
  };

  return (
    <div className="space-y-6 text-center animate-fade-in relative h-full">
      <div className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-[2rem] shadow-inner border border-blue-100 relative overflow-hidden">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Booster Lambung</h2>

        {/* Health Bar */}
        <div className="w-full bg-gray-200 rounded-full h-6 mb-2 relative overflow-hidden border border-gray-300">
          <div className={`h-full transition-all duration-500 ${health > 50 ? "bg-green-500" : health > 20 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${health}%` }}></div>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-md">HP: {health}%</span>
        </div>

        {/* Character Stage */}
        <div className="h-48 flex items-center justify-center relative my-6">
          {/* Background decoration */}
          <div className="absolute w-40 h-40 bg-yellow-100 rounded-full blur-xl opacity-50 z-0"></div>

          {/* The Character */}
          <div className={`text-[8rem] z-10 transform transition-transform ${characterState === "happy" ? "scale-110 bounce" : ""} ${getCharacterColor()}`}>{getCharacterEmoji()}</div>

          {/* Feedback Text Float */}
          {feedback && <div className="absolute top-0 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm animate-bounce text-gray-600 z-10">{feedback}</div>}
        </div>

        {/* Controls */}
        <button
          onClick={() => setShowMenu(true)}
          disabled={health <= 0}
          className={`w-full py-4 rounded-2xl font-bold text-lg text-white shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2
            ${health <= 0 ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 shadow-orange-200"}
          `}
        >
          <Utensils className="fill-white/20" /> {health <= 0 ? "Game Over" : "Pilih Makanan"}
        </button>

        <p className="mt-4 text-xs text-gray-400">*Pilih makanan sehat untuk menambah HP!</p>

        {health <= 0 && (
          <button onClick={() => setHealth(100)} className="mt-4 text-sm text-blue-500 font-bold underline cursor-pointer">
            Reset Game
          </button>
        )}

        {/* Floating Menu Modal */}
        {showMenu && health > 0 && (
          <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-[2px] flex items-end animate-fade-in">
            <div className="bg-white w-full rounded-t-[2rem] p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] animate-slide-up max-h-[70%] overflow-y-auto">
              <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="font-bold text-gray-800">Mau makan apa?</h3>
                <button onClick={() => setShowMenu(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {foods.map((food, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectFood(food)}
                    className={`
                      p-3 rounded-xl border flex flex-col items-center gap-1 transition active:scale-95
                      ${food.type === "good" ? "bg-green-50 border-green-100 hover:bg-green-100" : "bg-red-50 border-red-100 hover:bg-red-100"}
                    `}
                  >
                    <span className="text-2xl">{food.icon}</span>
                    <span className="font-bold text-sm text-gray-700">{food.name}</span>
                    <span className={`text-[10px] font-bold ${food.type === "good" ? "text-green-600" : "text-red-500"}`}>{food.type === "good" ? "+5 HP" : "-10 HP"}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LamboraApp;
