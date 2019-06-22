
const { google } = require('googleapis')

const blogger = google.blogger({
    version: 'v3',
    auth: process.env.API_KEY
})

class BloggerRequestApi {

	static async getBlogId(blogUrl) {

		const getBlog = await blogger.blogs.getByUrl( { url: blogUrl } )

		return getBlog.data.id

	}

	static async getLastPost(blogId) {

		const getPosts = await blogger.posts.list( { blogId: blogId } )
		const lastPostId = getPosts.data.items[0].id // gets the latest post
	
		const getPost = await blogger.posts.get( { blogId: blogId, postId: lastPostId } )
	
		return getPost.data
	
	}
	
	static async getPosts(blogId) {
	
		const getPosts = await blogger.posts.list( { blogId: blogId } )
	
		return getPosts.data.items
	
	}
	
	static async getCommentsByPost(blogId, postId) {
	
		const getComments = await blogger.comments.list( { blogId: blogId, postId: postId, maxResults: 200 } )
	
		return getComments.data.items
	
	}
	
	static async getPostById(blogId, postId) {
	
		const getPost = await blogger.posts.get( { blogId: blogId, postId: postId } )
	
		return getPost.data
	
	}

}

module.exports = BloggerRequestApi