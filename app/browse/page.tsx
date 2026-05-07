"use client";

import { useState, useEffect, useCallback, KeyboardEvent, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function BrowserContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialUrl = searchParams.get("url") || "";

  const [url, setUrl] = useState(initialUrl);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showNav, setShowNav] = useState(false);

  const getProxyUrl = (targetUrl: string) => {
    return `/api/proxy?url=${encodeURIComponent(targetUrl)}`;
  };

  const navigateTo = useCallback(
    (targetUrl: string) => {
      setIsLoading(true);
      const newHistory = [...history.slice(0, historyIndex + 1), targetUrl];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setCurrentUrl(getProxyUrl(targetUrl));
      setUrl(targetUrl);
    },
    [history, historyIndex]
  );

  useEffect(() => {
    if (initialUrl) {
      navigateTo(initialUrl);
    }
  }, []);

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(getProxyUrl(history[newIndex]));
      setUrl(history[newIndex]);
      setIsLoading(true);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(getProxyUrl(history[newIndex]));
      setUrl(history[newIndex]);
      setIsLoading(true);
    }
  };

  const goHome = () => {
    router.push("/");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && url.trim()) {
      let targetUrl = url.trim();
      if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
        if (targetUrl.includes(".") && !targetUrl.includes(" ")) {
          targetUrl = "https://" + targetUrl;
        } else {
          targetUrl = "https://duckduckgo.com/?q=" + encodeURIComponent(targetUrl);
        }
      }
      navigateTo(targetUrl);
    }
  };

  const getDisplayUrl = () => {
    if (historyIndex >= 0 && history[historyIndex]) {
      try {
        const urlObj = new URL(history[historyIndex]);
        return urlObj.hostname.replace("www.", "");
      } catch {
        return history[historyIndex];
      }
    }
    return "";
  };

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden">
      {/* Hover trigger area */}
      <div
        className="absolute top-0 left-0 right-0 h-3 z-50"
        onMouseEnter={() => setShowNav(true)}
      />

      {/* Navigation Bar - slides in from top */}
      <nav
        className={`absolute top-0 left-0 right-0 z-40 flex items-center gap-2 px-3 py-2 bg-black/95 backdrop-blur-sm border-b border-white/10 transition-transform duration-200 ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
        onMouseLeave={() => setShowNav(false)}
      >
        <button
          onClick={goHome}
          className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          title="Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </button>
        
        <button
          onClick={goBack}
          disabled={historyIndex <= 0}
          className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          title="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        
        <button
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          title="Forward"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>

        <div className="flex-1 flex items-center bg-white/5 rounded-lg border border-white/10 overflow-hidden">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search or enter URL..."
            className="flex-1 px-4 py-2 bg-transparent text-white text-sm outline-none placeholder:text-white/30"
            autoComplete="off"
          />
          <span className="px-3 py-2 text-xs text-white/30 border-l border-white/10">
            {getDisplayUrl()}
          </span>
        </div>

        <button
          onClick={() => currentUrl && navigateTo(history[historyIndex])}
          className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          title="Refresh"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
          </svg>
        </button>
      </nav>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-30">
          <div className="w-10 h-10 border-2 border-white/10 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Fullscreen Iframe */}
      {currentUrl && (
        <iframe
          src={currentUrl}
          className="w-full h-full border-none bg-black"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-popups-to-escape-sandbox"
        />
      )}
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-white/10 border-t-white rounded-full animate-spin" />
      </div>
    }>
      <BrowserContent />
    </Suspense>
  );
}
