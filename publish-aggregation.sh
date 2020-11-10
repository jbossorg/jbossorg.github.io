#!/bin/sh

if [ -z "$(git status --porcelain)" ];
then
    echo "IT IS CLEAN. Nothing to commit"
    exit 0
fi

echo "Committing new posts"
cd src/content/posts-aggregator && git add --all && git commit -m "Published latest aggregated blog posts"

echo "Pushing to github"
git push --all
