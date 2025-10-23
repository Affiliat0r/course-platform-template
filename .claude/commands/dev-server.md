# Start Development Server

Start the Next.js development server on localhost:3000 for the TechTrain course platform.

## Instructions

1. Check if port 3000 is currently in use
2. If port 3000 is in use, show which process is using it and inform the user
3. Navigate to the `techtrain-courses` directory
4. Start the development server with `npm run dev`
5. Inform the user that the server is starting

**IMPORTANT:** This command should start the server automatically. The server will run in the foreground.

## Example Workflow

```bash
# Navigate to the application directory
cd techtrain-courses

# Check if port 3000 is in use (Windows)
netstat -ano | findstr :3000 | findstr LISTENING

# If port is in use, show this message:
# "⚠️  Port 3000 is already in use!"
# "To kill the process: taskkill /PID <PID_NUMBER> /F"
# "Or use a different port: npm run dev -- -p 3001"

# Start the development server
npm run dev
```

## What the User Gets

After the server starts:
- Application available at: **http://localhost:3000**
- Hot reload enabled for instant code changes
- TypeScript type checking active
- Tailwind CSS compilation running
- Press Ctrl+C to stop the server

## Common Issues

**Port 3000 in use:**
```bash
# Find the process
netstat -ano | findstr :3000

# Kill it
taskkill /PID <PID_NUMBER> /F

# Or use different port
cd techtrain-courses
npm run dev -- -p 3001
```

**Dependencies not installed:**
```bash
cd techtrain-courses
npm install
npm run dev
```
