#!/usr/bin/env bash
set -euo pipefail

# Usage: ./scripts/create_repo_and_pr.sh <github-org-or-user> <repo-name> <branch-name>
# Requires: `gh` CLI authenticated and `git` configured.

OWNER=${1:-$(gh api user --jq .login)}
REPO=${2:-sb-himalayan-hands-spa}
BRANCH=${3:-spa-sb}

echo "Creating repo $OWNER/$REPO (public) and pushing branch $BRANCH"

# create repo (public)
gh repo create "$OWNER/$REPO" --public --confirm || true

# ensure we're on current branch
git add -A
git commit -m "chore: prepare repo for initial push" || true

# create and switch to target branch
git checkout -B "$BRANCH"

# push branch
git push -u origin "$BRANCH"

# create pull request from branch to default branch (main)
PR_URL=$(gh pr create --title "feat: initial import" --body "Initial import of sb-himalayan-hands-spa" --base main --head "$BRANCH" --repo "$OWNER/$REPO" --web || true)

if [ -n "$PR_URL" ]; then
  echo "Pull request created: $PR_URL"
else
  echo "PR created or opened in web browser. Use 'gh pr list' to inspect." 
fi
