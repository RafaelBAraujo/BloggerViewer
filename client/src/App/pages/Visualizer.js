import React, { Component } from 'react';

import Classroom from '../../components/organisms/Classroom'
import MenuBar from '../../components/molecules/MenuBar'
import Drawer from '../../components/organisms/Drawer'
import Diagram from '../../components/diagram/Diagram'
import Post from '../../components/organisms/Post'

import 'bootstrap/dist/css/bootstrap.css';
import './visualizer.css';

class Visualizer extends Component {

    
    render() {
        let post = {
            title: 'Some incredible post title',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non pharetra quam, mollis pulvinar nunc. Etiam nunc libero, rhoncus vitae elit id, vulputate pulvinar mauris. Mauris ullamcorper tortor quis sagittis ultricies. Praesent aliquet condimentum vestibulum. Proin felis augue, luctus ac mattis aliquet, pellentesque non nunc. Sed commodo feugiat purus. Mauris enim dolor, tempor a dictum in, finibus quis urna. Donec condimentum rutrum metus, eu aliquet arcu aliquam sed. Ut tincidunt ac massa a sagittis. Nunc vel leo nulla. Pellentesque leo leo, vehicula dictum sem eu, sodales suscipit metus. Integer in ante ac orci dictum tincidunt vel id justo. Curabitur lacinia sit amet libero at egestas.',
            comments: [
              {
                author: {
                  name: 'Rafael Augusto',
                  pic: {
                    src: 'profile_pic.png',
                    alt: 'test'
                  }
                },
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non pharetra quam, mollis pulvinar nunc. ',
                responses: [
                  {
                    author: {
                      name: 'Rafael Augusto',
                      pic: {
                        src: 'profile_pic.png',
                        alt: 'test'
                      }
                    },
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non pharetra quam, mollis pulvinar nunc. '
                  }
                ]
              },
              {
                author: {
                  name: 'Rafael Augusto',
                  pic: {
                    src: 'profile_pic.png',
                    alt: 'test'
                  }
                },
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non pharetra quam, mollis pulvinar nunc. ',
                responses: [
                  {
                    author: {
                      name: 'Rafael Augusto',
                      pic: {
                        src: 'profile_pic.png',
                        alt: 'test'
                      }
                    },
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non pharetra quam, mollis pulvinar nunc. '
                  }
                ]
              }
            ]
          }
        
        let postsList = [
          { title: 'Post Title 1' },
          { title: 'Post Title 2' },
          { title: 'Post Title 2' },
        ]
        return (
            <div className='visualizer'>
                <Classroom views={null}/>
                <MenuBar />
                <Drawer postsList={postsList}/>
                <Diagram />
                <Post title={post.title} content={post.content} comments={post.comments}/>
            </div>
        );
    }

}

export default Visualizer;