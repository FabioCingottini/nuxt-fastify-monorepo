import type {SavedTask, UnsavedTask} from './types';
import {v4} from 'uuid';

export class Db {
  private static singleton: Db;

  private tasks: SavedTask[] = [];

  private constructor() {
  }

  /**
   * Connect to the database.
   * Implement the singleton pattern.
   */
  public static connect() {
    if (!Db.singleton) {
      Db.singleton = new Db();
    }
    return Db.singleton;
  }

  /**
   * Return the list of saved tasks.
   */
  public getTasks(): SavedTask[] {
    return this.tasks;
  }

  /**
   * Given an id, return the task with the given id.
   * If the task with the given id does not exist, return false.
   *
   * @param id - ID of the task to retrieve
   *
   * @returns task - false if the task with the given id does not exist, the task otherwise
   */
  public getTask(id: SavedTask['id']): false | SavedTask {
    return this.tasks.find((task) => task.id === id) || false;
  }

  /**
   * Given an UnsavedTask, create a new task and add it to the list of tasks, then return the new task.
   *
   * @param task - An UnsavedTask object
   *
   * @returns newTask - A SavedTask object
   */
  public createTask(task: UnsavedTask): SavedTask {
    const id = v4();
    const createdAt = new Date().toISOString();
    const newTask = {...task, id, createdAt};
    this.tasks.push(newTask);

    return newTask;
  }

  /**
   * Given an id and an UnsavedTask, update the task with the given id and return the updated task.
   * If the task with the given id does not exist, return false.
   *
   * @param id - ID of the task to update
   * @param task - An UnsavedTask object containing the updated task information
   *
   * @returns result - false if the task with the given id does not exist, the updated task otherwise
   */
  public updateTask(id: SavedTask['id'], task: Partial<UnsavedTask>): false | SavedTask {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return false;
    }

    const updatedTask = {...this.tasks[index], ...task};
    this.tasks[index] = updatedTask;

    return updatedTask;
  }

  /**
   * Given an id, delete the task with the given id and return true if the task was deleted, false otherwise.
   *
   * @param id - ID of the task to delete
   *
   * @returns result - true if the task was deleted, false otherwise
   *
   */
  public deleteTask(id: SavedTask['id']): boolean {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return false
    }

    this.tasks.splice(index, 1);
    return true;
  }
}
