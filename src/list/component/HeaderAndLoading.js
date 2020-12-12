import React, {Component} from 'react';
import {Animated, Text, View} from 'react-native';

export class LoadingFooter extends Component<FooterPropType, FooterStateType> {
    static height = 80;

    static style = 'stickyContent';

    constructor(props: FooterPropType) {
        super(props);
        this.state = {status: props.allLoaded ? 'allLoaded' : 'waiting'};
    }

    static getDerivedStateFromProps(nextProps: FooterPropType) {
        if (nextProps.allLoaded) return {status: 'allLoaded'};
        return {};
    }

    changeToState(newStatus: FooterStatus) {
        !this.props.allLoaded &&
        this.state.status !== newStatus &&
        this.onStateChange(this.state.status, newStatus);
    }

    onStateChange(oldStatus: FooterStatus, newStatus: FooterStatus) {
        this.setState({status: newStatus});
    }

    render() {
        return (
            <Text
                style={{
                    flex: 1,
                    alignSelf: 'center',
                    lineHeight: this.props.maxHeight,
                    textAlign: 'center',
                }}>
                {this.state.status}
            </Text>
        );
    }
}

export type FooterStatus =
    | 'waiting'
    | 'dragging'
    | 'draggingEnough'
    | 'draggingCancel'
    | 'loading'
    | 'rebound'
    | 'allLoaded';

interface FooterPropType {
    offset?: Animated.Value;
    maxHeight?: number;
    allLoaded?: boolean;
    bottomOffset?: number;
}

interface FooterStateType {
    status?: FooterStatus;
}

export class RefreshHeader extends Component<HeaderPropType,
    HeaderStateType> {

    static height = 80;

    static style = "stickyContent";

    constructor(props: HeaderPropType) {
        super(props);
        this.state = {status: "waiting"};
    }

    changeToState(newStatus: HeaderStatus) {
        this.state.status !== newStatus &&
        this.onStateChange(this.state.status, newStatus);
    }

    onStateChange(oldStatus: HeaderStatus, newStatus: HeaderStatus) {
        // console.log("newStatus", newStatus);
        this.setState({status: newStatus});
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontSize: 18}}>{this.state.status}</Text>
            </View>
        );
    }
}

export type HeaderStatus =
    | "waiting"
    | "pulling"
    | "pullingEnough"
    | "pullingCancel"
    | "refreshing"
    | "rebound";

interface HeaderPropType {
    offset?: Animated.Value;
    maxHeight?: number;
    bottomOffset?: number;
}

interface HeaderStateType {
    status?: HeaderStatus;
}
