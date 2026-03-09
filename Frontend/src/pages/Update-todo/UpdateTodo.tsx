import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  useGetTodoByIdQuery,
  useUpdateTodoMutation,
} from "@/redux/features/tasks.api";
import { Button } from "@/components/ui/button";

// Zod schema matching backend validation
const updateTodoSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

type UpdateTodoForm = z.infer<typeof updateTodoSchema>;

const UpdateTodo = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const todoId = Number(id);

  // Fetch existing todo data
  const { data: todoData, isLoading: isFetching } = useGetTodoByIdQuery(todoId, {
    skip: !todoId || isNaN(todoId),
  });

  // Update mutation
  const [updateTodo, { isLoading: isUpdating }] =
    useUpdateTodoMutation();

  // React Hook Form setup with Zod validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateTodoForm>({
    resolver: zodResolver(updateTodoSchema),
    defaultValues: {
      title: "",
      description: "",
      completed: false,
    },
  });

  // Populate form with existing data when fetched
  useEffect(() => {
    if (todoData?.data) {
      reset({
        title: todoData.data.title,
        description: todoData.data.description || "",
        completed: todoData.data.completed,
      });
    }
  }, [todoData, reset]);

  const onSubmit = async (data: UpdateTodoForm) => {
    try {
      await updateTodo({
        id: todoId,
        data: {
          title: data.title,
          description: data.description || undefined,
          completed: data.completed,
        },
      }).unwrap();

      toast.success("Todo updated successfully!");

      // Success - navigate back to home or todos list
      navigate("/");
    } catch (err) {
      console.error("Failed to update todo:", err);
      toast.error("Failed to update todo. Please try again.");
    }
  };

  if (!todoId || isNaN(todoId)) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-red-500">Invalid todo ID</div>
        <Button onClick={() => navigate("/")} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div>Loading todo...</div>
      </div>
    );
  }

  if (!todoData?.data) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-red-500">Todo not found</div>
        <Button onClick={() => navigate("/")} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Update Todo</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter todo title"
            maxLength={255}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-25 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter todo description (optional)"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            id="completed"
            type="checkbox"
            {...register("completed")}
            className="w-4 h-4 rounded border-gray-300"
          />
          <label htmlFor="completed" className="text-sm font-medium">
            Mark as completed
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Todo"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTodo;
