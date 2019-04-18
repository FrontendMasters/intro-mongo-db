const Project = require('../project');
const Org = require('../org');
const mongoose = require('mongoose');
const cdnUrl = 'https://cdn.adminapp.com';

describe('Org model', () => {
  test('removes projects when org is removed', async () => {
    const org = await Org.create({ name: 'org' });
    await Project.create([
      { name: 'project1', org: org.id },
      { name: 'project', org: org.id }
    ]);

    await org.remove();
    const matchedProjects = await Project.find({ org: org._id }).exec();
    expect(matchedProjects).toHaveLength(0);
  });

  test('has the avatar virtual getter', async () => {
    const org = await Org.create({ name: 'org' });
    expect(org.avatar).toBe(`${cdnUrl}/${org._id}`);
  });
});
