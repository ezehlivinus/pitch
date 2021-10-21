/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import Team from '../models/team.model.js';
import User from '../models/user.model.js';
import TeamService from '../services/team.service.js';
import UserService from '../services/user.service.js';
import validateTeam from '../validators/team.validator.js';

class TeamController {
  async create(req, res) {
    const validData = await validateTeam(req.body);
    const team = await TeamService.findByName(validData.name);

    if (_.isEmpty(team)) {
      return res.status(409).send({ success: true, message: 'team already exist' });
    }

    const newTeam = await Team.create({
      ...validData, managerId: req.auth._id
    });

    const teamManager = await UserService.findById(req.auth._id);
    teamManager.role = 'manager';
    teamManager.save();

    res.status(201).send({
      success: true,
      message: 'team created',
      data: newTeam
    });
  }

  // list all teams
  async list(req, res) {
    const teams = await Team.find();

    if (_.isEmpty(teams)) {
      return res.status(404).send({
        success: false,
        message: 'teams not found'
      });
    }

    res.status(200).send({
      success: true,
      message: 'teams list',
      data: teams
    });
  }

  async detail(req, res) {
    const team = await TeamService.findById(req.params.id);

    if (_.isEmpty(team)) {
      return res.status(404).send({
        success: false,
        message: 'team not found'
      });
    }

    res.status(200).send({
      success: true,
      message: 'team details fetched',
      data: team
    });
  }

  async update(req, res) {
    const team = await TeamService
      .findByIdAndUpdate(req.params.id, req.body);

    if (_.isEmpty(team)) {
      return res.status(200).send({
        success: false,
        message: 'team not found'
      })
    }

    res.status(200).send({
      success: true,
      message: 'team updated',
      data: team
    });
  }

  async delete(req, res) {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).send({
        success: false,
        message: 'this team might have been deleted or the team does not exist'
      });
    }

    res.status(200).send({
      success: true,
      message: 'team deleted',
      data: team
    });
  }

  async addNewPlayer (req, res) {
    
    TeamService.isPermitted('manager')


    const team = await TeamService.findById(req.params.teamId);

    if (_.isEmpty(team)) {
      return res.status(404).send({
        success: false,
        message: 'team not found'
      });
    }

    TeamService.isBelongTo(team, req.auth)

    const player = await User.findOne({ 
      id: req.params.playerId, role: 'player'
    });

    if (_.isEmpty(player)) {
      return res.status(404).send({
        success: false,
        message: 'player not found'
      });
    }

    player.teamId = team._id;
    await player.save()

    return res.status(201).send({
      success: true,
      message: 'player addition was success',
      data: player
    });

  }

  async removePlayer (req, res) {
    TeamService.isPermitted('manager')
    
    const team = await TeamService.findById(req.params.teamId);

    if (_.isEmpty(team) ) {
      return res.status(404).send({
        success: false,
        message: 'team not found'
      });
    }

    TeamService.isBelongTo(team, req.auth)

    const player = await User.findOne({ 
      id: req.params.playerId, teamId: team._id, role: 'player'
    });

    if (_.isEmpty(player)) {
      return res.status(404).send({
        success: false,
        message: 'player not found'
      });
    }

    player.teamId = team._id;
    await player.save()

    return res.status(201).send({
      success: true,
      message: 'player removal was success',
      data: player
    });

  }

  async leaveTeam(req, res) {
    TeamService.isPermitted('player')

    const team = await TeamService.findById(req.params.teamId);

    if (_.isEmpty(team) ) {
      return res.status(404).send({
        success: false,
        message: 'team not found'
      });
    }

    TeamService.isBelongTo(team, req.auth)

    const player = await User.findOne({ 
      id: req.params.playerId, teamId: team._id, role: 'player'
    });

    if (_.isEmpty(player)) {
      return res.status(404).send({
        success: false,
        message: 'player not found'
      });
    }

    player.teamId = null;
    await player.save()

    return res.status(201).send({
      success: true,
      message: 'success',
      data: player
    });

  }

}

export default new TeamController();
