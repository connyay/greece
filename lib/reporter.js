'use strict';

var plato = require('plato');
var Q = require('q');
var utils = require('./utils');
var config = require('./config');

function inspect(project, reportsDirectory) {
    var dfd = Q.defer();
    var projectRoot = utils.getProjectDirectory(project);

    var options = {
        title: project.title,
        jshint: projectRoot + project.jshint
    }
    plato.inspect(projectRoot + project.files, reportsDirectory + project.title.toLowerCase(), options, dfd.resolve);
    return dfd.promise;
}

module.exports = function () {
    var reportsDirectory = utils.getReportsDirectory();
    var dfds = [];
    config.projects.forEach(function (p) {
        dfds.push(inspect(p, reportsDirectory));
    });

    return Q.all(dfds);
};
