"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWebViewBridge = void 0;
const react_1 = require("react");
function useWebViewBridge() {
    const webviewRef = (0, react_1.useRef)(null);
    const [jsBridge, setJsBridge] = (0, react_1.useState)(null);
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
exports.useWebViewBridge = useWebViewBridge;
