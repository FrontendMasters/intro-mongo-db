const User = require('../user')
const crud = require('../crud')

describe('User crud', () => {
  describe('getUserById', () => {
    test('get user by object id', async () => {
      const user = await User.create({
        firstName: 'Nemo',
        lastName: 'Nemo',
        email: 'nemo@nemo.com'
      })
      const match = await crud.getUserById(user.id)

      expect(match.id).toBe(user.id)
    })
  })
  describe('getAllUsers', () => {
    test('get all users in the DB', async () => {
      const usersToCreate = [
        {
          firstName: 'Nemo',
          lastName: 'Nemo',
          email: 'nemo@nemo.com'
        },
        {
          firstName: 'Nemo1',
          lastName: 'Nemo1',
          email: 'nemo1@nemo.com'
        },
        {
          firstName: 'Nemo3',
          lastName: 'Nemo3',
          email: 'nemo3@nemo.com'
        }
      ]
      const users = await User.create(usersToCreate)
      const matchedUsers = await crud.getAllUsers()
      
      expect(matchedUsers).toHaveLength(users.length)
    })
  })
  describe('createUser', () => {
    test('create a user', async () => {
      const userConfig = {
        firstName: 'Nemo',
        lastName: 'Nemo',
        email: 'nemo@nemo.com'
      }
      const {id} = await crud.createUser(userConfig)
      const match = await User.findById(id).exec()
      expect(match.id).toBe(id)
    })
  })
  describe('removeUserById', () => {
    test('remove user by id', async () => {
      const {id} = await User.create({
        firstName: 'Nemo',
        lastName: 'Nemo',
        email: 'nemo@nemo.com'
      })
      await crud.removeUserById(id)
      const match = await User.findById(id).exec()
      expect(match).toBe(null)
    })
  })
  describe('updateUserById', () => {
    test('update user by id', async () => {
      const {id} = await User.create({
        firstName: 'Nemo',
        lastName: 'Nemo',
        email: 'nemo@nemo.com'
      })
      const user = await crud.updateUserById(id, {betaUser: true})
      expect(user.id).toBe(id)
      expect(user.betaUser).toBe(true)
    })
  })
})
