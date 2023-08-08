import { useReducer } from "react";
import "./App.css";
import PostList from "./react-query/PostList";
import TodoForm from "./react-query/TodoForm";
import TodoList from "./react-query/TodoList";
import Counter from "./state-management/Counter";
import HomePage from "./state-management/HomePage";
import LoginStatus from "./state-management/LoginStatus";
import NavBar from "./state-management/NavBar";
import TaskList from "./state-management/TaskList";
import TasksContext from "./state-management/contexts/tasksContext";
import tasksReducer from "./state-management/reducers/tasksReducer";

function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  return (
    <>
      <TasksContext.Provider value={{ tasks, dispatch }}>
        {/* <TodoForm />
      <TodoList /> */}
        {/* <PostList /> */}
        {/* <Counter /> */}
        {/* <TaskList /> */}
        {/* <LoginStatus /> */}
        <NavBar />
        <HomePage />
      </TasksContext.Provider>
    </>
  );
}

export default App;
