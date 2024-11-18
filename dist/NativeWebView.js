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
/* eslint-disable  @typescript-eslint/ban-ts-comment  */
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, } from 'react';
import { WebView } from 'react-native-webview';
import { appDebugLogger } from '@cross-inpage-provider-core';
import { JsBridgeNativeHost } from './JsBridgeNativeHost';
// TODO rename to NativeWebViewLegacy
const NativeWebView = forwardRef((_a, ref) => {
    var { style, src, receiveHandler, onSrcChange, onLoadProgress, injectedJavaScriptBeforeContentLoaded, onMessage } = _a, props = __rest(_a, ["style", "src", "receiveHandler", "onSrcChange", "onLoadProgress", "injectedJavaScriptBeforeContentLoaded", "onMessage"]);
    const webviewRef = useRef(null);
    const jsBridge = useMemo(() => new JsBridgeNativeHost({
        webviewRef,
        receiveHandler,
    }), [receiveHandler]);
    const webviewOnMessage = useCallback((event) => {
        const { data } = event.nativeEvent;
        let origin = '';
        try {
            const uri = new URL(event.nativeEvent.url);
            origin = (uri === null || uri === void 0 ? void 0 : uri.origin) || '';
        }
        catch (err) {
            console.error(err);
        }
        appDebugLogger.webview('onMessage', origin, data);
        // - receive
        jsBridge.receive(data, { origin });
        onMessage === null || onMessage === void 0 ? void 0 : onMessage(event);
    }, [jsBridge, onMessage]);
    useImperativeHandle(ref, () => {
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
    useEffect(() => {
        // console.log('NativeWebView injectedJavaScript \r\n', injectedNative);
    }, []);
    return (React.createElement(WebView
    // @ts-ignore
    , Object.assign({ 
        // @ts-ignore
        style: [{ backgroundColor: 'transparent' }, style], onLoadProgress: onLoadProgress, ref: webviewRef, 
        // injectedJavaScript={injectedNative}
        injectedJavaScriptBeforeContentLoaded: injectedJavaScriptBeforeContentLoaded || '', source: { uri: src }, onMessage: webviewOnMessage }, props)));
});
NativeWebView.displayName = 'NativeWebView';
export { NativeWebView };
