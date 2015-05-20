'use strict';
var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');

var config;

try {
    config = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../', 'config.yml'), 'utf8'));
} catch (e) {
    console.log(e);
    process.exit();
}

if (!config) {
    console.error('Missing config');
    process.exit();
}
if (!config.projects || !config.projects.length) {
    console.error('No projects found');
    process.exit();
}

module.exports = config;
