"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsIpcReady = void 0;
const react_1 = require("react");
function useIsIpcReady() {
    const [isIpcReady, setIsIpcReady] = (0, react_1.useState)(false);
    const checkReady = (0, react_1.useCallback)(() => {
        var _a;
        const isBridgeInjected = Boolean((_a = window === null || window === void 0 ? void 0 : window.CHARGERWALLET_DESKTOP_GLOBALS) === null || _a === void 0 ? void 0 : _a.preloadJsUrl);
        if (isBridgeInjected) {
            setIsIpcReady(true);
        }
        else {
            setTimeout(checkReady, 100);
        }
    }, []);
    (0, react_1.useEffect)(() => {
        checkReady();
    }, [checkReady]);
    (0, react_1.useEffect)(() => {
        if (isIpcReady) {
            return;
        }
        const timer = setTimeout(() => {
            if (!isIpcReady) {
                console.error('electron ipc not ready yet, can not render <webview>, do you forget set parameter [preload] at new BrowserWindow() in app.ts ?');
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [isIpcReady]);
    return isIpcReady;
}
exports.useIsIpcReady = useIsIpcReady;
