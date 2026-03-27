// Service Worker Registration for Cole Browser
async function registerSW() {
    if (!navigator.serviceWorker) {
        throw new Error("Service workers are not supported in this browser.");
    }

    try {
        const registration = await navigator.serviceWorker.register("/uv/sw.js", {
            scope: __uv$config.prefix,
        });
        
        console.log("[Cole] Service Worker registered:", registration.scope);
        return registration;
    } catch (err) {
        console.error("[Cole] Service Worker registration failed:", err);
        throw err;
    }
}
