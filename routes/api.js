/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
const Issue = require("../models/issue");

module.exports = function(app) {
  app
    .route("/api/issues/:project")

    .get(async function(req, res) {
      const project = req.params.project;
      const queries = req.query;
      try {
        const foundIssues = await Issue.find({ project });
        if (!foundIssues) {
          return res.status(404).json({ message: 'No issues found for project ' + project });
        }
        
        return res.status(200).json(foundIssues);
      } catch (err) {
        return res.status(400).json({ error: 'Failed to retrieve issues for project ' + project });
      }
    })

    .post(async function(req, res) {
      const project = req.params.project;
      const {
        issue_title: title,
        issue_text: issue,
        created_by: createdBy,
        assigned_to: assignedTo,
        status_text: status
      } = req.body;
      try {
        const newIssue = await Issue.create({
          project,
          title,
          issue,
          createdBy,
          assignedTo,
          status
        });
        return res.json(201).json(newIssue);
      } catch (err) {
        return res.status(400).json({ error: "Failed to create issue." });
      }
    })

    .put(async function(req, res) {
      const project = req.params.project;
      const {
        _id: id,
        issue_title: title,
        issue_text: issue,
        created_by: createdBy,
        assigned_to: assignedTo,
        status_text: status,
        open
      } = req.body;
      try {
        const updatedIssue = await Issue.findOneAndUpdate(
          { id, project },
          { title, issue, createdBy, assignedTo, status, open, updatedOn: Date.now() },
          { new: true, omitUndefined: true }
        );
        return res.status(200).json(updatedIssue);
      } catch (err) {
        return res.status(400).json({ error: 'Failed to update issue.' });
      }
    })

    .delete(async function(req, res) {
      const project = req.params.project;
      const { _id: id } = req.body;
      try {
        await Issue.findOneAndDelete({ id, project });
        return res.status(200).json({ message: 'Deleted issue.' });
      } catch (err) {
        return res.status(400).json({ error: 'Failed to delete issue.' });
      }
    });
};
