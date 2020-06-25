# JBoss.org Site

## Two Ways To Add A Post

1. Use the Github.com interface
    1. Go to https://github.com/jbossorg/jbossorg.github.io/tree/src/src/content/posts
    2. Add file >> "Create new file" OR "Upload files"
    3. File name should be in the format `weekly-yyyy-mm-dd.adoc`
2. Use the `src` git branch
    1. Run `git clone --single-branch --branch src https://github.com/jbossorg/jbossorg.github.io.git jbossorg`
    2. Add a file named in the format of `weekly-yyyy-mm-dd.adoc` to `jbossorg/src/content/posts`

## New Post Content and Publishing

1. Front Matter (first four lines of the post file) should be:
    1. `= JBoss Weekly Editorial 14 May 2020` (or a relatively unique title that isn't just "JBoss Weekly Editorial")
    2. `Firstname Surname`
    3. `YYYY-MM-DD`
    4. `:tags: any, tags, you-want, comma-separated`
2. Commit and Push the changes or create a Pull Request to the `src` branch

## Notes

* A Pull Request to the `src` branch will publish to the staging site
* If you want to embed any images into the site, place them in `src/img/`
* Profile images for authors are found under `src/img/people` if you don't like the default just update yours
