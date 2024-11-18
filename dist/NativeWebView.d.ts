import React from 'react';
import type { ViewStyle } from 'react-native';
import { WebViewProps } from 'react-native-webview';
import { InpageProviderWebViewProps } from '@cross-inpage-provider-types';
export type NativeWebViewProps = WebViewProps & InpageProviderWebViewProps & {
    style?: ViewStyle;
};
declare const NativeWebView: React.ForwardRefExoticComponent<Pick<import("react-native-webview/lib/WebViewTypes").IOSWebViewProps & import("react-native-webview/lib/WebViewTypes").AndroidWebViewProps & InpageProviderWebViewProps & {
    style?: ViewStyle | undefined;
}, "source" | "style" | "src" | "receiveHandler" | "onSrcChange" | "children" | "onLoad" | "onError" | "onLoadStart" | "onTouchCancel" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchStart" | "onScroll" | "onLoadProgress" | "injectedJavaScriptBeforeContentLoaded" | "onMessage" | "incognito" | "bounces" | "decelerationRate" | "scrollEnabled" | "pagingEnabled" | "automaticallyAdjustContentInsets" | "automaticallyAdjustsScrollIndicatorInsets" | "contentInsetAdjustmentBehavior" | "contentInset" | "contentMode" | "dataDetectorTypes" | "allowsInlineMediaPlayback" | "hideKeyboardAccessoryView" | "allowsBackForwardNavigationGestures" | "useSharedProcessPool" | "userAgent" | "allowsLinkPreview" | "sharedCookiesEnabled" | "ignoreSilentHardwareSwitch" | "autoManageStatusBarEnabled" | "directionalLockEnabled" | "keyboardDisplayRequiresUserAction" | "allowingReadAccessToURL" | "allowFileAccessFromFileURLs" | "allowUniversalAccessFromFileURLs" | "onContentProcessDidTerminate" | "injectedJavaScriptForMainFrameOnly" | "injectedJavaScriptBeforeContentLoadedForMainFrameOnly" | "pullToRefreshEnabled" | "onFileDownload" | "limitsNavigationsToAppBoundDomains" | "textInteractionEnabled" | "mediaCapturePermissionGrantType" | "enableApplePay" | "menuItems" | "onCustomMenuSelection" | "javaScriptEnabled" | "javaScriptCanOpenWindowsAutomatically" | "containerStyle" | "renderError" | "renderLoading" | "onLoadEnd" | "onHttpError" | "onNavigationStateChange" | "startInLoadingState" | "injectedJavaScript" | "showsHorizontalScrollIndicator" | "showsVerticalScrollIndicator" | "mediaPlaybackRequiresUserAction" | "originWhitelist" | "onShouldStartLoadWithRequest" | "nativeConfig" | "cacheEnabled" | "applicationNameForUserAgent" | "basicAuthCredential" | "hitSlop" | "onLayout" | "pointerEvents" | "removeClippedSubviews" | "testID" | "nativeID" | "collapsable" | "needsOffscreenAlphaCompositing" | "renderToHardwareTextureAndroid" | "focusable" | "shouldRasterizeIOS" | "isTVSelectable" | "hasTVPreferredFocus" | "tvParallaxProperties" | "tvParallaxShiftDistanceX" | "tvParallaxShiftDistanceY" | "tvParallaxTiltAngle" | "tvParallaxMagnification" | "onStartShouldSetResponder" | "onMoveShouldSetResponder" | "onResponderEnd" | "onResponderGrant" | "onResponderReject" | "onResponderMove" | "onResponderRelease" | "onResponderStart" | "onResponderTerminationRequest" | "onResponderTerminate" | "onStartShouldSetResponderCapture" | "onMoveShouldSetResponderCapture" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "onContentSizeChange" | "onRenderProcessGone" | "cacheMode" | "overScrollMode" | "scalesPageToFit" | "geolocationEnabled" | "allowFileAccess" | "saveFormDataDisabled" | "setSupportMultipleWindows" | "urlPrefixesForDefaultIntent" | "androidHardwareAccelerationDisabled" | "androidLayerType" | "thirdPartyCookiesEnabled" | "domStorageEnabled" | "textZoom" | "mixedContentMode" | "allowsFullscreenVideo" | "forceDarkOn" | "setBuiltInZoomControls" | "setDisplayZoomControls" | "nestedScrollEnabled" | "minimumFontSize"> & React.RefAttributes<unknown>>;
export { NativeWebView };
