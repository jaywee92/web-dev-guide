import type { ReferenceCategory } from '@/types'

export const GIT_REFERENCE: ReferenceCategory[] = [
  {
    id: 'basics',
    title: 'Basics',
    color: '#f97316',
    entries: [
      {
        name: 'git init / clone',
        description: 'git init creates a new repository in the current directory. git clone copies an existing repository from a URL.',
        example: '# Create a new repo:\ngit init\ngit init my-project    # creates my-project/ folder\n\n# Clone from GitHub:\ngit clone https://github.com/user/repo.git\ngit clone https://github.com/user/repo.git my-folder\n\n# Clone only latest commit (shallow — faster):\ngit clone --depth 1 https://github.com/user/repo.git\n\n# Clone specific branch:\ngit clone -b develop https://github.com/user/repo.git',
        link: 'https://git-scm.com/docs/git-init',
      },
      {
        name: 'git add / status',
        description: 'git add stages changes for the next commit. git status shows working tree state — modified, staged, and untracked files.',
        example: '# Check current state:\ngit status\ngit status -s     # short format\n\n# Stage specific file:\ngit add src/index.ts\n\n# Stage all changes in current directory:\ngit add .\n\n# Stage parts of a file interactively:\ngit add -p        # patch mode — choose hunks\n\n# Unstage:\ngit restore --staged src/index.ts',
        link: 'https://git-scm.com/docs/git-add',
      },
      {
        name: 'git commit',
        description: 'Records staged changes as a new commit in the repository history. Good commit messages explain WHY, not just WHAT.',
        example: '# Commit with message:\ngit commit -m "feat: add user authentication"\n\n# Stage tracked files + commit in one step:\ngit commit -am "fix: correct email validation"\n\n# Open editor for longer message:\ngit commit\n\n# Conventional commits format:\n# feat: new feature\n# fix: bug fix\n# docs: documentation\n# refactor: code change (no feature/fix)\n# test: adding tests\n# chore: build/tooling changes',
        link: 'https://git-scm.com/docs/git-commit',
      },
      {
        name: 'git commit --amend',
        description: 'Modifies the most recent commit — change the message, add forgotten files, or fix a typo. Only use on local commits that have not been pushed to a shared branch.',
        example: '# Change the last commit message:\ngit commit --amend -m "feat: add login form with validation"\n\n# Add a forgotten file to the last commit:\ngit add src/forgot.ts\ngit commit --amend --no-edit   # keep existing message\n\n# Open editor to edit message:\ngit commit --amend\n\n# WARNING: amend rewrites history.\n# Never amend commits already pushed to a shared branch.',
        link: 'https://git-scm.com/docs/git-commit#Documentation/git-commit.txt---amend',
      },
      {
        name: 'git blame',
        description: 'Shows who last modified each line of a file and in which commit. Essential for understanding when and why a change was made.',
        example: '# Show blame for a file:\ngit blame src/App.tsx\n\n# Output format: commit | author | date | line content\n# ^abc1234 (Alice 2024-01-15 09:30) import React from "react"\n\n# Blame specific line range:\ngit blame -L 20,40 src/App.tsx\n\n# Ignore whitespace changes:\ngit blame -w src/App.tsx\n\n# Follow renames:\ngit blame --follow src/App.tsx\n\n# Show full commit hash:\ngit blame --abbrev=40 src/App.tsx',
        link: 'https://git-scm.com/docs/git-blame',
      },
      {
        name: 'git log',
        description: 'Shows the commit history. Many formatting and filtering options available.',
        example: '# Default log:\ngit log\n\n# Compact one-line per commit:\ngit log --oneline\n\n# With graph (branches/merges):\ngit log --oneline --graph --all\n\n# Last 5 commits:\ngit log -5\n\n# Commits by author:\ngit log --author="Alice"\n\n# Commits since date:\ngit log --since="2024-01-01"\n\n# Commits affecting a file:\ngit log --follow src/components/Button.tsx',
        link: 'https://git-scm.com/docs/git-log',
      },
      {
        name: 'git diff',
        description: 'Shows changes between commits, working tree, and staging area.',
        example: '# Unstaged changes (working tree vs staging):\ngit diff\n\n# Staged changes (staging vs last commit):\ngit diff --staged\ngit diff --cached    # same thing\n\n# Between two commits:\ngit diff abc123 def456\n\n# Between branches:\ngit diff main develop\n\n# Single file:\ngit diff HEAD~1 src/App.tsx\n\n# Stats only (what changed):\ngit diff --stat',
        link: 'https://git-scm.com/docs/git-diff',
      },
    ],
  },
  {
    id: 'branching',
    title: 'Branching',
    color: '#4ade80',
    entries: [
      {
        name: 'git branch',
        description: 'Lists, creates, renames, and deletes branches. A branch is just a pointer to a commit.',
        example: '# List local branches:\ngit branch\n\n# List all branches (including remote):\ngit branch -a\n\n# Create branch:\ngit branch feature/login\n\n# Create and switch in one step:\ngit switch -c feature/login\ngit checkout -b feature/login  # old syntax\n\n# Rename current branch:\ngit branch -m new-name\n\n# Delete branch (merged):\ngit branch -d feature/login\n\n# Delete branch (force — not merged):\ngit branch -D feature/login',
        link: 'https://git-scm.com/docs/git-branch',
      },
      {
        name: 'git switch / checkout',
        description: 'git switch is the modern command for changing branches. git checkout still works and can also checkout specific files.',
        example: '# Switch to existing branch:\ngit switch main\ngit checkout main  # old syntax\n\n# Create and switch:\ngit switch -c feature/new-ui\n\n# Discard changes in a file (restore to HEAD):\ngit restore src/file.ts\ngit checkout -- src/file.ts  # old syntax\n\n# Go to detached HEAD state (view old commit):\ngit checkout abc1234\ngit switch -d abc1234  # modern',
        link: 'https://git-scm.com/docs/git-switch',
      },
      {
        name: 'git merge',
        description: 'Integrates changes from one branch into another. Creates a merge commit if there are divergent histories.',
        example: '# Merge feature branch into main:\ngit switch main\ngit merge feature/login\n\n# Fast-forward only (no merge commit if possible):\ngit merge --ff-only feature/login\n\n# No fast-forward (always create merge commit):\ngit merge --no-ff feature/login\n\n# Abort a conflicted merge:\ngit merge --abort\n\n# After resolving conflicts:\ngit add .\ngit commit  # complete the merge',
        link: 'https://git-scm.com/docs/git-merge',
      },
      {
        name: 'git rebase',
        description: 'Moves or replays commits on top of another branch. Creates a linear history, but rewrites commits — avoid on shared branches.',
        example: '# Rebase current branch onto main:\ngit switch feature/login\ngit rebase main\n\n# Interactive rebase (last 3 commits):\ngit rebase -i HEAD~3\n# In editor:\n# pick abc123 first commit\n# squash def456 typo fix  ← squash into previous\n# reword ghi789 change message\n\n# Abort rebase:\ngit rebase --abort\n\n# Continue after resolving conflict:\ngit rebase --continue',
        link: 'https://git-scm.com/docs/git-rebase',
      },
    ],
  },
  {
    id: 'remote',
    title: 'Remote Repositories',
    color: '#5b9cf5',
    entries: [
      {
        name: 'git remote',
        description: 'Manages connections to remote repositories. origin is the conventional name for the primary remote.',
        example: '# View remotes:\ngit remote -v\n\n# Add remote:\ngit remote add origin https://github.com/user/repo.git\n\n# Change remote URL:\ngit remote set-url origin https://github.com/user/new-repo.git\n\n# Remove remote:\ngit remote remove upstream\n\n# Add upstream (for forks):\ngit remote add upstream https://github.com/original/repo.git',
        link: 'https://git-scm.com/docs/git-remote',
      },
      {
        name: 'git fetch / pull',
        description: 'fetch downloads changes without applying them. pull = fetch + merge. Use fetch when you want to inspect changes first.',
        example: '# Fetch all remotes (don\'t apply changes):\ngit fetch\ngit fetch origin\ngit fetch --all\n\n# Inspect what was fetched:\ngit log origin/main..HEAD   # commits not yet in remote\ngit diff origin/main        # see changes\n\n# Pull (fetch + merge):\ngit pull\ngit pull origin main\n\n# Pull with rebase (linear history):\ngit pull --rebase\ngit config pull.rebase true  # make default',
        link: 'https://git-scm.com/docs/git-fetch',
      },
      {
        name: 'git push',
        description: 'Uploads local commits to a remote repository. Use -u to set the upstream tracking branch.',
        example: '# First push (set upstream):\ngit push -u origin main\ngit push -u origin feature/login\n\n# Subsequent pushes:\ngit push\n\n# Push all branches:\ngit push --all\n\n# Push tags:\ngit push --tags\n\n# Delete remote branch:\ngit push origin --delete feature/old-branch\n\n# Force push (after rebase — dangerous on shared branches):\ngit push --force-with-lease  # safer than --force',
        link: 'https://git-scm.com/docs/git-push',
      },
    ],
  },
  {
    id: 'undoing',
    title: 'Undoing Changes',
    color: '#f59e0b',
    entries: [
      {
        name: 'git restore',
        description: 'Discards changes in the working tree or unstages files. The modern replacement for git checkout -- and git reset HEAD.',
        example: '# Discard working tree changes (unstaged):\ngit restore src/file.ts\ngit restore .               # all files\n\n# Unstage a file:\ngit restore --staged src/file.ts\n\n# Restore file to a specific commit:\ngit restore --source=HEAD~2 src/file.ts\n\n# Unstage everything:\ngit restore --staged .',
        link: 'https://git-scm.com/docs/git-restore',
      },
      {
        name: 'git reset',
        description: 'Moves the branch pointer and optionally changes the working tree. --soft keeps changes staged; --mixed unstages; --hard discards everything.',
        example: '# Undo last commit, keep changes staged:\ngit reset --soft HEAD~1\n\n# Undo last commit, unstage changes (default):\ngit reset HEAD~1\ngit reset --mixed HEAD~1\n\n# Undo last commit, DISCARD changes (dangerous!):\ngit reset --hard HEAD~1\n\n# Reset to a specific commit:\ngit reset --hard abc1234\n\n# Undo reset (find lost commit):\ngit reflog     # shows all recent HEADs\ngit reset --hard HEAD@{2}',
        link: 'https://git-scm.com/docs/git-reset',
      },
      {
        name: 'git revert',
        description: 'Creates a new commit that undoes a previous commit. Safe for shared branches — does not rewrite history.',
        example: '# Revert the last commit:\ngit revert HEAD\n\n# Revert a specific commit:\ngit revert abc1234\n\n# Revert without auto-committing (stage the reversal):\ngit revert --no-commit abc1234\ngit revert --no-commit HEAD~3..HEAD  # revert range\ngit commit -m "revert: undo release prep"\n\n# Difference from reset:\n# reset   — rewrites history (unsafe for shared branches)\n# revert  — adds new commit  (safe for shared branches)',
        link: 'https://git-scm.com/docs/git-revert',
      },
      {
        name: 'git stash',
        description: 'Temporarily saves uncommitted changes so you can switch branches. Returns them later with git stash pop.',
        example: '# Save changes with a message:\ngit stash push -m "WIP: login form"\n\n# List stashes:\ngit stash list\n# stash@{0}: WIP on main: abc123 login form\n\n# Apply and remove top stash:\ngit stash pop\n\n# Apply without removing:\ngit stash apply stash@{1}\n\n# Create branch from stash:\ngit stash branch feature/new-work stash@{0}\n\n# Drop a stash:\ngit stash drop stash@{0}\ngit stash clear  # drop all',
        link: 'https://git-scm.com/docs/git-stash',
      },
    ],
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    color: '#a78bfa',
    entries: [
      {
        name: 'git tag',
        description: 'Marks specific commits — usually release versions. Annotated tags have a message and are preferred for releases.',
        example: '# List tags:\ngit tag\ngit tag -l "v1.*"  # filter\n\n# Create annotated tag:\ngit tag -a v1.2.0 -m "Release 1.2.0"\n\n# Tag a specific commit:\ngit tag -a v1.0.0 abc1234 -m "Initial release"\n\n# Push tags to remote:\ngit push origin v1.2.0\ngit push origin --tags    # push all\n\n# Delete tag:\ngit tag -d v1.2.0\ngit push origin --delete v1.2.0',
        link: 'https://git-scm.com/docs/git-tag',
      },
      {
        name: '.gitignore',
        description: 'Specifies intentionally untracked files. Patterns are matched against paths relative to the .gitignore location.',
        example: '# .gitignore\n\n# Dependencies:\nnode_modules/\n.pnp/\n\n# Build output:\ndist/\nbuild/\n.next/\n\n# Environment files:\n.env\n.env.local\n.env.*.local\n\n# Editor:\n.idea/\n.vscode/\n*.swp\n\n# OS:\n.DS_Store\nThumbs.db\n\n# Test coverage:\ncoverage/\n\n# Untrack already-tracked file:\ngit rm --cached .env',
        link: 'https://git-scm.com/docs/gitignore',
      },
      {
        name: 'git bisect',
        description: 'Binary search through commit history to find which commit introduced a bug. Git checks out commits for you to test until it narrows down the culprit.',
        example: '# Start bisect:\ngit bisect start\n\n# Mark current commit as bad (bug exists):\ngit bisect bad\n\n# Mark a known-good commit:\ngit bisect good v1.0.0\ngit bisect good abc1234\n\n# Git checks out a commit halfway between — test it:\n# If bug exists:\ngit bisect bad\n# If no bug:\ngit bisect good\n\n# Repeat until Git reports:\n# "abc1234 is the first bad commit"\n\n# Automate with a test script:\ngit bisect run npm test\n\n# Done — restore working tree:\ngit bisect reset',
        link: 'https://git-scm.com/docs/git-bisect',
      },
      {
        name: 'git cherry-pick',
        description: 'Applies the changes from a specific commit onto the current branch. Useful for backporting fixes.',
        example: '# Apply a single commit to current branch:\ngit cherry-pick abc1234\n\n# Apply multiple commits:\ngit cherry-pick abc1234 def5678\n\n# Apply a range of commits:\ngit cherry-pick abc1234^..def5678\n\n# Stage only (don\'t commit):\ngit cherry-pick --no-commit abc1234\n\n# Abort:\ngit cherry-pick --abort',
        link: 'https://git-scm.com/docs/git-cherry-pick',
      },
    ],
  },
]
