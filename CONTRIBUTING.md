## General Workflow

1. Fork the repo.
2. Clone the forked repo to local computer: `git clone https://github.com/<user_name>/clurtch.git`
3. Create an upstream remote to clurtch.io: `git remote add upstream https://github.com/clurtchio/clurtch.git`
4. Create a local branch for the current feature: `git checkout -b <feat>`
5. Make commits to your local master branch: `git commit`
5. Pull from upstream master using rebase and resolve conflicts before pushing to your fork origin: `git pull --rebase upstream <feat OR master>`
6. Push to your fork's feature branch: `git push origin <feat>`
7. Create Pull request to clurch.io <feat> branch.
8. Project admins will review pull requests and merge or leave comments for resubmitting.
9. Once a feature or sprint is done issue a pull request to master to merge the branch.

## Details 

### Fork the repo

Use github’s interface to make a fork of the project repo. Clone your forked repo to your local computer:
```
git clone https://github.com/<USER_NAME>/clurtch.git
```

Once complete navigate into the cloned folder and add the project repo as an upstream remote:
```
cd clurtch
git remote add upstream https://github.com/clurtchio/clurtch.git
```

### Commit Message Guidelines

- The first line of your commit message should be a brief summary of what the
  commit changes. Aim for about 70 characters max. Remember: This is a summary,
  not a detailed description of everything that changed.
- If you want to explain the commit in more depth, following the first line should
  be a blank line and then a more detailed description of the commit. This can be
  as detailed as you want, so dig into details here and keep the first line short.

### Rebase upstream changes into your branch

Once you are done making changes, you can begin the process of getting
your code merged into the main repo. Step 1 is to rebase upstream
changes to the master branch into yours by running this command
from your branch:

```
git pull --rebase upstream master
```

This will start the rebase process. You must commit all of your changes
before doing this. If there are no conflicts, this should just roll all
of your changes back on top of the changes from upstream, leading to a clean, linear commit history.

If there are conflicting changes, git will notify you and pause rebasing to allow you to sort
out the merge conflicts. Check all files that have been modified in both histories
and pick the versions you want. Be aware that these changes will show
up in your pull request, so try and incorporate upstream changes as much
as possible.

Once you are done fixing conflicts for a specific commit, run:
```
git rebase --continue
```

This will continue the rebasing process. 

If rebasing broke anything, fix it, then repeat the above process until
you get here again and nothing is broken and all the tests pass.

### Make a pull request

Make a clear pull request from your fork and branch to the upstream master
branch, detailing exactly what changes you made and what feature this
should add. The clearer your pull request is the faster you can get
your changes incorporated into this repo.

At least one other person MUST give your changes a code review, and once
they are satisfied they will merge your changes into upstream. Alternatively,
they may have some requested changes. You should make more commits to your
branch to fix these, then follow this process again from rebasing onwards.

Once you get back here, make a comment requesting further review and
someone will look at your code again. If they like it, it will get merged,
else, just repeat again.
