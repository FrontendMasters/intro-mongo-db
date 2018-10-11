const {
  postByTitle,
  postByContentLength,
  postsForAuthor
} = require('../queries')
const Post = require('../post')
const Author = require('../post')
const mongoose = require('mongoose')
const createConent = (length, fill = 'b') => new Array(length).fill(fill).join('')

describe('queries', () => {
  describe('postByTitle', () => {
    test('get post by title', async () => {
      const title = 'cat bedtime'
      const post = await Post.create({
        title,
        author: mongoose.Types.ObjectId(),
        content: createConent(50)
      })
      
      const match = await postByTitle(title)
      expect(match.id).toBe(post.id)
    })
  })

  describe('postsForAuthor', () => {
    test('get post by author', async () => {
      const author = mongoose.Types.ObjectId()
      const post = await Post.create({
        author,
        title: 'Carter v',
        content: createConent(50)
      })
      const match = await postsForAuthor(author)
      expect(match.author.toString()).toBe(post.author.toString())
    })
  })

  describe('postByContentLength', () => {
    test('find posts in between content lengths', async () => {
      const author = mongoose.Types.ObjectId()

      const posts = await Post.create([
        {title: 'Super Duper', author, content: createConent(1000)},
        {title: 'Amazing', author, content: createConent(100)},
        {title: 'Other', author, content: createConent(800)}
      ])

      const matches = await postByContentLength(1000, 100)
      expect(matches).toHaveLength(1)
    })
  })
})
