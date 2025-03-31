
# Simple Installation Tutorial for Raspberry Pi Tool

This is a step-by-step guide to install the app on your computer, with screenshots and simple explanations.

## What You Need Before Starting

You need to install:
- **Node.js** - The engine that runs our app
- **npm** - Comes with Node.js and helps install other tools

## Installation Steps

### Step 1: Install Node.js

1. Visit the Node.js website: [https://nodejs.org](https://nodejs.org)

2. Click the big green button that says "LTS" (which stands for "Long Term Support")
   
   ![Download Node.js](https://i.imgur.com/2Gg0rOe.png)

3. After downloading, open the installer file and follow these steps:
   - Click "Next" on the welcome screen
   - Accept the license agreement and click "Next"
   - Keep clicking "Next" with the default options
   - Click "Install" when ready
   - When it's done, click "Finish"

4. To check if it worked:
   - Press Windows key + R to open Run (or search for "Command Prompt" in Start menu)
   - Type `cmd` and press Enter
   - In the black window that opens, type:
     ```
     node --version
     ```
   - You should see something like `v18.12.0` (the number might be different)

### Step 2: Get The Project Files

#### Method 1: Using Download ZIP (Easiest)

1. Go to the project's GitHub page
2. Click the green "Code" button
3. Select "Download ZIP"
   
   ![Download ZIP](https://i.imgur.com/LiNw7hB.png)

4. Find the downloaded ZIP file in your Downloads folder
5. Right-click it and select "Extract All..."
6. Choose where to extract (like your Desktop) and click "Extract"

#### Method 2: Using Git (For Advanced Users)

1. Download Git from [git-scm.com](https://git-scm.com/downloads)
2. Install it with all default options
3. Open Command Prompt
4. Navigate to where you want to save the project:
   ```
   cd Desktop
   ```
5. Type:
   ```
   git clone https://github.com/yourusername/raspberry-tweak-tool.git
   cd raspberry-tweak-tool
   ```

### Step 3: Start The Application

1. Open Command Prompt (Windows) or Terminal (Mac)

2. Navigate to your project folder:
   ```
   cd path/to/your/extracted/folder
   ```
   
   (For example, if you extracted to Desktop: `cd Desktop\raspberry-tweak-tool`)

3. Install required packages by typing:
   ```
   npm install
   ```
   
   This will download necessary files and might take a few minutes.
   
   ![npm install](https://i.imgur.com/JnXnQP7.png)

4. Start the app by typing:
   ```
   npm run dev
   ```
   
   ![npm run dev](https://i.imgur.com/tjQK8oG.png)

5. Open your web browser and go to:
   ```
   http://localhost:8080
   ```

6. You should now see the Raspberry Pi Tool running!

## Common Problems and Solutions

### "Command not found" Error
- Make sure you installed Node.js correctly
- Try closing and reopening Command Prompt
- Try restarting your computer

### Installation Errors
- Check your internet connection
- Try running: `npm cache clean --force` and then try `npm install` again

### App Doesn't Start
- Make sure nothing else is using port 8080
- Check if the command prompt shows any error messages (red text)

## Still Need Help?

Feel free to:
- Ask in the project's discussion forum
- Email the project creator
- Search for your error message online

Don't worry if you run into problems - that's normal when learning programming!
