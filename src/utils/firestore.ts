import { todoRef } from "../config/firebase";
import { TTodo } from "../types";

export const getTodos = () =>
  new Promise<TTodo[]>((resolve) => {
    console.log("Fetching todos from firestore...");
    todoRef.get().then((resp) => {
      resolve(
        resp.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              id: doc.id,
              dueDate: doc.data().dueDate ? new Date(doc.data().dueDate) : null,
            } as TTodo)
        )
      );
    });
  });

export const addTodo = (todo: TTodo) =>
  new Promise<string>((resolve) => {
    console.log("Adding todo to firestore...");
    todoRef
      .add({ ...todo, dueDate: todo.dueDate ? todo.dueDate?.toString() : "" })
      .then((resp) => {
        resolve(resp.id);
      });
  });

export const updateTodo = (todo: TTodo) =>
  new Promise<boolean>((resolve, reject) => {
    console.log("Updating todo in firestore...");
    todoRef
      .doc(todo.id)
      .update({ ...todo, dueDate: todo.dueDate?.toString() })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });

export const deleteTodo = (id: string) =>
  new Promise<boolean>((resolve, reject) => {
    console.log("Deleting todo in firestore...");
    todoRef
      .doc(id)
      .delete()
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
