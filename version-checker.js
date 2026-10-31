/**
 * Grimheim Automatic Version & Cache Management System
 * Automatically checks version.json to ensure mobile and desktop clients
 * always run the latest version without aggressive browser caching issues.
 */
(function() {
    const SCRIPT_VERSION = (document.currentScript && document.currentScript.src)
        ? new URL(document.currentScript.src, window.location.href).searchParams.get('v')
        : null;
    const CURRENT_VERSION = SCRIPT_VERSION || '1.0.8';
    const SCRIPT_BASE_URL = (document.currentScript && document.currentScript.src)
        ? new URL('.', document.currentScript.src).href
        : new URL('.', window.location.href).href;
    let isChecking = false;
    let toastShown = false;

    // Purge browser caches (Cache API and Service Workers)
    async function purgeCaches() {
        if ('caches' in window) {
            try {
                const keys = await caches.keys();
                await Promise.all(keys.map(k => caches.delete(k)));
            } catch (e) {
                console.warn('[VersionChecker] Could not clear CacheStorage:', e);
            }
        }
        if ('serviceWorker' in navigator) {
            try {
                const regs = await navigator.serviceWorker.getRegistrations();
                for (const r of regs) await r.unregister();
            } catch (e) {
                console.warn('[VersionChecker] Could not unregister ServiceWorker:', e);
            }
        }
    }

    // Force an immediate reload with a cache-busting timestamp/version
    async function applyUpdate(targetVersion) {
        const versionToApply = targetVersion || CURRENT_VERSION;
        await purgeCaches();
        try {
            // Force browser HTTP disk cache to overwrite the current HTML document
            await fetch(window.location.pathname, { cache: 'reload', credentials: 'same-origin' });
        } catch (e) {
            // Ignore network errors
        }
        localStorage.setItem('grimheim_app_version', versionToApply);
        try {
            sessionStorage.setItem('grimheim_applied_version', versionToApply);
        } catch (e) {}
        
        const url = new URL(window.location.href);
        url.searchParams.set('_v', versionToApply);
        url.searchParams.set('_t', Date.now().toString());
        window.location.replace(url.toString());
    }

    // Expose manual force-update helper for UI buttons
    window.forceAppUpdate = () => applyUpdate(CURRENT_VERSION);

    // Display a sleek, themed update toast if an update happens while the user is actively working
    function showUpdateToast(newVersion) {
        if (toastShown || document.getElementById('grimheim-update-toast')) return;
        toastShown = true;

        const toast = document.createElement('div');
        toast.id = 'grimheim-update-toast';
        toast.className = 'fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-[999999] bg-slate-900/95 border-2 border-[#c5a059] text-white p-4 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.8)] backdrop-blur-md flex flex-col gap-3 transition-all duration-300';
        toast.innerHTML = `
            <div class="flex items-start justify-between">
                <div class="flex items-center space-x-2.5">
                    <span class="text-[#c5a059] text-xl"><i class="fas fa-sparkles"></i></span>
                    <h4 class="font-bold text-sm sm:text-base text-yellow-100 font-['Cinzel',serif] tracking-wide">
                        Nueva Versión Disponible
                    </h4>
                </div>
                <button type="button" id="dismiss-update-btn" class="text-slate-400 hover:text-white text-sm p-1 transition" title="Cerrar">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
                Se ha publicado la versión <strong class="text-[#dfbc77]">v${newVersion}</strong> con mejoras y correcciones. Actualiza para aplicar los cambios.
            </p>
            <div class="flex justify-end items-center space-x-2 pt-1">
                <button type="button" id="dismiss-update-btn-secondary" class="px-3 py-1.5 text-xs text-slate-400 hover:text-white transition">
                    Más tarde
                </button>
                <button type="button" id="apply-update-btn" class="px-4 py-1.5 bg-[#c5a059] hover:bg-[#dfbc77] text-slate-950 font-bold rounded-lg text-xs transition flex items-center shadow cursor-pointer">
                    <i class="fas fa-sync-alt mr-1.5"></i> Actualizar Ahora
                </button>
            </div>
        `;

        document.body.appendChild(toast);

        const executeUpdate = async () => {
            const btn = document.getElementById('apply-update-btn');
            if (btn) btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1.5"></i> Actualizando...';
            await applyUpdate(newVersion);
        };

        document.getElementById('apply-update-btn')?.addEventListener('click', executeUpdate);
        document.getElementById('dismiss-update-btn')?.addEventListener('click', () => toast.remove());
        document.getElementById('dismiss-update-btn-secondary')?.addEventListener('click', () => toast.remove());
    }

    async function checkVersion(isInitial = false) {
        if (isChecking) return;
        isChecking = true;

        try {
            // Cache-busting fetch that cannot be cached by mobile browsers or proxies
            const versionUrl = new URL('version.json', SCRIPT_BASE_URL);
            versionUrl.searchParams.set('_t', Date.now().toString());
            const res = await fetch(versionUrl.toString(), {
                cache: 'no-store',
                headers: { 'Cache-Control': 'no-cache, no-store' }
            });

            if (!res.ok) return;

            const info = await res.json();
            const remoteVersion = info.version;
            const storedVersion = localStorage.getItem('grimheim_app_version');

            if (remoteVersion && remoteVersion !== CURRENT_VERSION) {
                const urlParams = new URLSearchParams(window.location.search);
                const currentVParam = urlParams.get('_v');
                let appliedInSession = null;
                try {
                    appliedInSession = sessionStorage.getItem('grimheim_applied_version');
                } catch (e) {}

                // Avoid infinite update prompt if user already applied this exact version in this session
                if (appliedInSession === remoteVersion || currentVParam === remoteVersion) {
                    localStorage.setItem('grimheim_app_version', remoteVersion);
                    return;
                }

                console.log(`[VersionChecker] Nueva versión disponible: ${remoteVersion} (actual: ${CURRENT_VERSION})`);

                // If this is the initial load and the current URL does not reflect the new version,
                // auto-reload immediately so the user sees the latest version seamlessly
                if (isInitial && currentVParam !== remoteVersion) {
                    await applyUpdate(remoteVersion);
                    return;
                }

                // If already loaded or user is working, display the non-intrusive toast
                showUpdateToast(remoteVersion);
            } else {
                localStorage.setItem('grimheim_app_version', CURRENT_VERSION);
            }
        } catch (err) {
            // Offline or network error - fail silently
        } finally {
            isChecking = false;
        }
    }

    // 1. Initial check on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => checkVersion(true));
    } else {
        checkVersion(true);
    }

    // 2. Check when mobile browser restores page from BFCache (iOS Safari / Mobile Chrome)
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            checkVersion(true);
        }
    });

    // 3. Check whenever user returns to the tab or unlocks phone
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            checkVersion(true);
        }
    });

    // 4. Periodic check every 5 minutes
    setInterval(() => checkVersion(false), 5 * 60 * 1000);
})();
