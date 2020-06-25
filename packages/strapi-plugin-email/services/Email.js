'use strict';

const _ = require('lodash');

const getProviderConfig = () => {
  return strapi.plugins.email.config;
};

const send = async options => {
  return strapi.plugins.email.provider.send(options);
};

/**
 * fill subject, text and html using lodash template
 * @param {object} emailOptions - to, from and replyto...
 * @param {object} emailTemplate - object containing attributes to fill
 * @param {object} data - data used to fill the template
 * @returns {{ subject, text, subject }}
 */
const fillEmailOptions = (emailOptions = {}, emailTemplate = {}, data = {}) => {
  const attributes = ['subject', 'text', 'html'];
  const missingAttributes = _.difference(attributes, Object.keys(emailTemplate));
  if (missingAttributes.length > 0) {
    throw new Error(
      `Following attributes are missing from your email template : ${missingAttributes.join(', ')}`
    );
  }

  const result = {};
  for (let attribute of attributes) {
    if (emailTemplate[attribute]) {
      result[attribute] = _.template(emailTemplate[attribute])(data);
    }
  }
  return { ...result, ...emailOptions };
};

module.exports = {
  getProviderConfig,
  send,
  fillEmailOptions,
};
