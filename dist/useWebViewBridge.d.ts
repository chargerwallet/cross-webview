/// <reference types="react" />
import { WebView as ReactNativeWebView } from 'react-native-webview';
import { JsBridgeBase } from '@cross-inpage-provider-core';
import { IElectronWebView } from '@cross-inpage-provider-types';
export type IWebViewWrapperRef = {
    innerRef?: ReactNativeWebView | IElectronWebView | null;
    jsBridge?: JsBridgeBase | null;
    reload: () => void;
    loadURL: (...args: any) => void;
};
export declare function useWebViewBridge(): {
    jsBridge: JsBridgeBase | null;
    webviewRef: import("react").MutableRefObject<IWebViewWrapperRef | null>;
    setWebViewRef: (ref: IWebViewWrapperRef) => void;
};
