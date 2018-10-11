const Project = require('../project')
const mongoose = require('mongoose')

describe('Project model', () => {
  test('project names are unique per org', async () => {
    expect.assertions(1)

    const org = mongoose.Types.ObjectId()
    const name = 'name'
    try {
      await Project.init()
      await Project.create([
        {org, name},
        {org, name}
      ])
    } catch (e) {
      expect(e).toBeTruthy()
    }
  })
  test('budgetLeft virtual should calculate budget left', async () => {
    const project = await Project.create({
      name: 'p1',
      org: mongoose.Types.ObjectId(),
      budget: 4000,
      spent: 1000
    })

    expect(project.budgetLeft).toBe(3000)
  })
})
