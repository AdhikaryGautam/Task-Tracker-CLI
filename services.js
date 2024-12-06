const { saveFileData, getFileData } = require("./utils");

const getTaskById = (id) => {
  const tasks = getFileData();
  return tasks.find((task) => task.id === id);
};

const updateTaskById = (id, task) => {
  try {
    const tasks = getFileData();
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) return null;

    const newTask = {
      ...tasks[taskIndex],
      ...task,
      updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = newTask;
    saveFileData(tasks);

    return newTask;
  } catch (error) {
    throw new Error(`Failed to update task ${id}: ${error.message}`);
  }
};

const deleteTaskById = (id) => {
  try {
    const tasks = getFileData();

    const initialLength = tasks.length;
    const newTasks = tasks.filter((task) => task.id !== id);
    if (initialLength === newTasks.length) return null;

    saveFileData(newTasks);

    return true;
  } catch (error) {
    throw new Error(`Failed to delete task ${id}: ${error.message}`);
  }
};

module.exports = { getTaskById, updateTaskById, deleteTaskById };
