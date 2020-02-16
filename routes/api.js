/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
const Issue = require('../models/issue');

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      
    })
    
    .post(async function (req, res){
      const project = req.params.project;
      const { issue_title: title, issue_text: issue, created_by: createdBy, assigned_to: assignedTo, status_text: status } = req.body;
      try {
        const newIssue = await Issue.create({ project, title, issue, createdBy, assignedTo, status });
        return res.json(201).json(newIssue);
      } catch(err) {
        return res.status(400).json({ error: 'Failed to create issue.' });
      }
    })
    
    .put(function (req, res){
      var project = req.params.project;
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
