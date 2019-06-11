var plumb = require('plumb');

async function getBlogId(blogUrl) {

	const getBlog = await blogger.blogs.getByUrl( { url: blogUrl } )

	return getBlog.data.id

}

module.exports = plumb(
    getBlogId
)