# Task Manager CLI

A simple **CLI** task management application built with Node.js that helps you organize and track your tasks in a simple file-based storage system.

## Features

- **Add Tasks**: Create new tasks with a description.
- **Update Tasks**: Modify task descriptions by ID.
- **Delete Tasks**: Remove tasks by ID.
- **List Tasks**: View all tasks or filter tasks by status.
- **Change Task Status**: Update a task's status to `in-progress` or `done`.

---

## Installation

1. Clone the repository

   ```bash
   git clone <repository_url>
   cd <repository_name>
2. Install Dependencies

   ```bash
   yarn install
3. Help

   ```bash
   node main.js --help

## Usage
   ```bash
   add <description>         - Add a new task
   update <id> <description> - Update a task by ID
   delete <id>               - Delete a task by ID
   list                      - List all tasks
   list <status>             - List tasks by status (`todo`, `in-progress`, `done`)
   mark-in-progress <id>     - Mark a task as in-progress
   mark-done <id>            - Mark a task as done
   ```

## Example Commands
1. Add a Task

   ```bash
   node main.js add "Finish project report"
2. List All Tasks

   ```bash
   node main.js list
