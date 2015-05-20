'use strict';
var path = require('path');

function getProjectDirectory(project) {
    var title = project.title.toLowerCase();
    return getProjectsDirectory() + title + '/';
}

function getProjectsDirectory() {
    return path.join(__dirname, '../', 'projects/');
}

function getReportsDirectory() {
    return path.join(__dirname, '../', 'reports/');
}

exports.getProjectDirectory = getProjectDirectory;
exports.getProjectsDirectory = getProjectsDirectory;
exports.getReportsDirectory = getReportsDirectory;
