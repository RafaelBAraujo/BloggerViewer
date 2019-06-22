
class BloggerMock {

    static getPost() {

        res.setHeader('Content-Type', 'application/json');

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
                    id: 1,
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
                    id: 2,
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

        let response = {
            post: post,
            postsList: postsList
        }

        return response

    }

}

module.exports = BloggerMock