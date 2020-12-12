import React from "react";
import {LoadingFooter, RefreshHeader} from "./HeaderAndLoading.js";

import {
    ActivityIndicator,
    Animated,
    View,
    StyleSheet,
    Text
} from "react-native";

export class NormalFooter extends LoadingFooter {
    static height = 80;

    static style = "stickyContent";

    render() {
        if (this.state.status === "allLoaded")
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>{this.getTitle()}</Text>
                </View>
            );
        return (
            <View style={styles.container}>
                {this._renderIcon()}
                <View style={styles.rContainer}>
                    <Text style={styles.text}>{this.getTitle()}</Text>
                    {this.renderContent()}
                </View>
            </View>
        );
    }

    _renderIcon() {
        const s = this.state.status;
        if (s === "loading" || s === "cancelLoading" || s === "rebound") {
            return <ActivityIndicator color={"gray"}/>;
        }
        const {maxHeight, offset, bottomOffset} = this.props;
        return (
            <Animated.Image
                source={require("../res/arrow.png")}
                style={{
                    transform: [
                        {
                            rotate: offset.interpolate({
                                inputRange: [
                                    bottomOffset - 1 + 45,
                                    bottomOffset + 45,
                                    bottomOffset + maxHeight,
                                    bottomOffset + maxHeight + 1
                                ],
                                outputRange: ["180deg", "180deg", "0deg", "0deg"]
                            })
                        }
                    ]
                }}
            />
        );
    }

    renderContent() {
        return null;
    }

    getTitle() {
        const s = this.state.status;
        if (s === "dragging" || s === "waiting") {
            return "Drag up to load";
        } else if (s === "draggingEnough") {
            return "Release to load";
        } else if (s === "loading") {
            return "Loading ...";
        } else if (s === "draggingCancel") {
            return "Give up loading";
        } else if (s === "rebound") {
            return "Load completed";
        } else if (s === "allLoaded") {
            return "No more data";
        }
    }
}


export class NormalHeader extends RefreshHeader {
    static height = 80;

    static style = "stickyContent";

    render() {
        return (
            <View style={styles.container}>
                {this._renderIcon()}
                <View style={styles.rContainer}>
                    <Text style={styles.text}>
                        {this.getTitle()}
                    </Text>
                    {this.renderContent()}
                </View>
            </View>
        );
    }

    _renderIcon() {
        const s = this.state.status;
        if (s === "refreshing" || s === "rebound") {
            return <ActivityIndicator color={"gray"}/>;
        }
        const {maxHeight, offset} = this.props;
        return (
            <Animated.Image
                source={require("../res/arrow.png")}
                style={{
                    transform: [
                        {
                            rotate: offset.interpolate({
                                inputRange: [-maxHeight - 1 - 10, -maxHeight - 10, -50, -49],
                                outputRange: ["180deg", "180deg", "0deg", "0deg"]
                            })
                        }
                    ]
                }}
            />
        );
    }

    renderContent() {
        return null;
    }

    getTitle() {
        const s = this.state.status;
        if (s === "pulling" || s === "waiting") {
            return "Pull down to refresh";
        } else if (s === "pullingEnough") {
            return "Release to refresh";
        } else if (s === "refreshing") {
            return "Refreshing ...";
        } else if (s === "pullingCancel") {
            return "Give up refreshing";
        } else if (s === "rebound") {
            return "Refresh completed";
        }
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    rContainer: {
        marginLeft: 20
    },
    text: {
        marginVertical: 5,
        fontSize: 15,
        color: "#666",
        textAlign: "center",
        width: 140
    }
});
