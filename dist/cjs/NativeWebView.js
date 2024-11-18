"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeWebView = void 0;
/* eslint-disable  @typescript-eslint/ban-ts-comment  */
const react_1 = __importStar(require("react"));
const react_native_webview_1 = require("react-native-webview");
const cross_inpage_provider_core_1 = require("@cross-inpage-provider-core");
const JsBridgeNativeHost_1 = require("./JsBridgeNativeHost");
// TODO rename to NativeWebViewLegacy
const NativeWebView = (0, react_1.forwardRef)((_a, ref) => {
    var { style, src, receiveHandler, onSrcChange, onLoadProgress, injectedJavaScriptBeforeContentLoaded, onMessage } = _a, props = __rest(_a, ["style", "src", "receiveHandler", "onSrcChange", "onLoadProgress", "injectedJavaScriptBeforeContentLoaded", "onMessage"]);
    const webviewRef = (0, react_1.useRef)(null);
    const jsBridge = (0, react_1.useMemo)(() => new JsBridgeNativeHost_1.JsBridgeNativeHost({
        webviewRef,
        receiveHandler,
    }), [receiveHandler]);
    const webviewOnMessage = (0, react_1.useCallback)((event) => {
        const { data } = event.nativeEvent;
        let origin = '';
        try {
            const uri = new URL(event.nativeEvent.url);
            origin = (uri === null || uri === void 0 ? void 0 : uri.origin) || '';
        }
        catch (err) {
            console.error(err);
        }
        cross_inpage_provider_core_1.appDebugLogger.webview('onMessage', origin, data);
        // - receive
        jsBridge.receive(data, { origin });
        onMessage === null || onMessage === void 0 ? void 0 : onMessage(event);
    }, [jsBridge, onMessage]);
    (0, react_1.useImperativeHandle)(ref, () => {
        const wrapper = {
            innerRef: webviewRef.current,
            jsBridge,
            reload: () => { var _a; return (_a = webviewRef.current) === null || _a === void 0 ? void 0 : _a.reload(); },
            loadURL: (url) => {
                // ReactNativeWebview do not has method to loadURL
                // so we need src props change it
                if (onSrcChange) {
                    onSrcChange(url);
                }
                else {
                    console.warn('NativeWebView: Please pass onSrcChange props to enable loadURL() working.');
                }
            },
        };
        jsBridge.webviewWrapper = wrapper;
        return wrapper;
    });
    (0, react_1.useEffect)(() => {
        // console.log('NativeWebView injectedJavaScript \r\n', injectedNative);
    }, []);
    return (react_1.default.createElement(react_native_webview_1.WebView
    // @ts-ignore
    , Object.assign({ 
        // @ts-ignore
        style: [{ backgroundColor: 'transparent' }, style], onLoadProgress: onLoadProgress, ref: webviewRef, 
        // injectedJavaScript={injectedNative}
        injectedJavaScriptBeforeContentLoaded: injectedJavaScriptBeforeContentLoaded || '', source: { uri: src }, onMessage: webviewOnMessage }, props)));
});
exports.NativeWebView = NativeWebView;
NativeWebView.displayName = 'NativeWebView';
