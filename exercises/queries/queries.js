const Post = require('./post')

const postByTitle = (title) => {
  return Post.findOne({title}).exec()
}

const postsForAuthor = (authorId) => {
  return Post.find({author: authorId}).exec()
}

const fullPostById = (id) => {
  return Post.findById(id)
    .populate('author')
    .populate('similarPosts')
    .exec()
}

const selectivePostsByLatest = (fieldsToSelect) => {
  return Post.find({})
    .select(fieldsToSelect)
    .sort('-createdAt')
    .exec()
}

const postByContentLength = (maxContentLength, minContentLength) => {
  return Post.find({
    content: {$lt: maxContentLength, $gt: minContentLength}
  })
    .exec()
}

const addRelatedPosts = (postId, relatedPosts) => {
  return Post.findById(postId, {$pushAll: {relatedPosts}}, {new: true})
}

module.exports = {
  postByTitle,
  postsForAuthor,
  postByContentLength,
  fullPostById,
  selectivePostsByLatest,
  postByContentLength,
  addRelatedPosts
}
