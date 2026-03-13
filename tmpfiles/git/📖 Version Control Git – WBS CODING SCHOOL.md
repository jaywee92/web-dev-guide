## Origins of Git

Originally developed in 2005 by [Linus Torvalds](https://github.com/torvalds), the creator of the Linux operating system, Git was designed to handle large projects like Linux with speed and efficiency. After its creation, maintenance of Git was quickly handed over to [Junio Hamano](https://github.com/gitster), who continues to oversee its development.

## What is Git?

Git is a distributed version control system. This means that it allows multiple developers to work on the same project without necessarily being connected to a central server. Each developer has the full history of the project, making it robust against data loss.

In a distributed version control system (VCS), each developer has a copy of the entire project, changes are made locally and then, via a myriad of possible workflows, the code is ultimately merged in one or more remote versions. In a centralised one, there’s only one main copy of the project. Crucially, having a local copy enables offline work!

If you are interested in additional workflows that a distributed VCS like Git can enable, check this entry from their official website: [https://git-scm.com/book/en/v2/Distributed-Git-Distributed-Workflows](https://git-scm.com/book/en/v2/Distributed-Git-Distributed-Workflows)

## What can you do with Git (beginner-friendly)?

Git helps manage changes to a project without overwriting any part of that project. It allows for:

-   Keep your code base within a **repository**
-   Track changes made to files within the project
-   Isolate new features or fixes in new **branches**
-   Add marker to specific moments in which files change by adding a **commit**
-   **Merging** changes from one branch into another
-   **Merging** changes from different developers smoothly.
-   Keeping track of one or more **remote** repositories
-   **Pushing** changes to remotes
-   **Pulling** changes from remotes

## Key areas in a Git repo

-   **Working Directory**: This is your local directory on your computer where you make changes to your files.
-   **Staging Area**: Also known as the index, the staging area is where you add changes from the working directory before committing them to your project history.
-   **Local Repository**: The repository on your local machine where Git stores all the changes and history.
-   **Remote Repository**: Typically hosted on a server or platform like GitHub. This is where your code is stored publicly or shared with other team members.

![Untitled.png](%F0%9F%93%96%20Version%20Control%20Git%20%E2%80%93%20WBS%20CODING%20SCHOOL/.png)

## Basic Git Concepts (and commands)

-   **Repository**: A database of your project’s history, changes, and details.
-   **Clone**: Creating a local copy of a repository that exists remotely.
-   **Branch**: An independent line of development in your project. You can have multiple branches simultaneously.
-   **Staging**: Adding changes from your working directory to the staging area in preparation for committing.
-   **Committing**: Saving your staged changes to the local repository’s history.
-   **Merge**: Taking the changes from one branch and integrating them into another.
-   **Pull**: Fetching changes from a remote repository to your local machine and merging them.
-   **Push**: Sending your committed changes from your local repository to a remote repository.

## Simple Git Workflow

-   **Create or Clone a Repository**: Start a new project by creating a repository or cloning an existing one from a remote server.
    
    ```php
    # Clone from a remote
      git clone <remoteURL>
      # Or initialise a new one
      git init
    ```
    
-   **Branch**: Create a new branch if you plan to develop a new feature.
    
    ```makefile
    # Create a new branch
      git branch <name of branch>
      # Checkout a branch
      git checkout <name of branch>
      # Checkout branch or create it if it doesn't exist
      git checkout -b <name of branch>
    ```
    
-   **Stage Changes**: As you modify files, add these changes to the staging area.
    
    ```graphql
    # Add a single file to the staging area
      git add file1
      # Add more than one file to the staging area
      git add file1 file2
      # Add all files in the current directory to the staging area
      git add .
    ```
    
-   **Commit Changes**: Commit your staged changes to your local repository. Each commit is a snapshot of your project at a specific point in time.
    
    ```sql
    git commit -m "This message will be recorded as an annotation of this commit"
    ```
    
-   **Merge**: Regularly merge changes from other branches (e.g., the main branch) to keep your branch up-to-date and to ensure compatibility.
    
    ```sql
    # Merge changes from branch into current branch
      git merge <name of branch>
    ```
    
-   **Push Changes**: Once your changes are tested and finalized, push them from your local repository to the remote repository.
    
    ```kotlin
    # if you are wondering where your remote is... don't worry, that's where GitHub fits in this equation
      git push <name of remote> <name of target branch in remote>
    ```
    

## Conclusion

Git is a powerful tool that supports numerous workflows and can handle projects of any size with speed and efficiency. As you begin to use Git, you'll develop preferences for certain workflows based on your projects' needs. The simple workflow we discussed is just the beginning; as you grow more comfortable with Git, you will learn more advanced techniques and commands. ![🚀](%F0%9F%93%96%20Version%20Control%20Git%20%E2%80%93%20WBS%20CODING%20SCHOOL/1f680.svg)

Feel free to experiment and explore Git’s capabilities, and always remember that understanding how to effectively manage versions of your projects is a crucial skill in software development.![👨💻](%F0%9F%93%96%20Version%20Control%20Git%20%E2%80%93%20WBS%20CODING%20SCHOOL/1f468-200d-1f4bb.svg)