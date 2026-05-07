"use client";

import { useState, useCallback, KeyboardEvent } from "react";

export default function ColeBrowser() {
  const [url, setUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const isValidUrl = (string: string) => {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  const formatUrl = (input: string) => {
    if (isValidUrl(input)) {
      return input;
    }
    if (input.includes(".") && !input.includes(" ")) {
      return "https://" + input;
    }
    return "https://duckduckgo.com/?q=" + encodeURIComponent(input);
  };

  const getProxyUrl = (targetUrl: string) => {
    // Use our API route to proxy the content
    return `/api/proxy?url=${encodeURIComponent(targetUrl)}`;
  };

  const navigateTo = useCallback(
    (input: string) => {
      const targetUrl = formatUrl(input);

      setIsLoading(true);

      // Update history
      const newHistory = [...history.slice(0, historyIndex + 1), targetUrl];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);

      setCurrentUrl(getProxyUrl(targetUrl));
      setUrl(input);
    },
    [history, historyIndex]
  );

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(getProxyUrl(history[newIndex]));
      setIsLoading(true);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(getProxyUrl(history[newIndex]));
      setIsLoading(true);
    }
  };

  const goHome = () => {
    setCurrentUrl(null);
    setUrl("");
    setHistory([]);
    setHistoryIndex(-1);
    setIsLoading(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && url.trim()) {
      navigateTo(url.trim());
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
    return "—";
  };

  return (
    <div
      className="flex flex-col h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 -z-10" />

      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm px-8 py-5 border-b border-white/10 shadow-2xl">
        <h1 className="text-center text-3xl text-white font-semibold tracking-[0.5em] mb-5 font-[var(--font-cinzel)]">
          C O L E
        </h1>
        <div className="flex gap-0 max-w-3xl mx-auto">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter destination..."
            className="flex-1 px-6 py-3.5 bg-black border border-white/15 border-r-0 text-white text-sm outline-none transition-all focus:border-white/25 focus:bg-black/80 focus:shadow-inner placeholder:text-white/20 placeholder:italic font-[var(--font-cormorant)] tracking-wide"
            autoComplete="off"
          />
          <button
            onClick={() => url.trim() && navigateTo(url.trim())}
            className="px-8 py-3.5 bg-black border border-white/15 text-white text-xs cursor-pointer transition-all hover:bg-white/5 hover:border-white/25 hover:shadow-lg active:bg-white/10 font-[var(--font-cinzel)] tracking-widest uppercase font-medium"
          >
            Enter
          </button>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="flex justify-center items-center gap-4 px-8 py-3 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <button
          onClick={goBack}
          disabled={historyIndex <= 0}
          className="px-4 py-2 text-xs bg-black border border-white/15 text-white transition-all hover:bg-white/5 hover:border-white/25 disabled:opacity-30 disabled:cursor-not-allowed font-[var(--font-cinzel)]"
        >
          Back
        </button>
        <button
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          className="px-4 py-2 text-xs bg-black border border-white/15 text-white transition-all hover:bg-white/5 hover:border-white/25 disabled:opacity-30 disabled:cursor-not-allowed font-[var(--font-cinzel)]"
        >
          Forward
        </button>
        <button
          onClick={goHome}
          className="px-4 py-2 text-xs bg-black border border-white/15 text-white transition-all hover:bg-white/5 hover:border-white/25 font-[var(--font-cinzel)]"
        >
          Home
        </button>
        <div className="flex-1 max-w-xl px-6 py-2 text-center text-xs text-white/30 border border-white/10 font-[var(--font-cormorant)] tracking-wider overflow-hidden text-ellipsis whitespace-nowrap">
          {getDisplayUrl()}
        </div>
      </nav>

      {/* Content Area */}
      <main className="flex-1 relative overflow-hidden bg-black">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="w-10 h-10 border-2 border-white/10 border-t-white rounded-full animate-spin" />
          </div>
        )}

        {/* Home Screen */}
        {!currentUrl && (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-8xl font-semibold tracking-[1em] mb-8 font-[var(--font-cinzel)] text-white/90">
              C O L E
            </h2>
            <p className="text-lg text-white/30 tracking-widest italic font-[var(--font-cormorant)]">
              A Gateway to the Web
            </p>
          </div>
        )}

        {/* Iframe */}
        {currentUrl && (
          <iframe
            src={currentUrl}
            className="w-full h-full border-none bg-black"
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-popups-to-escape-sandbox"
          />
        )}
      </main>
    </div>
  );
}
