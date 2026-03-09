import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { useCreateTodoMutation } from "@/redux/features/tasks.api";
import { Button } from "@/components/ui/button";

// Zod schema matching backend validation
const createTodoSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  description: z.string().optional(),
  completed: z.boolean().optional().default(false),
});

const AddTodo = () => {
  const navigate = useNavigate();
  const [createTodo, { isLoading }] = useCreateTodoMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    // Validate with Zod
    const result = createTodoSchema.safeParse({
      title: formData.title,
      description: formData.description || undefined,
      completed: formData.completed,
    });

    if (!result.success) {
      // Extract validation errors
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        errors[path] = issue.message;
      });
      setValidationErrors(errors);
      toast.error("Please fix the validation errors");
      return;
    }

    try {
      await createTodo(result.data).unwrap();
      toast.success("Todo created successfully!");

      // Success - navigate back to home or todos list
      navigate("/");
    } catch (err) {
      console.error("Failed to create todo:", err);
      toast.error("Failed to create todo. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Todo</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              validationErrors.title
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter todo title"
            maxLength={255}
          />
          {validationErrors.title && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.title}
            </p>
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
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px] ${
              validationErrors.description
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter todo description (optional)"
          />
          {validationErrors.description && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            id="completed"
            type="checkbox"
            checked={formData.completed}
            onChange={(e) =>
              setFormData({ ...formData, completed: e.target.checked })
            }
            className="w-4 h-4 rounded border-gray-300"
          />
          <label htmlFor="completed" className="text-sm font-medium">
            Mark as completed
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Todo"}
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

export default AddTodo;
