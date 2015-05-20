'use strict';

require('./lib/config');
var sync = require('./lib/sync');
var reporter = require('./lib/reporter');


sync().finally(reporter);
