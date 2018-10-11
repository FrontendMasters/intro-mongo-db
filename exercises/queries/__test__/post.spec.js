const Post = require('../post')
const Author = require('../author')

describe('Post model', () => {
  test('author is required and id type', async () => {
    expect.assertions(2)
    const content = 'There are a bunch books out there with movies. But which ones are legit?'
    try {
      await Post.create({
        content,
        title: 'Top ten movie books',
        contentLength: content.length
      })
    } catch (e) {
      expect(e).toBeTruthy()
    }

    try {
      await Post.create({
        content,
        contentLength: content.length,
        title: 'Top ten movie books',
        author: 'hello'
      })
    } catch (e) {
      expect(e).toBeTruthy()
    }
  })
  test('author must ref author collection', async () => {
    const name = 'JK Moose'
    const content = 'There are a bunch books out there with movies. But which ones are legit?'
    const author = await Author.create({
      name,
      bio: 'I have so many awards'
    })

    const post = await Post.create({
      content,
      contentLength: content.length,
      title: 'Top ten movie books',
      author: author.id
    })

    const p = await post.populate('author').execPopulate()
    expect(p.author.name).toBe(name)
  })
})
