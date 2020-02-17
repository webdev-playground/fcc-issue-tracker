/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const _ = require("lodash");

var expect = require("chai").expect;
const Issue = require("../models/issue");

module.exports = function(app) {
  app
    .route("/api/issues/:project")

    .get(async function(req, res) {
      const project = req.params.project;
      const {
        _id,
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
        created_on,
        updated_on,
        open
      } = req.query;
      const queries = {
        project,
        _id,
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
        created_on,
        updated_on,
        open
      };
      console.log(queries.issue_text);
      // remove undefined properties
      const searchFilters = Object.keys(queries).reduce((obj, key) => {
        if (queries[key] !== undefined) {
          obj[key] = queries[key];
        }
        return obj;
      }, {});
      console.log(searchFilters)

      try {
        const foundIssues = await Issue.find(searchFilters);
        if (!foundIssues) {
          return res
            .status(404)
            .json({ message: "No issues found for project " + project });
        }

        return res.status(200).json(foundIssues);
      } catch (err) {
        return res
          .status(400)
          .json({ error: "Failed to retrieve issues for project " + project });
      }
    })

    .post(async function(req, res) {
      const project = req.params.project;
      const {
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text
      } = req.body;
      try {
        const newIssue = await Issue.create({
          project,
          issue_title,
          issue_text,
          created_by,
          assigned_to,
          status_text
        });
        return res.status(201).json(newIssue);
      } catch (err) {
        return res.status(400).json({ error: "Failed to create issue." });
      }
    })

    .put(async function(req, res) {
      const project = req.params.project;
      const {
        _id,
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
        open
      } = req.body;
      try {
        const updatedIssue = await Issue.findOneAndUpdate(
          { _id, project },
          {
            issue_title,
            issue_text,
            created_by,
            assigned_to,
            status_text,
            open,
            updated_on: Date.now()
          },
          { new: true, omitUndefined: true }
        );
        if (!updatedIssue) {
          return res.status(404).json({ error: "No such issue found." });
        }
        return res.status(200).json(updatedIssue);
      } catch (err) {
        return res.status(400).json({ error: "Failed to update issue." });
      }
    })

    .delete(async function(req, res) {
      const project = req.params.project;
      const { _id } = req.body;
      console.log("hello");
      try {
        await Issue.findOneAndDelete({ _id, project });
        return res.status(200).json({ message: "Deleted issue." });
      } catch (err) {
        return res.status(400).json({ error: "Failed to delete issue." });
      }
    });
};
