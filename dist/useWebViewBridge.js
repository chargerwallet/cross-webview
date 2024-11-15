import { useRef, useState } from 'react';
export function useWebViewBridge() {
    const webviewRef = useRef(null);
    const [jsBridge, setJsBridge] = useState(null);
    // web3 provider
    // const [provider, setProvider] = useState(null);
    const setWebViewRef = (ref) => {
        var _a;
        webviewRef.current = ref;
        const newJsBridge = (_a = webviewRef.current) === null || _a === void 0 ? void 0 : _a.jsBridge;
        if (newJsBridge) {
            setJsBridge(newJsBridge);
        }
    };
    return {
        jsBridge,
        // provider,
        webviewRef,
        setWebViewRef,
    };
}
