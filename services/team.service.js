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

  isManager() {
    return req.auth.role === 'manager';
  }

  isPlayer() {
    return req.auth.role === 'player';
  }

  async isPermitted(role) {
    
    const toPermit = {
      player: this.isPlayer(),
      manager: this.isManager()
    }

    
    if (!toPermit[role]) {
      throw Error('Unauthorised access')
    }

    return true;
  }

  isBelongTo(team, user) {
    if (team._id !== user.teamId) {
      throw Error('Unauthorised access')
    }

    return true;
  }

}

export default new TeamService();
