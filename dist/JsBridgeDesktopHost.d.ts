import React from 'react';
import { IElectronWebView, IJsBridgeConfig, IJsBridgeMessagePayload } from '@cross-inpage-provider-types';
import { IWebViewWrapperRef } from './useWebViewBridge';
import { JsBridgeBase } from '@cross-inpage-provider-core';
declare class JsBridgeDesktopHost extends JsBridgeBase {
    constructor(config: IJsBridgeConfig);
    sendAsString: boolean;
    webviewRef?: React.RefObject<IElectronWebView>;
    webviewWrapper?: IWebViewWrapperRef;
    sendPayload(payload: IJsBridgeMessagePayload | string): void;
}
export { JsBridgeDesktopHost };
