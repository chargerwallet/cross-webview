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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesktopWebView = exports.waitForDataLoaded = exports.waitAsync = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-explicit-any */
const react_1 = __importStar(require("react"));
const cross_inpage_provider_core_1 = require("@cross-inpage-provider-core");
const JsBridgeDesktopHost_1 = require("./JsBridgeDesktopHost");
const useIsIpcReady_1 = require("./useIsIpcReady");
const isNil_1 = __importDefault(require("lodash/isNil"));
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
const isArray_1 = __importDefault(require("lodash/isArray"));
const isDev = process.env.NODE_ENV !== 'production';
const isBrowser = true;
function usePreloadJsUrl() {
    var _a;
    const { preloadJsUrl } = (_a = window.CHARGERWALLET_DESKTOP_GLOBALS) !== null && _a !== void 0 ? _a : {};
    (0, react_1.useEffect)(() => {
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
function waitAsync(timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}
exports.waitAsync = waitAsync;
function waitForDataLoaded({ data, wait = 600, logName, timeout = 0, }) {
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
                        if ((0, isNil_1.default)(d)) {
                            isAllLoaded = false;
                            return;
                        }
                        if ((0, isEmpty_1.default)(d)) {
                            if ((0, isPlainObject_1.default)(d) || (0, isArray_1.default)(d)) {
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
exports.waitForDataLoaded = waitForDataLoaded;
const DesktopWebView = (0, react_1.forwardRef)((_a, ref) => {
    var { src, style, receiveHandler, onSrcChange } = _a, props = __rest(_a, ["src", "style", "receiveHandler", "onSrcChange"]);
    const [isWebviewReady, setIsWebviewReady] = (0, react_1.useState)(false);
    const webviewRef = (0, react_1.useRef)(null);
    const isIpcReady = (0, useIsIpcReady_1.useIsIpcReady)();
    const [devToolsAtLeft, setDevToolsAtLeft] = (0, react_1.useState)(false);
    if (props.preload) {
        console.warn('DesktopWebView:  custom preload url may disable built-in injected function');
    }
    (0, react_1.useEffect)(() => () => {
        var _a;
        // not working, ref is null after unmount
        (_a = webviewRef.current) === null || _a === void 0 ? void 0 : _a.closeDevTools();
    }, []);
    // TODO extract to hooks
    const jsBridgeHost = (0, react_1.useMemo)(() => new JsBridgeDesktopHost_1.JsBridgeDesktopHost({
        webviewRef,
        receiveHandler,
    }), [receiveHandler]);
    (0, react_1.useImperativeHandle)(ref, () => {
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
    const initWebviewByRef = (0, react_1.useCallback)(($ref) => {
        webviewRef.current = $ref;
        // desktop "ipc-message" listener must be added after webviewReady
        //    so use ref to check it
        setIsWebviewReady(true);
    }, []);
    (0, react_1.useEffect)(() => {
        const webview = webviewRef.current;
        if (!webview || !isIpcReady || !isWebviewReady) {
            return;
        }
        const handleMessage = (event) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            if (event.channel === cross_inpage_provider_core_1.consts.JS_BRIDGE_MESSAGE_IPC_CHANNEL) {
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
    return (react_1.default.createElement(react_1.default.Fragment, null,
        isDev && (react_1.default.createElement("button", { type: "button", style: {
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
        isBrowser && (react_1.default.createElement("webview", Object.assign({ ref: initWebviewByRef, preload: preloadJsUrl, src: isIpcReady && isWebviewReady ? src : undefined, style: Object.assign({ 'width': '100%', 'height': '100%' }, style), 
            // @ts-ignore
            allowpopups: "true", 
            // @ts-ignore
            nodeintegration: "true", nodeintegrationinsubframes: "true", webpreferences: "contextIsolation=0, contextisolation=0, nativeWindowOpen=1" }, props)))));
});
exports.DesktopWebView = DesktopWebView;
DesktopWebView.displayName = 'DesktopWebView';
