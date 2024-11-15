import React from 'react';
import { WebView } from 'react-native-webview';
import { JsBridgeBase } from '@cross-inpage-provider-core';
import { IJsBridgeConfig, IJsBridgeMessagePayload } from '@cross-inpage-provider-types';
import { IWebViewWrapperRef } from './useWebViewBridge';
declare class JsBridgeNativeHost extends JsBridgeBase {
    constructor(config: IJsBridgeConfig);
    sendAsString: boolean;
    webviewRef?: React.RefObject<WebView>;
    webviewWrapper?: IWebViewWrapperRef;
    sendPayload(payload: IJsBridgeMessagePayload | string): void;
}
export { JsBridgeNativeHost };
