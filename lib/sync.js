'use strict';

var cp = require('child_process');
var clone = require('nodegit').Clone.clone;
var Q = require('q');
var utils = require('./utils');
var config = require('./config');

function updateExisting(directory) {
    var dfd = Q.defer();
    cp.exec('find . -type d -depth 1 -exec git --git-dir={}/.git --work-tree=$PWD/{} pull origin master \\;', {
        cwd: directory
    }, dfd.resolve);
    return dfd.promise;
}

function cloneAll(directory) {
    var dfds = [];
    config.projects.forEach(function (p) {
        dfds.push(clone(p.repo, directory + p.title.toLowerCase()));
    });
    return Q.all(dfds);
}

module.exports = function () {
    var projectsDirectory = utils.getProjectsDirectory();
    return updateExisting(projectsDirectory)
        .then(function () {
            return cloneAll(projectsDirectory);
        });
};
