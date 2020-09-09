# Web Application - horizon-webapp

Web application for the project Horizon delivering a cloud-based platform that implements a Digital Client Engagement expeirence for the XForce Threat Management - XFTM for initiative for IBM Security Services. Our goal is to create a simple, tailored experience for our clients that facilitates action and inspires trust with insights and transparency.

Read more about [Horizon Web Application Architecture](https://pages.github.ibm.com/mss-transformation/horizon-design/devops/kubernetes.html).
This application was created by the [generator-horizon](https://github.ibm.com/mss-transformation/generator-horizon) generator.  

## Getting Started

1. Clone the project locally
2. Install and configure Vault on your local system.  Follow the [Vault tutorial](https://pages.github.ibm.com/mss-transformation/horizon-design/security/vault/tutorial.html) to install Vault, and the [AppRole](https://pages.github.ibm.com/mss-transformation/horizon-design/security/vault/app-role.html) section to configure your system to read from Vault.
3. Artifactory setup
    - in the Set Me Up section on [Artifactory](https://na.artifactory.swg-devops.com/artifactory/webapp/#/home) search for `mss-npm-virtual`.  If you did not find that repo in the search, then you need to request access to the MSS shared Artifactory account on #iss-eng-itpo Slack channel
    - follow the [Artifactory Authentication](https://taas.w3ibm.mybluemix.net/guides/artifactory-authentication-npm.md) guide to configure your local `.npmrc` file
    - set the registry URL in your `.npmrc` file to https://na.artifactory.swg-devops.com/artifactory/api/npm/mss-npm-virtual/
4. generate the `.env` file in the root of your project
    - run `npm run init:dev` to configure the app to use the DEV environment
    - run `npm run init:prod` to configure the app to use the DEV environment

## Running the application

To run the application in watch mode, run this command from the root project directory

```
npm run ui
```

A browser window should automatically open and navigate to http://localhost:3000/.  Source code changes will cause the browser to automatically reload the page.  This allows you to quickly see your changes, without having to rebuild the project and restart the application server. 

To run the application with the bundled Express server:

```
npm run build
npm start
```

In this case you will access the application at http://localhost:8080/ 

## Testing

### Unit testing

The project has been configured by default with [Jest](https://facebook.github.io/jest/) for unit testing.  To run unit tests, run the following cmd:

```
npm test
```

A convention used in this project is to create a directory named \__tests__ along side your React code, and place tests inside of this directory.  Test file names should end with `.test.js`

### e2e testing

This project has also been configured with support for end-to-end (e2e) testing.  Tests are developed and run with [Cypress](https://docs.cypress.io/guides/overview/why-cypress.html).

To execute e2e tests run this cmd:

```
npm run e2e
```

## Docker

This application can be run inside of a docker container with the following cmd:

```
npm run docker
```

and access the application at http://localhost:8080/

## Security

### helmet

The helmet Express middleware is included, which will enable certain HTTP headers for added security.

## Travis CI (continuous integration)

A Travis build script is included with this project.  Each commit will trigger a build in Travis CI, which will do the following:

* install project dependencies
* build the project
* run the application
* run ESLint
* run the unit tests
* run the e2e tests

## Ingress controller
This application is accessible on

-DEV:
https://dev-center.sec.ibm.com/

-PROD:
https://center.sec.ibm.com/


### Contact
- Slack #[horizon](https://ibm-security.slack.com/messages/C8Q3F91EF)
- [Horizon-design](https://pages.github.ibm.com/mss-transformation/horizon-design/)documentation.
