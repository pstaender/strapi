'use strict';

const _ = require('lodash');
const findPackagePath = require('../load/package-path');
const loadFiles = require('../load/load-files');
const loadConfig = require('../load/load-config-files');

module.exports = async strapi => {
  const adminPath = findPackagePath('strapi-admin');
  const [files, config] = await Promise.all([
    loadFiles(adminPath, '!(config|node_modules|scripts)/*.*(js|json)'),
    loadConfig(adminPath),
  ]);

  const userConfig = strapi.config.get(['plugins', 'admin'], {});
  const mergedConfig = _.merge(config, { config: userConfig });

  return Object.assign({}, mergedConfig, files);
};
