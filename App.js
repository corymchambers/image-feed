import React, { Component } from 'react'
import { StyleSheet, Platform, View, Modal } from 'react-native'
import Constants from 'expo-constants'

import Feed from './screens/Feed'
import Comments from './screens/Comments'

export default class App extends Component {
    state = {
        commentsForItem: {},
        showModal: false,
        selectedItemId: null
    }

    openCommentScreen = id => {
        this.setState({
            showModal: true,
            selectedItemId: id
        })
    }

    closeCommentScreen = () => {
        this.setState({
            showModal: false,
            selectedItemId: null
        })
    }

    onSubmitComment = (text) => {
        const { selectedItemId, commentsForItem } = this.state
        const comments = commentsForItem[selectedItemId] || []

        const updated = {
            ...commentsForItem,
            [selectedItemId] : [...comments, text]
        }

        this.setState({ commentsForItem: updated })
    }

    render() {
        const { commentsForItem, showModal, selectedItemId } = this.state
        return (
            <View style={styles.container}>
                <Feed
                    style={styles.feed}
                    commentsForItem={commentsForItem}
                    onPressComments={this.openCommentScreen}
                />
                <Modal
                    visible={showModal}
                    animationType="slide"
                    onRequestClose={this.closeCommentScreen}
                >
                    <Comments
                        style={styles.container}
                        comments={commentsForItem[selectedItemId] || []}
                        onClose={this.closeCommentScreen}
                        onSubmitComment={this.onSubmitComment}
                    />
                </Modal>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    feed: {
        flex: 1,
        marginTop:
            Platform.OS === 'android' || Platform.version < 11
                ? Constants.statusBarHeight
                : 0
    },
    comments: {
        flex: 1,
        marginTop:
            Platform.OS === 'ios' && Platform.version < 11
                ? Constants.statusBarHeight
                : 0
    }
});
