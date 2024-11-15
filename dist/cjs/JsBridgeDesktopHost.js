"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsBridgeDesktopHost = void 0;
const cross_inpage_provider_core_1 = require("@cross-inpage-provider-core");
class JsBridgeDesktopHost extends cross_inpage_provider_core_1.JsBridgeBase {
    constructor(config) {
        super(config);
        this.sendAsString = true;
        this.webviewRef = config.webviewRef;
    }
    sendPayload(payload) {
        var _a;
        if (this.webviewRef && this.webviewRef.current) {
            const payloadStr = payload;
            if (this.webviewRef.current) {
                // *** executeJavaScript will be blocked by head script loading
                // const inpageReceiveCode = injectedFactory.createCodeJsBridgeReceive(payloadStr);
                // appDebugLogger.webview('executeJavaScript', inpageReceiveCode, payload);
                // this.webviewRef.current?.executeJavaScript?.(inpageReceiveCode);
                // *** use ipcRenderer.on instead
                (_a = this.webviewRef.current) === null || _a === void 0 ? void 0 : _a.send('JsBridgeDesktopHostToInjected', payloadStr);
            }
            else {
                throw new Error('JsBridgeDesktopHost executeJavaScript failed: webview ref not ready yet.');
            }
        }
    }
}
exports.JsBridgeDesktopHost = JsBridgeDesktopHost;
