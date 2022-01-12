## Hackney Adult Social Care (HASC) Frontend

This is the frontend repo for HASC. To start the project please use the command _yarn dev_. The other half of this application, i.e. the backend/api section can be found [here](https://github.com/LBHackney-IT/lbh-adult-social-care-api).

The project uses Next.js and redux, and also features storybook to live document [the component library based on the hackney design system ](https://design-system.hackney.gov.uk/). To run storybook, use the command _yarn storybook_.

Form and data handling in this project are managed using the popular [react-hook-form](https://www.npmjs.com/package/react-hook-form) library, with [yup](https://www.npmjs.com/package/yup) used for schema validation. SCSS is used for styling.

## Get Started
1. Clone the repo
2. Install project `yarn` or `yarn install`
3. Configure .env.local

## How to run the project locally
After setup, simply use `yarn dev` to run the project locally. This project has storybook setup, to run this please use `yarn storybook`.

## Stack
- React
- Next.js
- Redux Toolkit
- ESLint
- Prettier
- Husky
- Lint-Staged
- CSS Modules
- SCSS

## Code Quality Control
This project uses husky and lint-staged to setup pre-commit hooks which check code quality and prevent linting errors from getting commited to the project. Whenever a user attempts to commit to the project, `lint-staged` scripts will run. These are:
```
"lint-staged": {
    "**/*.js": [
      "eslint --fix --max-warnings=2",
      "prettier --write"
    ],
    "**/*.scss": [
      "prettier --write"
    ]
  }
```
This essentially runs eslint and prevents the commit from passing if any errors are found, or if there are more than two warnings. It also runs prettier on the code, this ensures code is formatted in a consistent way throughout the project. These checks are also ran on CircleCI as part of the build process, as you can see in `.circleci/config.yml`

## Ignore linting on pre-commit

Use `--no-verify` to bypass pre-commit linting

```sh
git commit -m "Message" --no-verify
```
