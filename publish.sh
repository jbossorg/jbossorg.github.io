#!/bin/sh

if [ "`git status -s`" ]
then
    echo "Working directory has pending changes. Commit and try again."
    exit 1;
fi

echo "Deleting previous publish"
rm -rf gh-pages
mkdir gh-pages
git worktree prune
rm -rf .git/worktrees/gh-pages/

echo "Checking out gh-pages branch into public"
git worktree add -B master gh-pages upstream/master

echo "Removing existing files"
rm -rf gh-pages/*

echo "Generating site"
npm start

echo "Updating gh-pages branch"
cd gh-pages && git add --all && git commit -m "Publishing to master (publish.sh)"

echo "Pushing to github"
git push --all