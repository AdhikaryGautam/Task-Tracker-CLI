const { updateTaskById, deleteTaskById } = require("./services");
const { getFileData, saveFileData } = require("./utils");

const VALID_STATUSES = ["todo", "in-progress", "done"];

const commandHandlers = {
  add: () => {
    const tasks = getFileData();
    const newTask = {
      id: (tasks[0]?.id || 0) + 1,
      description: process.argv[3],
      status: "todo",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks.unshift(newTask);
    saveFileData(tasks);
    return `Task added successfully (ID): ${newTask.id}`;
  },

  update: () => {
    const task = updateTaskById(parseInt(process.argv[3]), {
      description: process.argv[4],
    });
    if (!task) throw new Error("Task not found!");
    return `Task updated successfully: ${JSON.stringify(task)}`;
  },

  delete: () => {
    const id = parseInt(process.argv[3]);
    const deleted = deleteTaskById(id);
    if (!deleted) throw new Error("Task not found!");
    return `Task deleted successfully (ID): ${id}`;
  },

  list: () => {
    const tasks = getFileData();
    const status = process.argv[3];

    if (status && !VALID_STATUSES.includes(status)) {
      throw new Error("Invalid status!");
    }

    const filteredTasks = tasks.filter(
      (task) => !status || task.status === status
    );
    if (!filteredTasks.length) return "No tasks found!";

    return filteredTasks
      .map(
        (task) =>
          `ID: ${task.id} - Description: ${task.description} - Status: ${task.status}`
      )
      .join("\n");
  },

  "mark-in-progress": () => {
    const task = updateTaskById(parseInt(process.argv[3]), {
      status: "in-progress",
    });
    if (!task) throw new Error("Task not found!");
    return `Task marked as in-progress successfully (ID): ${process.argv[3]}`;
  },

  "mark-done": () => {
    const task = updateTaskById(parseInt(process.argv[3]), { status: "done" });
    if (!task) throw new Error("Task not found!");
    return `Task marked as done successfully (ID): ${process.argv[3]}`;
  },

  "--help": () => `Commands:
    add <description> - Add a new task
    update <id> <description> - Update a task by ID
    delete <id> - Delete a task by ID
    list - List all tasks
    list <status> - List all tasks by status
    mark-in-progress <id> - Mark a task as in-progress
    mark-done <id> - Mark a task as done`,
};

try {
  const command = process.argv[2];
  const handler = commandHandlers[command];

  if (!handler) {
    throw new Error("Invalid command!");
  }

  console.log(handler());
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
