# NMSU-Tutoring: A tutor scheduling service for our Senior Project
<a href="https://lucid.app/lucidchart/561b8934-867a-4234-bc64-1ea8db1dfbee/edit?invitationId=inv_b826c81d-24cd-4db4-a4e3-fd3cead760e1&page=uDe-dIt-NWfS#">GANTT Chart</a>

## To run program:
1. gatsby build (make sure there are no errors)
2. node server.js (message "Tutoring Dashboard is up" should display in terminal)

## Demo:


https://user-images.githubusercontent.com/77985155/197588927-94d92dd0-dd26-4616-9f82-3192f690fcda.mp4


## Best practices for github:
1. Every time you set out to make a new feature, create your own branch locally and push that branch to remote so that you have a private space to work in. DO NOT use a pre-existing branch, even if it was your private branch. We will be using branches as "save points" we can go back to, so pushing to a pre-existing branch has potential to delete work if that branch ever corrupts. This is also why we will never push directly to main. I will be putting a lock on the github to prevent pushing directly to main and all merge requests will need to be reviewed and authorized by someone else before merging.

2. When creating branches checkout the main branch locally first (git checkout main), do "git pull origin main" to update main, then 'git checkout -b new-branch-name'

3. BEFORE PUSHING, do "git pull" to update your branch (pulling any changes made in the remote's main branch), then push. This avoids merge conflicts on the remote. If you get a local merge conflict, that's okay, it is better to resolve merge conflicts locally than remotely. Here is a guide on how to resolve merge conflicts: <a href="https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line#further-reading">Resolving Merge Conflicts</a>

4. Make sure to have descriptive commit messages. This is so we can track when certain changes were made and backtrack if needed. For convenience we will be using semantic commit messages. What this means is that each message will be appended with either "feat:", "fix:", or "chore:" (as our main 3) to describe the type of changes you're committing. If you're wondering why, it decreases message length while still signalling significant changes and its standard practice for git management in the professional world. Here's the guide for that: <a href ="https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716">Semantic messages guide</a>. We'll mostly just be using the basic ones though since they cover most issues we will ever have.
  - Rundown:
    - feat: (new feature for the user, not a new feature for build script)
    - fix: (bug fix for the user, not a fix to a build script)
    - chore: (updating grunt tasks etc; no production code change)

5. Always commit and push your changes to remote before you quit your development session. This does not mean make a merge request. Unless you are dealing with an error and don't want to corrupt your most recent working version on the remote, just push your changes. You can create a merge request whenever you feel you've completed a new feature or a major part of that new feature.

6. NEVER MERGE INTO MAIN IF YOUR CODE HAS ERRORS. Always resolve errors before merging into main. Ideally you will resolve errors before pushing to your personal remote branch too.

7. In case we need it here is a guide to git rebasing and git merging: <a href="https://www.freecodecamp.org/news/the-ultimate-guide-to-git-merge-and-git-rebase/"> Rebase and Merging</a>
