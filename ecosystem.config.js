'use strict'

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'halgaiApi',
      script: 'bin/www',
      env: {
        NODE_ENV: 'development'
      },
      env_stage: {
        NODE_ENV: 'stage'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
