# Yle Areena playwright testing suite

## Running tests

To run tests you need to have playwright installed and all project dependencies installed

To install dependencies run

```
npm install
```

To install playwright globally run

```
npm install -g playwright
```

This installs the latest playwright version

To run tests use the command

```
npx playwright test
```
To show html report after test

```
npx playwright show-report
```

## Suites

Tests can be found in the `tests` directory

### Tests

- User email validation
- Episode validation
- 22:00 news time and name checking
