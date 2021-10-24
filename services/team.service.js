/* eslint-disable import/extensions */
/* eslint-disable no-else-return */
/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import mongoose from 'mongoose';

import Team from '../models/team.model.js';

const { isValidObjectId } = mongoose;

class TeamService {
  async findByName(team) {
    const _team = await Team.findOne({ team });

    return _team;
  }

  async findById(id) {
    const team = await Team.findById(id);

    return team;
  }

  async findByCaptainId(captainId) {
    const team = await Team.findOne({ captainId });

    return team;
  }

  async findByViceCaptain(viceCaptainId) {
    const team = await Team.findOne({ viceCaptainId });

    return team;
  }

  async findByIdAndUpdate(id, update = {}) {
    // this may fail and if does we want to know what happen
    // let try
    try {
      const team = await Team.findByIdAndUpdate(id, update,
        { new: true, runValidators: true });
  
        return team
    } catch (error) {
      throw new Error(error)
    }
  }

  async isTeamManager(team, user) {
    return this.isManager(user.role) && this.isTeamMember(user, team)
  }

  isManager(role) {
    return role === 'manager';
  }

  isPlayer(role) {
    return role === 'player';
  }



  // check if the user belong to the team
  isTeamMember(user, team) {
    return team._id.toString() === user.teamId.toString()
  }

}

export default new TeamService();
