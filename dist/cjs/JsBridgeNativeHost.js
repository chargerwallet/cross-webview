"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsBridgeNativeHost = void 0;
const cross_inpage_provider_core_1 = require("@cross-inpage-provider-core");
class JsBridgeNativeHost extends cross_inpage_provider_core_1.JsBridgeBase {
    constructor(config) {
        super(config);
        this.sendAsString = true;
        this.webviewRef = config.webviewRef;
    }
    sendPayload(payload) {
        var _a, _b;
        if (this.webviewRef && this.webviewRef.current) {
            const payloadStr = payload;
            const inpageReceiveCode = cross_inpage_provider_core_1.injectedFactory.createCodeJsBridgeReceive(payloadStr);
            (_b = (_a = this.webviewRef.current) === null || _a === void 0 ? void 0 : _a.injectJavaScript) === null || _b === void 0 ? void 0 : _b.call(_a, inpageReceiveCode);
        }
    }
}
exports.JsBridgeNativeHost = JsBridgeNativeHost;
