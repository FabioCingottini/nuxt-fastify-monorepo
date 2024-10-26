import {Db} from "./db";
import type {SavedTask, UnsavedTask} from "./types";

export class TasksFacade {
  private db: Db;

  constructor() {
    this.db = Db.connect();
  }

  /**
   * Return the list of tasks.
   */
  public getTasks() {
    return this.db.getTasks();
  }

  /**
   * Given an id, return the task with the given id.
   * If the task with the given id does not exist, return false.
   *
   * @param id - A string
   *
   * @returns task - A SavedTask object
   */
  public getTask(id: SavedTask['id']) {
    return this.db.getTask(id);
  }

  /**
   * Given a task, create a new task and return the new task.
   *
   * @param task - An UnsavedTask object
   *
   * @returns newTask - A SavedTask object
   */
  public createTask(task: UnsavedTask) {
    return this.db.createTask(task);
  }

  /**
   * Given an id and a task, update the task with the given id and return the updated task.
   *
   * @param id - A string
   * @param task - An UnsavedTask object
   *
   * @returns updatedTask - A SavedTask object
   */
  public updateTask(id: SavedTask['id'], task: Partial<UnsavedTask>) {
    return this.db.updateTask(id, task);
  }

  /**
   * Given an id, delete the task with the given id and return the deleted task.
   *
   * @param id - A string
   *
   * @returns deletedTask - A SavedTask object
   */
  public deleteTask(id: SavedTask['id']) {
    return this.db.deleteTask(id);
  }
}
