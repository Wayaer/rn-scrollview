import {Animated, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import type {GroupPropType, SectionPropType} from "./Types";

export class Section extends Component<SectionPropType> {
    state = {
        section: 0,
    };

    constructor(props) {
        super(props);
        let offset = props.offset;
        if (props.initialContentOffset) {
            offset = props.initialContentOffset.y;
        }
        this.updateOffset(offset, true);
    }

    componentWillReceiveProps(next: SectionPropType) {
        this.updateOffset(next.offset, false, next);
    }

    updateOffset(offset: number, init: boolean = false, next?: SectionPropType) {
        let index = 0;
        if (!next) {
            next = this.props;
        }
        for (let i = 0; i < next.input.length; ++i) {
            if (offset > next.input[i]) {
                index = i;
            }
        }
        const section = next.sectionIndexes[index];
        if (section !== this.state.section) {
            if (init) {
                this.state = {section};
            } else {
                this.setState({section});
            }
        }
    }

    render() {
        const {data, style, heightForSection, renderSection, inverted} = this.props;
        const {section} = this.state;
        if (section === undefined || section < 0 || section >= data.length) {
            return null;
        }
        const wStyle = StyleSheet.flatten([
            style,
            {height: heightForSection(section), transform: [...style.transform, {scaleY: inverted ? -1 : 1}]},
        ]);
        return (
            <Animated.View {...this.props} style={wStyle}>
                {renderSection(this.state.section)}
            </Animated.View>
        );
    }
}

export class Group extends Component<GroupPropType> {
    _currentIndex = 0;
    _offset = 0;
    _margin = 0;

    constructor(props) {
        super(props);
        if (props.initialContentOffset) {
            this.contentConversion(props.initialContentOffset.y, true);
        }
    }

    contentConversion(offset: number, init: boolean = false) {
        this._offset = offset;
        const {input, output} = this.props;
        const cc = [];
        output.forEach(v => cc.indexOf(v) < 0 && cc.push(v));
        for (let i = 0; i < input.length; ++i) {
            if (offset >= input[i] && offset <= input[i + 1]) {
                this.update(cc.indexOf(output[i]), init);
                break;
            }
        }
    }

    update(index: number, init: boolean) {
        if (index < 0 || index >= this.props.indexes.length || this._currentIndex === index) {
            return;
        }
        this._currentIndex = index;
        !init && this.forceUpdate();
    }

    componentWillReceiveProps(next: GroupPropType) {
        if (next.offset) {
            this._offset = null;
            this.contentConversion(next.offset);
        }
    }

    render() {
        const {indexes, heightForSection, heightForIndexPath, renderIndexPath, inverted} = this.props;
        if (this._currentIndex >= indexes.length) {
            return null;
        }
        this._margin = 0;
        return indexes[this._currentIndex].map((indexPath, index) => {
            if (indexPath.row === -1) {
                this._margin = heightForSection(indexPath.section);
                return null;
            }
            const height = heightForIndexPath(indexPath);
            if (height === 0) {
                return null;
            }
            const cell = React.Children.only(renderIndexPath(indexPath));
            const marginTop = this._margin;
            this._margin = 0;
            const style = StyleSheet.flatten([
                cell.props.style,
                {
                    height,
                    marginTop,
                    alignSelf: 'stretch',
                    flex: 0,
                    transform: [{scaleY: inverted ? -1 : 1}],
                },
            ]);
            const key = cell.props.key ? cell.props.key : index;
            return React.cloneElement(cell, {
                key,
                style,
            });
        });
    }
}
