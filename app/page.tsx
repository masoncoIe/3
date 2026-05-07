"use client";

import { useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

const quickApps = [
  { name: "Google", url: "https://google.com", icon: "G" },
  { name: "YouTube", url: "https://youtube.com", icon: "▶" },
  { name: "TikTok", url: "https://tiktok.com", icon: "♪" },
  { name: "Discord", url: "https://discord.com", icon: "💬" },
  { name: "Reddit", url: "https://reddit.com", icon: "R" },
  { name: "Twitter", url: "https://x.com", icon: "X" },
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;
    
    let targetUrl = query.trim();
    
    // Check if it's a valid URL
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      if (targetUrl.includes(".") && !targetUrl.includes(" ")) {
        targetUrl = "https://" + targetUrl;
      } else {
        targetUrl = "https://duckduckgo.com/?q=" + encodeURIComponent(targetUrl);
      }
    }
    
    router.push(`/browse?url=${encodeURIComponent(targetUrl)}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const openApp = (url: string) => {
    router.push(`/browse?url=${encodeURIComponent(url)}`);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-12 px-6 w-full max-w-2xl">
        {/* Logo */}
        <h1 className="text-6xl md:text-7xl font-semibold tracking-[0.5em] text-white/90 font-serif">
          COLE
        </h1>

        {/* Search Bar */}
        <div className="w-full">
          <div className="flex bg-black/60 backdrop-blur-md border border-white/10 rounded-full overflow-hidden shadow-2xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search or enter URL..."
              className="flex-1 px-6 py-4 bg-transparent text-white text-base outline-none placeholder:text-white/30"
              autoComplete="off"
              autoFocus
            />
            <button
              onClick={handleSearch}
              className="px-6 py-4 text-white/60 hover:text-white transition-colors"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick Apps */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
          {quickApps.map((app) => (
            <button
              key={app.name}
              onClick={() => openApp(app.url)}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl text-white/80 group-hover:text-white group-hover:bg-white/15 transition-all">
                {app.icon}
              </div>
              <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
                {app.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
