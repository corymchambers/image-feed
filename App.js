import React, { Component } from 'react'
import { StyleSheet, Platform, View, Modal, AsyncStorage } from 'react-native'
import Constants from 'expo-constants'

import Feed from './screens/Feed'
import Comments from './screens/Comments'

const ASYNC_STORAGE_COMMENTS_KEY = 'ASYNC_STORAGE_COMMENTS_KEY'

export default class App extends Component {

    state = {
        commentsForItem: {},
        showModal: false,
        selectedItemId: null
    }

    async componentDidMount() {
        try {
            const commentsForItem = await AsyncStorage.getItem(
                ASYNC_STORAGE_COMMENTS_KEY
            )

            this.setState({
                commentsForItem: commentsForItem
                    ? JSON.parse(commentsForItem)
                    : {}
            })
        }
         catch (e) {
             console.log('Failed to load comments')
         }
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

    onSubmitComment = async (text) => {
        const { selectedItemId, commentsForItem } = this.state
        const comments = commentsForItem[selectedItemId] || []

        const updated = {
            ...commentsForItem,
            [selectedItemId] : [...comments, text]
        }

        this.setState({ commentsForItem: updated })

        try {
            await AsyncStorage.setItem(
                ASYNC_STORAGE_COMMENTS_KEY,
                JSON.stringify(updated)
            )
        } catch (e) {
            console.log(
                'Failed to save comment',
                text,
                'for',
                selectedItemId
            )
        }
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
