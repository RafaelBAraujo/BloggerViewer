const html2text = require('html2plaintext')
const env = require('custom-env').env('staging')
const express = require('express')
const path = require('path')

const BloggerRequestApi = require('./lib/blogger-request')

const app = express();

const hostname = process.env.HOSTNAME
const port = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'client/build')));

const blogs = {}
blogs['adm_tec'] = 'https://adm-tecnic.blogspot.com/'
blogs['adm_si'] = 'https://adm-bsi.blogspot.com'
blogs['tgs'] = 'https://tgs-bsi.blogspot.com/'

function shortenName(name) {

	var names = name.split(' ')

	if(names.length > 1)
		return names[0] + ' ' + names[1].substring(0, 1) + '.'
	
	else if(names.length > 0 && names.length < 2)
		return names[0]

	else
		return 'Unknown'

}

app.get('/visualizer/:blog/getLastPost', (req, res) => {

    let blogUrl = blogs[req.params.blog]

    let viewedComments = new Set()
    let numOfComments = []
    let namesSet = new Set()

    let classroomViews = [ { id: 'ncomments', title: 'Número de Comentários', content: [] },
                           { id: 'interactions', title: 'Interações', content: [] },
                           { id: 'inactives', title: 'Inativos', content: [] } ]
    let classroom = { authors: [], classroomViews: [] }

    BloggerRequestApi.getBlogId(blogUrl).then((blogId) => {
      BloggerRequestApi.getLastPost(blogId).then((lastPost) => {
            let postData = { id: lastPost.id, title: lastPost.title, content: html2text(lastPost.content), comments: [] }
            BloggerRequestApi.getCommentsByPost(blogId, lastPost.id).then((comments) => {

                comments.forEach(comment => {

                  if(numOfComments[comment.author.id] == null) {
                    numOfComments[comment.author.id] = 1;
                  } else {
                    numOfComments[comment.author.id] += 1;
                  }

                  let replies = []

                  if(!viewedComments.has(comment.id)) {

                      comments.forEach((reply) => {
                        if(typeof reply.inReplyTo !== 'undefined') {								
                          if(reply !== comment && reply.inReplyTo.id == comment.id) {
                              viewedComments.add(reply.id)
                              let newReply = { 
                                id: reply.id, 
                                author: {
                                  id: reply.author.id,
                                  name: shortenName(reply.author.displayName.toString()),
                                  pic: {
                                    src: reply.author.image.url,
                                    alt: reply.author.url
                                  },
                                },
                                content: html2text(reply.content),
                                published: reply.published
                              }
                              replies.push(newReply)
                              let shortenedAuthorName = shortenName(reply.author.displayName)
                              let newAuthor = {
                                id: comment.author.id,
                                pic: {
                                  src: comment.author.image.url,
                                  alt: comment.author.url
                                },
                                name: shortenedAuthorName,
                                numComments: 0
                              }
                              if(!namesSet.has(shortenedAuthorName)) {
                                classroom.authors.push(newAuthor)
                                namesSet.add(shortenedAuthorName)
                              }
                          }
                        }
                      })

                      let newComment = {
                          id: comment.id,
                          author: {
                            id: comment.author.id,
                            name: shortenName(comment.author.displayName.toString()),
                            pic: {
                              src: comment.author.image.url,
                              alt: comment.author.url
                            }
                          },
                          content: html2text(comment.content),
                          published: comment.published,
                          replies: replies
                      }

                      let shortenedAuthorName = shortenName(comment.author.displayName)
                      let newAuthor = {
                        id: comment.author.id,
                        pic: {
                          src: comment.author.image.url,
                          alt: comment.author.url
                        },
                        name: shortenedAuthorName,
                        numComments: 0
                      }
                      if(!namesSet.has(shortenedAuthorName)) {
                        namesSet.add(shortenedAuthorName)
                        classroom.authors.push(newAuthor)
                      }
                      postData.comments.push(newComment)
                      viewedComments.add(comment.id)

                  }
                })

                
                classroom.authors.forEach((author) => {
                    author.numComments = numOfComments[author.id]
                    author.numComments > 0 ? 
                    (classroomViews[0].content.push(author))
                    :
                    (classroomViews[2].content.push(author))
                    
                    if(author.numComments > 1) {
                      classroomViews[1].content.push(author)
                    }
                })

                let postsList = []

                BloggerRequestApi.getPosts(blogId).then((posts) => {
                  posts.forEach(post => {
                      let newPost = { id: post.id, title: post.title }
                      postsList.push(newPost)
                  })
                  let response = {
                    classroom: classroomViews,
                    post: postData,
                    postsList: postsList
                  }

                  res.json(response)
                })

            })

        })
    })

})

app.get('/visualizer/:blog/getPost/:id', (req, res) => {

  let blogUrl = blogs[req.params.blog]
  let postId = req.params.id

  let viewedComments = new Set()
  let numOfComments = []
  let namesSet = new Set()

  let classroomViews = [ { id: 'ncomments', title: 'Número de Comentários', content: [] },
                         { id: 'interactions', title: 'Interações', content: [] },
                         { id: 'inactives', title: 'Inativos', content: [] } ]
  let classroom = { authors: [], classroomViews: [] }

  BloggerRequestApi.getBlogId(blogUrl).then((blogId) => {
    BloggerRequestApi.getPostById(blogId, postId).then((fetchedPost) => {
          let postData = { id: fetchedPost.id, title: fetchedPost.title, content: html2text(fetchedPost.content), comments: [] }
          BloggerRequestApi.getCommentsByPost(blogId, fetchedPost.id).then((comments) => {

              comments.forEach(comment => {

                if(numOfComments[comment.author.id] == null) {
                  numOfComments[comment.author.id] = 1;
                } else {
                  numOfComments[comment.author.id] += 1;
                }

                let replies = []

                if(!viewedComments.has(comment.id)) {

                    comments.forEach((reply) => {
                      if(typeof reply.inReplyTo !== 'undefined') {								
                        if(reply !== comment && reply.inReplyTo.id == comment.id) {
                            viewedComments.add(reply.id)
                            let newReply = { 
                              id: reply.id, 
                              author: {
                                id: reply.author.id,
                                name: shortenName(reply.author.displayName.toString()),
                                pic: {
                                  src: reply.author.image.url,
                                  alt: reply.author.url
                                },
                              },
                              content: html2text(reply.content),
                              published: reply.published
                            }
                            replies.push(newReply)
                            let shortenedAuthorName = shortenName(reply.author.displayName)
                            let newAuthor = {
                              id: comment.author.id,
                              pic: {
                                src: comment.author.image.url,
                                alt: comment.author.url
                              },
                              name: shortenedAuthorName,
                              numComments: 0
                            }
                            if(!namesSet.has(shortenedAuthorName)) {
                              classroom.authors.push(newAuthor)
                              namesSet.add(shortenedAuthorName)
                            }
                        }
                      }
                    })

                    let newComment = {
                        id: comment.id,
                        author: {
                          id: comment.author.id,
                          name: shortenName(comment.author.displayName.toString()),
                          pic: {
                            src: comment.author.image.url,
                            alt: comment.author.url
                          }
                        },
                        content: html2text(comment.content),
                        published: comment.published,
                        replies: replies
                    }

                    let shortenedAuthorName = shortenName(comment.author.displayName)
                    let newAuthor = {
                      id: comment.author.id,
                      pic: {
                        src: comment.author.image.url,
                        alt: comment.author.url
                      },
                      name: shortenedAuthorName,
                      numComments: 0
                    }
                    if(!namesSet.has(shortenedAuthorName)) {
                      namesSet.add(shortenedAuthorName)
                      classroom.authors.push(newAuthor)
                    }
                    postData.comments.push(newComment)
                    viewedComments.add(comment.id)

                }
              })

              
              classroom.authors.forEach((author) => {
                  author.numComments = numOfComments[author.id]
                  author.numComments > 0 ? 
                    classroomViews[0].content.push(author)
                    :
                    classroomViews[2].content.push(author)
                  
              })

              let postsList = []

              BloggerRequestApi.getPosts(blogId).then((posts) => {
                posts.forEach(post => {
                    let newPost = { id: post.id, title: post.title }
                    postsList.push(newPost)
                })
                let response = {
                  classroom: classroomViews,
                  post: postData,
                  postsList: postsList
                }

                res.json(response)
              })

          })

      })
  })

})

app.get('/visualizer/mock', (req, res) => {

    console.log(req.params.postId)

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
    
    res.json(response);

})

app.listen(port, hostname, () => {
	console.log('Server running at http://' + hostname + ':' + port + '/');
})
