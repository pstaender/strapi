# Settings

Here are the following settings you can custom for the admin panel.

| Property                       | Description                                                                                                    | Type   | Default                                                                                                                   |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| `forgotPassword`               | Settings to customize the forgot password email                                                                | object | {}                                                                                                                        |
| `forgotPassword.emailTemplate` | Email template as defined in [email plugin](../plugins/email#create-an-email-from-a-template-fillemailoptions) | object | [Default template](https://github.com/strapi/strapi/tree/master/packages/strapi-admin/email-templates/forgot-password.js) |
| `forgotPassword.from`          | Sender mail address                                                                                            | string | Default value defined in your [provider configuration](../plugins/email#configure-your-provider)                          |
| `forgotPassword.replyTo`       | Default address or addresses the receiver is asked to reply to                                                 | string | Default value defined in your [provider configuration](../plugins/email#configure-your-provider)                          |

## Customize forget password email

You may want to customize the forget password email.
You can do it by providing your own template (formatted as a [lodash template](https://lodash.com/docs/4.17.15#template)).

The template will be filled with the following variables: `url`, `resetPasswordToken`, `user.email`, `user.username`.

### Example

**Path -** `./config/plugins.js`

```js
const forgotPasswordTemplate = require('../email-templates/forgot-password');

module.exports = ({ env }) => ({
  // ...
  admin: {
    forgotPassword: {
      from: 'support@mywebsite.fr',
      replyTo: 'support@mywebsite.fr',
      emailTemplate: forgotPasswordTemplate,
    },
  },
  // ...
});
```

**Path -** `./email-templates/forgot-password`

```js
const subject = `Reset password`;

const html = `<p>Hi <%= user.username %></p>
<p>Sorry you lost your password. You can click here to reset it: <%= url %>?code=<%= resetPasswordToken %></p>`;

const text = `Hi <%= user.username %>
Sorry you lost your password. You can click here to reset it: <%= url %>?code=<%= resetPasswordToken %>`;

module.exports = {
  subject,
  text,
  html,
};
```
