import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CATCH_KEY_TODOS } from "../constants";
import todoService, { Todo } from "../services/todoService";


interface AddTodoContext {
    previousTodos: Todo[];
  }

const useAddTodo = (onAdd:()=>void) => {
    const queryClient = useQueryClient();
    return useMutation<Todo, Error, Todo, AddTodoContext>({
      mutationFn: todoService.post,
  
      onMutate: (newTodo) => {
        const previousTodos = queryClient.getQueryData<Todo[]>(CATCH_KEY_TODOS) || [];
  
        queryClient.setQueriesData<Todo[]>(CATCH_KEY_TODOS, (todos=[]) => [
          newTodo,
          ...todos,
        ]);

onAdd()
  
        return { previousTodos };
      },
  
      onSuccess: (savedTodo, newTodo) => {
        queryClient.setQueryData<Todo[]>(CATCH_KEY_TODOS, (todos) =>
          todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
        );
        //APPROACH : invalidating the catch
        // queryClient.invalidateQueries({
        //   queryKey: CATCH_KEY_TODOS,
        // });
  
        //APPROACH2 : updating the data in the catch
        // queryClient.setQueriesData<Todo[]>(CATCH_KEY_TODOS, (todos) => [
        //   savedTodo,
        //   ...(todos || []),
        // ]);
        // if (ref.current) ref.current.value = "";
      },
  
      onError: (error, newTodo, context) => {
        if (!context) return;
  
        queryClient.setQueryData<Todo[]>(CATCH_KEY_TODOS, context.previousTodos);
      },
    });
}

export default useAddTodo