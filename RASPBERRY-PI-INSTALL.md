
# Installing Raspberry Pi Tool on Your Raspberry Pi

This guide will help you install the Raspberry Pi Tool directly on your Raspberry Pi device.

## Prerequisites

You need a Raspberry Pi with:
- Raspberry Pi OS installed (formerly called Raspbian)
- Internet connection
- Access to Terminal (either directly or via SSH)

## Installation Steps

### Step 1: Update Your Raspberry Pi

First, make sure your Raspberry Pi is up to date:

```bash
sudo apt update
sudo apt upgrade -y
```

### Step 2: Install Node.js and npm

Install Node.js and npm (Node Package Manager) using the package manager:

```bash
sudo apt install nodejs npm -y
```

Verify the installation:

```bash
node --version
npm --version
```

If the versions are old (Node.js less than v14), you might want to use a more recent version:

```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
```

### Step 3: Download the Raspberry Pi Tool

Navigate to where you want to install the tool:

```bash
cd ~
```

Clone the repository:

```bash
git clone https://github.com/yourusername/raspberry-tweak-tool.git
cd raspberry-tweak-tool
```

### Step 4: Install Dependencies and Run the Tool

Install the required packages:

```bash
npm install
```

Start the application:

```bash
npm run dev
```

### Step 5: Access the Tool

The tool should now be running on your Raspberry Pi. You can access it by:

1. If you're using the Raspberry Pi directly with a display:
   - Open a web browser on your Raspberry Pi
   - Visit: `http://localhost:8080`

2. If you're accessing remotely from another computer:
   - Find your Raspberry Pi's IP address: `hostname -I`
   - On your computer's web browser, visit: `http://[YOUR_PI_IP_ADDRESS]:8080`

## Setting Up to Run on Boot (Optional)

If you want the tool to start automatically when your Raspberry Pi boots up, you can set up a service:

1. Create a service file:

```bash
sudo nano /etc/systemd/system/raspberry-tool.service
```

2. Add the following content (adjust paths as needed):

```
[Unit]
Description=Raspberry Pi Tool
After=network.target

[Service]
WorkingDirectory=/home/pi/raspberry-tweak-tool
ExecStart=/usr/bin/npm run dev
User=pi
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

3. Enable and start the service:

```bash
sudo systemctl enable raspberry-tool.service
sudo systemctl start raspberry-tool.service
```

## Troubleshooting

### Port Already in Use
If you see an error about port 8080 being in use:
```bash
npx kill-port 8080
```
Then try starting the app again.

### Permission Issues
If you encounter permission errors:
```bash
sudo chown -R pi:pi ~/raspberry-tweak-tool
```

### Need Help?
- Check the project's GitHub page for issues or discussions
- Search online for specific error messages
- Ask in Raspberry Pi forums

## Updating the Tool

To update to the latest version:

```bash
cd ~/raspberry-tweak-tool
git pull
npm install
```

Then restart the service if you set it up:
```bash
sudo systemctl restart raspberry-tool.service
```
