import "./App.css";
import HomePage from "./state-management/HomePage";
import NavBar from "./state-management/NavBar";
import AuthProvider from "./state-management/AuthProvider";
import { TasksProvider } from "./state-management/tasks";

function App() {
  return (
    <>
      <AuthProvider>
        <TasksProvider>
          {/* <TodoForm />
      <TodoList /> */}
          {/* <PostList /> */}
          {/* <Counter /> */}
          {/* <TaskList /> */}
          {/* <LoginStatus /> */}
          <NavBar />
          <HomePage />
        </TasksProvider>
      </AuthProvider>
    </>
  );
}

export default App;
