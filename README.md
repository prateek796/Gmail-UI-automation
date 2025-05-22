# Gmail UI Automation

This project demonstrates automated interaction with Gmail using Playwright.

## Features

- Automated Gmail login
- Email search functionality
- Automated email reply
- Human-like interaction patterns
- Anti-detection measures
- Detailed test reporting

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- A Gmail account for testing

## Installation

1. Clone the repository:
```bash
git clone https://github.com/prateek796/Gmail-UI-automation.git
cd Gmail-UI-automation
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Gmail credentials:
```
GMAIL_EMAIL=your.email@gmail.com
GMAIL_PASSWORD=your_password
```

## Configuration

The project uses Playwright with specific configurations to avoid automation detection:

- Non-headless mode for better visibility
- Custom user agent
- Geolocation settings
- Viewport configuration
- Anti-detection browser arguments

Key configuration settings can be found in `playwright.config.js`.

## Running Tests

To run the tests:

```bash
npx playwright test
```

To run tests with UI mode:

```bash
npx playwright test --ui
```

## Test Structure

The main test file (`specs/gmail.spec.js`) includes the following test steps:

1. Navigate to Gmail
2. Login with credentials
3. Search for specific emails
4. Select and open an email
5. Compose and send a reply
6. Validate the reply

## Anti-Detection Measures

The automation includes several features to avoid detection:

- Random delays between actions
- Human-like typing patterns
- Custom user agent
- Geolocation spoofing
- Browser fingerprint modifications

## Test Reports

After test execution, you can find the reports in:
- HTML reports: `playwright-report/`
- Test results: `test-results/`


## License

This project is open source and available under the MIT License. 