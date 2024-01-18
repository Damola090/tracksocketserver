class SuperUser {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.myAgents = [];
  }

  addAgent(agent) {
    this.myAgents.push(agent);
  }
}

module.exports = SuperUser;
