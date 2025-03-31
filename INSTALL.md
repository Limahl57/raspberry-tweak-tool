
# Beginner-Friendly Installation Guide

This guide will help you set up this Raspberry Pi Tool project on your computer, even if you're new to programming.

## Prerequisites

You only need these two things installed:

1. **Node.js** - This is the platform that runs our code
2. **npm** - This is a package manager that comes with Node.js

## Step 1: Install Node.js and npm

### For Windows:
1. Go to [Node.js website](https://nodejs.org/)
2. Download the "LTS" (Long Term Support) version
3. Run the installer and follow the prompts (accept all defaults)
4. To verify installation, open Command Prompt and type:
   ```
   node --version
   npm --version
   ```

### For Mac:
1. Go to [Node.js website](https://nodejs.org/)
2. Download the "LTS" version
3. Run the installer and follow the prompts
4. To verify installation, open Terminal and type:
   ```
   node --version
   npm --version
   ```

### For Linux:
```bash
# Update your package list
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Verify installation
node --version
npm --version
```

## Step 2: Download the Project

### Option 1: Using Git (Recommended)
1. Install Git from [git-scm.com](https://git-scm.com/downloads)
2. Open Terminal/Command Prompt
3. Navigate to where you want to save the project
4. Run:
   ```
   git clone https://github.com/yourusername/raspberry-tweak-tool.git
   cd raspberry-tweak-tool
   ```

### Option 2: Download ZIP
1. Go to the GitHub project page
2. Click the "Code" button and select "Download ZIP"
3. Extract the ZIP file to a folder
4. Open Terminal/Command Prompt and navigate to that folder

## Step 3: Install and Run the Project

1. Open Terminal/Command Prompt in the project folder
2. Install dependencies:
   ```
   npm install
   ```
3. Start the application:
   ```
   npm run dev
   ```
4. Open your web browser and go to:
   ```
   http://localhost:8080
   ```

## Troubleshooting

### If you see "command not found" for npm or node:
- Make sure you completed Step 1 correctly
- Try restarting your computer
- For Mac/Linux users, make sure your PATH environment variable includes npm and node

### If installation fails with errors:
- Make sure you have a stable internet connection
- Try running `npm cache clean --force` and then `npm install` again
- Make sure you're in the correct project directory

### If the app doesn't start:
- Check if the console shows any errors
- Make sure port 8080 isn't being used by another application

## Need More Help?

If you're still having trouble, feel free to:
1. Open an issue on the project's GitHub page
2. Contact the project maintainer
3. Search the error message online for potential solutions

Remember, everyone starts somewhere in programming. Don't be discouraged if you encounter issues - troubleshooting is part of the learning process!
