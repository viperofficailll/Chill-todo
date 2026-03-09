import { useNavigate } from "react-router-dom";
import { Edit, Trash2, CheckCircle, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  useGetAllTodosQuery,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "@/redux/features/tasks.api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();

  // Fetch todos from API
  const { data: todosData, isLoading, isError } = useGetAllTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id).unwrap();
      toast.success("Todo deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete todo");
    }
  };

  const handleToggleComplete = async (
    id: number,
    currentStatus: boolean,
    title: string,
  ) => {
    try {
      await updateTodo({
        id,
        data: { completed: !currentStatus, title },
      }).unwrap();
      toast.success("Todo status updated!");
    } catch (error) {
      toast.error("Failed to update todo");
    }
  };

  const handleEditTodo = (id: number) => {
    navigate(`/update-todo/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading todos...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">
          Failed to load todos. Please try again.
        </div>
      </div>
    );
  }

  const todos = todosData?.data || [];

  return (
    <div className="mx-auto mt-10 max-w-6xl space-y-8 p-4">
      <div className="flex items-center justify-between">
       
      </div>

      {todos.length === 0 ? (
        <Card className="p-8">
          <div className="text-center text-gray-500">
            <p className="text-lg mb-4">No todos yet. Start by adding one!</p>
            <Button onClick={() => navigate("/add-todo")}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Todo
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {todos.map((todo) => (
            <Card
              key={todo.id}
              className={`transition hover:shadow-lg ${
                todo.completed ? "bg-green-50/50" : ""
              }`}
            >
              <CardHeader>
                <CardTitle
                  className={`text-lg ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.title}
                </CardTitle>
                {todo.description && (
                  <CardDescription className="mt-2">
                    {todo.description}
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      todo.completed
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {todo.completed ? "Completed" : "Pending"}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    handleToggleComplete(todo.id, todo.completed, todo.title)
                  }
                  title={
                    todo.completed ? "Mark as incomplete" : "Mark as complete"
                  }
                >
                  <CheckCircle
                    className={`h-5 w-5 ${
                      todo.completed
                        ? "text-green-600"
                        : "text-gray-400 hover:text-green-500"
                    }`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditTodo(todo.id)}
                  title="Edit todo"
                >
                  <Edit className="h-5 w-5 text-blue-600 hover:text-blue-700" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteTodo(todo.id)}
                  title="Delete todo"
                >
                  <Trash2 className="h-5 w-5 text-red-600 hover:text-red-700" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
