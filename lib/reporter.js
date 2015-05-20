'use strict';

var plato = require('plato');
var fs = require('fs');
var Q = require('q');
var utils = require('./utils');
var config = require('./config');

function inspect(project, reportsDirectory) {
    var dfd = Q.defer();
    var projectRoot = utils.getProjectDirectory(project);

    var options = {
        title: project.title,
        jshint: {}
    }
    if (project.jshint) {
        var jshintrc = JSON.parse(fs.readFileSync(projectRoot + project.jshint, 'utf-8'));
        options.jshint.globals = jshintrc.globals;
        delete jshintrc.globals;
        options.jshint.options = jshintrc;
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
