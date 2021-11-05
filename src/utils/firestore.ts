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
              dueDate: new Date(doc.data().dueDate),
            } as TTodo)
        )
      );
    });
  });

export const addTodo = (todo: TTodo) =>
  new Promise<string>((resolve) => {
    console.log("Adding todo to firestore...");
    todoRef.add({ ...todo, dueDate: todo.dueDate?.toString() }).then((resp) => {
      resolve(resp.id);
    });
  });
