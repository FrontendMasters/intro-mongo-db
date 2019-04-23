const {
  postByTitle,
  postByContentLength,
  postsForAuthor,
  fullPostById,
  allPostsSlim,
  addSimilarPosts
} = require('../queries')
const Post = require('../post')
const Author = require('../author')
const mongoose = require('mongoose')
const createContent = (length, fill = 'b') => new Array(length).fill(fill).join('')

describe('queries', () => {
  describe('postByTitle', () => {
    test('get post by title', async () => {
      const title = 'cat bedtime'
      const post = await Post.create({
        title,
        author: mongoose.Types.ObjectId(),
        content: createContent(50),
        contentLength: 50
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
        content: createContent(50),
        contentLength: 50
      })
      const [match] = await postsForAuthor(author)
      expect(match.author.toString()).toBe(post.author.toString())
    })
  })

  describe('postByContentLength', () => {
    test('find posts in between content lengths', async () => {
      const author = mongoose.Types.ObjectId()

      const posts = await Post.create([
        {title: 'Super Duper', author, content: createContent(1000), contentLength: 1000},
        {title: 'Amazing', author, content: createContent(100), contentLength: 100},
        {title: 'Other', author, content: createContent(800), contentLength: 800}
      ])

      const matches = await postByContentLength(1000, 100)
      expect(matches).toHaveLength(1)
    })
  })
  describe('fullPostById', () => {
    test('finds post by id and populates everything', async () => {
      const author = await Author.create({
        name: 'Doodle Noodle',
        bio: 'I am a noodle'
      })
      const post = await Post.create({
        title: 'Super Duper',
        author: author.id,
        content: createContent(1000),
        contentLength: 1000
      })
      const post2 = await Post.create({
        author: author.id,
        title: 'Post 2',
        content: createContent(100),
        contentLength: 100,
        similarPosts: [post.id]
      })

      const match = await fullPostById(post2.id)
      expect(match.author._id.toString()).toBe(author.id.toString())
    })
  })
  describe('selectivePostsByLatest', () => {
    test('only selects fields given', async () => {
      const author = mongoose.Types.ObjectId()
      await Post.create([
        {title: 'learn things', content: createContent(100), contentLength: 100, author},
        {title: 'lean more things', content: createContent(100), contentLength: 100, author},
        {title: 'lean more things++', content: createContent(100), contentLength: 100, author}
      ])

      const matches = await allPostsSlim({title: 1, content: 1})
      expect(matches).toHaveLength(3)
      matches.forEach(match => {
        const post = match.toJSON()
        expect(post).not.toHaveProperty('contentLength')
        expect(post).not.toHaveProperty('author')
      })
    })
  })
  describe('addRelatedPosts', () => {
    test('should not override related posts that are there', async () => {
      const author = mongoose.Types.ObjectId()
      const post = await Post.create({
        author,
        title: 'Post',
        content: createContent(100),
        contentLength: 100,
        similarPosts: [mongoose.Types.ObjectId()]
      }) 

      const updated = await addSimilarPosts(post.id, [
        mongoose.Types.ObjectId(),
        mongoose.Types.ObjectId()
      ])
      expect(updated.similarPosts).toHaveLength(3)
    })
  })
})
