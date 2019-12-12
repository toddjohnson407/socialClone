import React, { Component } from 'react';
import { View, FlatList, Image, StyleSheet, Text } from 'react-native';
import { List, ListItem, Grid, Row, Col, Container, Content, Button, Thumbnail, Icon } from 'native-base'

import { db, auth, storage } from '../config';
import logout from '../utils/logout';

let posts = db.collection('posts');
let profiles = db.collection('profiles');

export class ListItems extends Component {

  state = { posts: [] }

  async _loadPosts(data) {
    let urls = [];
    // Push each download url to the posts []
    for (let post of data) urls.push({ key: await storage.ref(post.imageRef).getDownloadURL(), description: post.description, profile: await profiles.doc(post.profileId).get() });
    this.setState({ posts: urls });
  }

  componentDidMount() {
    posts.get().then(data => {
      let posts = [];
      data.forEach(doc => doc.data().imageRef.includes('posts/') && posts.push(doc.data()));
      this._loadPosts(posts);
    }).catch(err => console.log(err, 'ERROR'));
  }

  render() {
    return (
      <Container>
        <Content>
          <FlatList data={this.state.posts} renderItem={({item}) => 

            <View style={styles.post}>
              <View style={styles.header}>
                <Thumbnail small source={{uri: item.key}} style={{marginRight: 15}}></Thumbnail>
                <Text style={styles.username}>{ item.profile.data().username }</Text>

              </View>
              <View><Image style={styles.image} source={{ uri: item.key }}/></View>
              <View style={styles.actions}>
                <Button transparent onPress={this.likePost}>
                  <Icon name="heart-empty" style={{fontSize: 30}}/>
                </Button>
                <Button transparent>
                  <Icon name="text" style={{fontSize: 30}}/>
                </Button>
              </View>
              <View style={styles.description}>
                <Text>{ item.description }</Text>
              </View>
            </View>
          }/>
        </Content>
      </Container>
    );
  }

}

const styles = StyleSheet.create({

  post: {
    paddingTop: 10,
    paddingBottom: 30
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 0,
    paddingTop: 4
  },
  username: { fontWeight: 'bold' },
  image: { height: 310, width: 375 },
  description: {
    flex: 1,
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingTop: 4
  }

  // postDesc: {
  //   paddingTop: 20,
  //   paddingLeft: 10
  // },
  // postItem: {
  //   paddingBottom: 20
  // },
  // postImage: {
  //   height: 375,
  //   width: 375
  // }
})

