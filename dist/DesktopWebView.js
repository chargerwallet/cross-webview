var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-explicit-any */
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, } from 'react';
import { consts } from '@cross-inpage-provider-core';
import { JsBridgeDesktopHost } from './JsBridgeDesktopHost';
import { useIsIpcReady } from './useIsIpcReady';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';
const isDev = process.env.NODE_ENV !== 'production';
const isBrowser = true;
function usePreloadJsUrl() {
    var _a;
    const { preloadJsUrl } = (_a = window.CHARGERWALLET_DESKTOP_GLOBALS) !== null && _a !== void 0 ? _a : {};
    useEffect(() => {
        if (preloadJsUrl) {
            return;
        }
        const timer = setTimeout(() => {
            if (!preloadJsUrl) {
                console.error(`Webview render failed:
      Please send messages of channel SET_CHARGERWALLET_DESKTOP_GLOBALS at app start
      `);
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [preloadJsUrl]);
    return preloadJsUrl;
}
// Used for webview type referencing
const WEBVIEW_TAG = 'webview';
export function waitAsync(timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}
export function waitForDataLoaded({ data, wait = 600, logName, timeout = 0, }) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            void (() => __awaiter(this, void 0, void 0, function* () {
                let timeoutReject = false;
                let timer = null;
                const getDataArrFunc = [].concat(data);
                if (timeout) {
                    timer = setTimeout(() => {
                        timeoutReject = true;
                    }, timeout);
                }
                // eslint-disable-next-line no-constant-condition
                while (true) {
                    let isAllLoaded = true;
                    yield Promise.all(getDataArrFunc.map((getData) => __awaiter(this, void 0, void 0, function* () {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        const d = yield getData();
                        if (d === false) {
                            isAllLoaded = false;
                            return;
                        }
                        if (isNil(d)) {
                            isAllLoaded = false;
                            return;
                        }
                        if (isEmpty(d)) {
                            if (isPlainObject(d) || isArray(d)) {
                                isAllLoaded = false;
                                return;
                            }
                        }
                    })));
                    if (isAllLoaded || timeoutReject) {
                        break;
                    }
                    yield waitAsync(wait);
                    if (logName) {
                        console.log(`waitForDataLoaded: ${logName}`);
                    }
                }
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                clearTimeout(timer);
                if (timeoutReject) {
                    reject(new Error(`waitForDataLoaded: ${logName !== null && logName !== void 0 ? logName : ''} timeout`));
                }
                else {
                    resolve();
                }
            }))();
        });
    });
}
const DesktopWebView = forwardRef((_a, ref) => {
    var { src, style, receiveHandler, onSrcChange } = _a, props = __rest(_a, ["src", "style", "receiveHandler", "onSrcChange"]);
    const [isWebviewReady, setIsWebviewReady] = useState(false);
    const webviewRef = useRef(null);
    const isIpcReady = useIsIpcReady();
    const [devToolsAtLeft, setDevToolsAtLeft] = useState(false);
    if (props.preload) {
        console.warn('DesktopWebView:  custom preload url may disable built-in injected function');
    }
    useEffect(() => () => {
        var _a;
        // not working, ref is null after unmount
        (_a = webviewRef.current) === null || _a === void 0 ? void 0 : _a.closeDevTools();
    }, []);
    // TODO extract to hooks
    const jsBridgeHost = useMemo(() => new JsBridgeDesktopHost({
        webviewRef,
        receiveHandler,
    }), [receiveHandler]);
    useImperativeHandle(ref, () => {
        const wrapper = {
            innerRef: webviewRef.current,
            jsBridge: jsBridgeHost,
            reload: () => { var _a; return (_a = webviewRef.current) === null || _a === void 0 ? void 0 : _a.reload(); },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            loadURL: (url, options) => {
                if (onSrcChange) {
                    onSrcChange(url);
                }
                else {
                    console.warn('DesktopWebView: Please pass onSrcChange props to enable loadURL() working.');
                }
                // use onSrcChange props change src
                //    do not need call ElectronWebView.loadURL() manually.
                // webviewRef.current?.loadURL(url);
            },
        };
        jsBridgeHost.webviewWrapper = wrapper;
        return wrapper;
    });
    const initWebviewByRef = useCallback(($ref) => {
        webviewRef.current = $ref;
        // desktop "ipc-message" listener must be added after webviewReady
        //    so use ref to check it
        setIsWebviewReady(true);
    }, []);
    useEffect(() => {
        const webview = webviewRef.current;
        if (!webview || !isIpcReady || !isWebviewReady) {
            return;
        }
        const handleMessage = (event) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            if (event.channel === consts.JS_BRIDGE_MESSAGE_IPC_CHANNEL) {
                const data = (_a = event === null || event === void 0 ? void 0 : event.args) === null || _a === void 0 ? void 0 : _a[0];
                let originInRequest = '';
                try {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    originInRequest = (_b = JSON.parse(data)) === null || _b === void 0 ? void 0 : _b.origin;
                }
                catch (error) {
                    // noop
                }
                finally {
                    // noop
                }
                let origin = '';
                yield waitForDataLoaded({
                    wait: 600,
                    logName: 'DesktopWebView waitForDataLoaded if origin matched',
                    timeout: 5000,
                    data: () => {
                        let originInUrl = '';
                        // url initial value is empty after webview mounted first time
                        const url1 = event.target.getURL(); // url won't update immediately when goForward or goBack
                        const url2 = event.target.src;
                        const url3 = src;
                        const url = url1 || url2 || url3;
                        if (url) {
                            try {
                                const uri = new URL(url);
                                originInUrl = (uri === null || uri === void 0 ? void 0 : uri.origin) || '';
                            }
                            catch (error) {
                                // noop
                            }
                            finally {
                                // noop
                            }
                        }
                        if (originInUrl && originInRequest && originInUrl === originInRequest) {
                            origin = originInRequest;
                            return true;
                        }
                        return false;
                    },
                });
                if (origin) {
                    // - receive
                    jsBridgeHost.receive(data, { origin });
                }
                else {
                    // TODO log error if url is empty
                }
            }
            // response back
            // webview.send();
        });
        webview.addEventListener('ipc-message', handleMessage);
        return () => {
            webview.removeEventListener('ipc-message', handleMessage);
        };
    }, [jsBridgeHost, isIpcReady, isWebviewReady, src]);
    const preloadJsUrl = usePreloadJsUrl();
    if (!preloadJsUrl) {
        return null;
    }
    if (!isIpcReady) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        isDev && (React.createElement("button", { type: "button", style: {
                fontSize: 12,
                padding: 0,
                opacity: 0.6,
                position: 'absolute',
                right: devToolsAtLeft ? undefined : 0,
                left: devToolsAtLeft ? 0 : undefined,
            }, onClick: () => {
                var _a;
                setDevToolsAtLeft(!devToolsAtLeft);
                (_a = webviewRef.current) === null || _a === void 0 ? void 0 : _a.openDevTools();
            } }, "DevTools")),
        isBrowser && (React.createElement("webview", Object.assign({ ref: initWebviewByRef, preload: preloadJsUrl, src: isIpcReady && isWebviewReady ? src : undefined, style: Object.assign({ 'width': '100%', 'height': '100%' }, style), 
            // @ts-ignore
            allowpopups: "true", 
            // @ts-ignore
            nodeintegration: "true", nodeintegrationinsubframes: "true", webpreferences: "contextIsolation=0, contextisolation=0, nativeWindowOpen=1" }, props)))));
});
DesktopWebView.displayName = 'DesktopWebView';
// TODO rename to DesktopWebViewLegacy
export { DesktopWebView };
