# Create GitHub Repository from Local Project

Turn your local directory into a GitHub repository.

## Instructions

1. Check if the current directory is already a git repository
2. If not, initialize git with `git init`
3. Ask the user for repository details:
   - Repository name (default: current directory name)
   - Description
   - Visibility (public or private)
4. Create the GitHub repository using `gh repo create`
5. Add all files and create initial commit
6. Push to GitHub

## Example Workflow

```bash
# Check if git repo exists
git status

# If not a git repo, initialize
git init

# Create GitHub repo (interactive)
gh repo create

# Or create with flags
gh repo create my-course-site --public --description "Course selling platform" --source=. --remote=origin --push

# Add and commit files
git add .
git commit -m "Initial commit"

# Push to GitHub
git push -u origin main
```

## Options

- `--public` - Make repository public
- `--private` - Make repository private (default)
- `--source=.` - Use current directory as source
- `--remote=origin` - Set up remote named 'origin'
- `--push` - Push local commits to the new repo

## Verification

After creation:
- Confirm repository was created on GitHub
- Show repository URL
- Confirm branch is pushed
