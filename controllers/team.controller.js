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
    teamManager.teamId = newTeam._id;
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
    
    const isManager = await TeamService.isTeamManager({ _id: req.params.teamId }, req.auth)

    if (!isManager) {
      return res.status(400).send({
        success: false,
        message: 'Unauthorised access'
      })
    }

    const team = await TeamService.findById(req.params.teamId);

    if (_.isEmpty(team)) {
      return res.status(404).send({
        success: false,
        message: 'team not found'
      });
    }


    const player = await User.findOne({ 
      _id: req.body.playerId, role: 'player'
    });

    if (_.isEmpty(player)) {
      return res.status(404).send({
        success: false,
        message: 'player not found'
      });
    }

    const isTeamMember = TeamService.isTeamMember(player, team);
    
    if (isTeamMember) {
      return res.status(404).send({
        success: false,
        message: 'No changes was done. This player is already a member'
      });
    }

    player.teamId = team._id;
    await player.save()

    team.numberOfPlayers += 1
    await team.save()

    return res.status(201).send({
      success: true,
      message: 'player addition was success',
      data: player
    });

  }

  async removePlayer (req, res) {
    const isManager = await TeamService.isTeamManager({ _id: req.params.teamId }, req.auth)

    if (!isManager) {
      return res.status(400).send({
        success: false,
        message: 'Unauthorised access'
      })
    }
    
    const team = await TeamService.findById(req.params.teamId);

    if (_.isEmpty(team) ) {
      return res.status(404).send({
        success: false,
        message: 'team not found'
      });
    }

    const player = await User.findOne({ 
      _id: req.params.id, teamId: team._id, role: 'player'
    });

    if (_.isEmpty(player)) {
      return res.status(404).send({
        success: false,
        message: 'player not found on this team or does not exist'
      });
    }

    const isTeamMember = TeamService.isTeamMember(player, team);
    if (!isTeamMember) {
      return res.status(404).send({
        success: false,
        message: 'This player does not belong to this team'
      });
    }

    player.teamId = null;
    await player.save()

    team.numberOfPlayers -= 1
    await team.save()

    return res.status(201).send({
      success: true,
      message: 'player removal was success',
      data: player
    });

  }

  // allow player to leave a team
  async leaveTeam(req, res) {
    const isMember = TeamService.isTeamMember(req.auth, req.params.teamId)

    if (!isMember) {
      return res.status(400).send({
        success: false,
        message: 'User is not a team member'
      });
    }

    const team = await TeamService.findById(req.params.teamId);

    if (_.isEmpty(team) ) {
      return res.status(404).send({
        success: false,
        message: 'team not found'
      });
    }

    const player = await User.findOne({ 
      _id: req.params.id, teamId: team._id, role: 'player'
    });

    if (_.isEmpty(player)) {
      return res.status(404).send({
        success: false,
        message: 'player not found'
      });
    }

    player.teamId = null;
    await player.save()

    team.numberOfPlayers -= 1
    await team.save()

    return res.status(201).send({
      success: true,
      message: 'success',
      data: player
    });

  }

  // allow manager to join an existing team
  async joinTeam(req, res) {
    const team = await TeamService.findById(req.params.id);
    if(_.isEmpty(team)) {
      return res.status(404).send({
        success: false,
        message: 'Team not found'
      })
    }

    // to be continue
  }

}

export default new TeamController();
