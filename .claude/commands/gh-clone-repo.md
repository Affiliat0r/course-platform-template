# Clone GitHub Repository

Clone an existing GitHub repository to your local machine using the GitHub CLI.

## Instructions

1. Ask the user for the repository URL or owner/repo format (e.g., `username/repo-name`)
2. Verify the repository exists and is accessible
3. Ask where they want to clone it (default: current directory)
4. Clone the repository using `gh repo clone`
5. Confirm successful clone and show the cloned directory path

## Example

```bash
# Clone using owner/repo format
gh repo clone anthropics/claude-code

# Clone using full URL
gh repo clone https://github.com/anthropics/claude-code

# Clone to specific directory
gh repo clone anthropics/claude-code ./my-projects/claude-code
```

## After cloning

Optionally ask if they want to:
- Change into the cloned directory
- Install dependencies (if package.json exists)
- Open in editor
