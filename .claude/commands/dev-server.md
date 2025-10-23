---
description: Start Next.js development server on localhost:3000
---

Start the Next.js development server on localhost:3000 for the TechTrain course platform.

**What this command does:**
1. Navigates to the techtrain-courses directory
2. Checks if port 3000 is already in use
3. Starts the development server with `npm run dev`
4. Provides the localhost URL to access the app

**Usage:**
```bash
/dev-server
```

**Command Implementation:**

```bash
# Navigate to the application directory
cd techtrain-courses

# Check if port 3000 is in use (Windows)
PORT_IN_USE=$(netstat -ano | findstr :3000 | findstr LISTENING)

if [ -n "$PORT_IN_USE" ]; then
    echo "⚠️  Port 3000 is already in use!"
    echo ""
    echo "Processes using port 3000:"
    netstat -ano | findstr :3000
    echo ""
    echo "To kill the process:"
    echo "  Find the PID from above and run: taskkill //PID <PID_NUMBER> //F"
    echo ""
    echo "Or start on a different port: npm run dev -- -p 3001"
    exit 1
fi

echo "🚀 Starting Next.js development server..."
echo ""
echo "📍 Application will be available at:"
echo "   → http://localhost:3000"
echo ""
echo "✨ Features:"
echo "   • Hot reload enabled"
echo "   • TypeScript type checking"
echo "   • Tailwind CSS compilation"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm run dev
```

**After the server starts:**
- Open http://localhost:3000 in your browser
- Changes to code will hot-reload automatically
- Check the terminal for compilation status and errors
- Press Ctrl+C to stop the server when done

**Note:** This command runs in the foreground. The server will continue running until you stop it manually.
