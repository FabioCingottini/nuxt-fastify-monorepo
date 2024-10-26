export type UnsavedTask = {
  title: string;
  description: string;
}

export type SavedTask = {
  id: string;
  title: UnsavedTask['title'];
  description: UnsavedTask['description'];
  createdAt: string;
}
