## Hackney Adult Social Care (HASC) Frontend

This is the frontend repo for HASC. To start the project please use the command _yarn dev_. The other half of this application, i.e. the backend/api section can be found [here](https://github.com/LBHackney-IT/lbh-adult-social-care-api).

The project uses Next.js and redux, and also features storybook to live document [the component library based on the hackney design system ](https://design-system.hackney.gov.uk/). To run storybook, use the command _yarn storybook_.

Form and data handling in this project are managed using the popular [react-hook-form](https://www.npmjs.com/package/react-hook-form) library, with [yup](https://www.npmjs.com/package/yup) used for schema validation. SCSS is used for styling.

## Ignore linting on pre-commit

Use `--no-verify` to bypass pre-commit linting

```sh
git commit -m "Message" --no-verify
```
