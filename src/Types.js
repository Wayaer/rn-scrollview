import {Animated, ViewPropTypes} from "react-native";
import PropTypes from 'prop-types'
import {RefreshHeader, LoadingFooter} from "./HeaderAndLoading";

export interface IndexPath {
    section: number,
    row: number
}

export interface Size {
    height: number,
    width: number
}

export interface Offset {
    x: number,
    y: number
}

export interface NativeContentOffset {
    x?: Animated.Value,
    y?: Animated.Value
}

export type RefreshStyle = "topping" | "stickyScrollView" | "stickyContent";

export type LoadingStyle = "bottoming" | "stickyScrollView" | "stickyContent";

export interface ScrollEvent {
    nativeEvent: {
        contentOffset: {
            x: number,
            y: number
        }
    }
}

export interface RNScrollViewPropType extends ViewPropTypes {
    style?: PropTypes.object,
    contentStyle?: PropTypes.object,
    bounces?: boolean,
    scrollEnabled?: boolean,
    directionalLockEnabled?: boolean,
    initialContentOffset?: Offset,
    showsVerticalScrollIndicator?: boolean,
    showsHorizontalScrollIndicator?: boolean,
    refreshHeader?: RefreshHeader,
    loadingFooter?: LoadingFooter,
    onRefresh?: () => any,
    onLoading?: () => any,
    allLoaded?: boolean;
    textInputRefs?: any[],
    inputToolBarHeight?: number,
    tapToHideKeyboard?: boolean,
    onTouchBegin?: () => any,
    onTouchEnd?: () => any,
    inverted?: boolean;
    onMomentumScrollBegin?: () => any,
    onMomentumScrollEnd?: () => any,
    onScroll?: (evt: ScrollEvent) => any,
    keyboardShouldPersistTaps?: "always" | "never" | "handled",
    onNativeContentOffsetExtract?: NativeContentOffset,
    onSizeChange?: ({ width: number, height: number }) => any,
    onContentSizeChange?: ({ width: number, height: number }) => any
}


export interface LargeListPropType extends RNScrollViewPropType {
    data: LargeListPropType,
    headerStickyEnabled?: boolean,
    contentStyle?: PropTypes.object,
    directionalLockEnabled?: boolean,
    renderScaleHeaderBackground?: () => React.Element<any>,
    heightForSection?: (section: number) => number,
    renderSection?: (section: number) => React.Node<any>,
    heightForIndexPath: (indexPath: IndexPath) => number,
    renderIndexPath: (indexPath: IndexPath) => React.Node<any>,
    renderHeader?: () => React.Element<any>,
    renderFooter?: () => React.Element<any>,
    renderEmpty?: () => React.Element<any>,
    onNativeContentOffsetExtract?: {
        x: Animated.Value,
        y: Animated.Value
    },
    inverted?: boolean,

    groupCount?: number,
    groupMinHeight?: number,
    updateTimeInterval?: number
}

export interface GroupPropType {
    indexes: IndexPath[],
    criticalPoint: number[],
    input: number[],
    output: number[],
    data: LargeListDataType,
    heightForSection?: (section: number) => number,
    heightForIndexPath: (indexPath: IndexPath) => number,
    renderSection?: (section: number) => React.Node<any>,
    renderIndexPath: (indexPath: IndexPath) => React.Node<any>,
    offset?: number,
    inverted?: boolean,
    updateTimeInterval: number
}

export interface SectionPropType {
    tops: number[],
    section: number,
    nativeOffset: Animated.Value,
    heightForSection: (section: number) => number,
    renderSection?: (section: number) => React.Node<any>,
    input: number[],
    output: number[],
    sectionIndexes: number[],
    offset: number,
    inverted?: boolean,
    data: LargeListDataType
}

export interface WaterfallListType extends RNScrollViewPropType {
    data: any[],
    heightForItem: (item: any, index: number) => number,
    renderItem: (item: any, index: number) => React.Element<any>,
    preferColumnWidth?: number,
    numColumns?: number,
    renderHeader?: () => React.Element<any>,
    renderFooter?: () => React.Element<any>,
    onNativeContentOffsetExtract?: {
        x: Animated.Value,
        y: Animated.Value
    }
}

export interface WaterfallItemType extends WaterfallListType {
    input: number[],
    output: number[],
    itemIndexes: number[],
    offset: number
}

export interface StickyFormPropType extends LargeListPropType {
}
