# Gmail Automation Script

This script automates the process of replying to a Zeplyn email invitation using the Gmail API.

## Prerequisites

- Node.js installed on your system
- Google Cloud Project with Gmail API enabled
- OAuth 2.0 credentials

## Setup

1. Set up Google Cloud Project and enable Gmail API:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - Enable the Gmail API
   - Go to Credentials
   - Create OAuth 2.0 Client ID credentials
   - Download the credentials JSON file

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your OAuth credentials:
```
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/oauth2callback
GOOGLE_REFRESH_TOKEN=your-refresh-token
```

4. Get the refresh token:
   - Run the script once
   - Follow the authentication flow in your browser
   - Copy the refresh token from the console output
   - Add it to your .env file

## Running the Script

```bash
npm start
```

The script will:
1. Authenticate with Gmail API
2. Search for emails from Zeplyn
3. Find the most recent email
4. Send a reply with the acceptance message

## Notes

- This script uses the official Gmail API, which is more reliable and secure than browser automation
- The script maintains proper email threading by using the original message's thread ID
- Make sure your OAuth credentials have the necessary Gmail API scopes enabled 