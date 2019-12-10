
import React, { Component } from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { List, ListItem, Grid, Row, Text, Container, Content, Button } from 'native-base'

import { db, auth, storage } from '../config';
import logout from '../utils/logout';

let posts = db.collection('posts');

export class ListItems extends Component {

  state = { posts: [] }


  async _loadPosts(data) {
    let urls = [];
    // Push each download url to the posts []
    for (let post of data) urls.push({ key: await storage.ref(post.image).getDownloadURL(), title: post.title });
    this.setState({ posts: urls });
  }

  componentDidMount() {
    posts.get().then(data => {
      let posts = [];
      data.forEach(doc => doc.data().image.includes('posts/') && posts.push(doc.data()));
      this._loadPosts(posts);
    }).catch(err => console.log(err, 'ERROR'));
  }

  render() {
    return (
      <Container>
        <Content>
          {/* <Button onPress={logout}><Text>logout</Text></Button>   */}
          <FlatList data={this.state.posts} renderItem={({item}) => 
            <Grid style={styles.postItem}>
              <Row size={2}>
                <Image style={styles.postImage} source={{ uri: item.key }}/>
              </Row>
              <Row size={1} style={styles.postTitle}>
                <Text>{ item.title }</Text>
              </Row>
            </Grid>
          }/>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  postTitle: {
    paddingTop: 20,
    paddingLeft: 10
  },
  postItem: {
    paddingBottom: 20
  },
  postImage: {
    height: 375,
    width: 375
  }
})

