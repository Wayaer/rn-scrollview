package com.scrollview;

import android.view.View;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

import javax.annotation.Nullable;

class RNScrollViewManager extends ViewGroupManager {
    @Override
    public String getName() {
        return "RNScrollView";
    }

    @Override
    protected View createViewInstance(ThemedReactContext reactContext) {
        return new RNScrollView(reactContext);
    }

    @ReactProp(name = "refreshHeaderHeight")
    public void setRefreshHeaderHeight(RNScrollView view, float height) {
        height = PixelUtil.toPixelFromDIP(height);
        view.setRefreshHeaderHeight(height);
    }

    @ReactProp(name = "loadingFooterHeight")
    public void setLoadingFooterHeight(RNScrollView view, float height) {
        height = PixelUtil.toPixelFromDIP(height);
        view.setLoadingFooterHeight(height);
    }

    @ReactProp(name = "bounces")
    public void setBounces(RNScrollView view, boolean bounces) {
        view.setBounces(bounces);
    }

    @ReactProp(name = "scrollEnabled")
    public void setScrollEnabled(RNScrollView view, boolean scrollEnabled) {
        view.setScrollEnabled(scrollEnabled);
    }

    @ReactProp(name = "initialContentOffset")
    public void setInitContentOffset(RNScrollView view, ReadableMap offset) {
        float x = PixelUtil.toPixelFromDIP(offset.getDouble("x"));
        float y = PixelUtil.toPixelFromDIP(offset.getDouble("y"));
        view.setInitContentOffset(x, y);
    }

    @ReactProp(name = "allLoaded")
    public void setAllLoaded(RNScrollView view, boolean allLoaded) {
        view.setAllLoaded(allLoaded);
    }
    @ReactProp(name = "inverted")
    public void setInverted(RNScrollView view, boolean inverted) {
        view.setInverted(inverted);
    }

    @ReactProp(name = "directionalLockEnabled")
    public void setDirectionalLockEnabled(RNScrollView view, boolean directionalLockEnabled) {
        view.setDirectionalLockEnabled(directionalLockEnabled);
    }

    @Nullable
    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder()
                .put("onScroll", MapBuilder.of(
                        "phasedRegistrationNames",
                        MapBuilder.of("bubbled", "onScroll")))
                .put("onTouchBegin", MapBuilder.of(
                        "phasedRegistrationNames",
                        MapBuilder.of("bubbled", "onTouchBegin")))
                .put("onTouchEnd", MapBuilder.of(
                        "phasedRegistrationNames",
                        MapBuilder.of("bubbled", "onTouchEnd")))
                .put("onMomentumScrollBegin", MapBuilder.of(
                        "phasedRegistrationNames",
                        MapBuilder.of("bubbled", "onMomentumScrollBegin")))
                .put("onMomentumScrollEnd", MapBuilder.of(
                        "phasedRegistrationNames",
                        MapBuilder.of("bubbled", "onMomentumScrollEnd")))
                .build();
    }

    @Override
    public void receiveCommand(View root, int commandId, @Nullable ReadableArray args) {
        RNScrollView scrollView = (RNScrollView) root;
        switch (commandId) {
            case 10000:
                scrollView.endRefresh();
                break;
            case 10001:
                scrollView.endLoading();
                break;
            case 10002:
                scrollView.scrollTo(
                        PixelUtil.toPixelFromDIP(args.getDouble(0)),
                        PixelUtil.toPixelFromDIP(args.getDouble(1)),
                        args.getBoolean(2));
                break;
        }
    }
}
