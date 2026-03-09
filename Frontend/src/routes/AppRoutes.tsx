import RootLayout from "@/layout/Rootlayout";
import AddTodo from "@/pages/Add-todo/AddTodo";
import Home from "@/pages/Home/Home";
import UpdateTodo from "@/pages/Update-todo/UpdateTodo";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Approutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout></RootLayout>,
      children: [
        {
          index: true,
          element: <Home></Home>,
        },
        {
          path: "/add-todo",
          element: <AddTodo></AddTodo>,
        },
        {
          path: `/update-todo/:id`,
          element: <UpdateTodo></UpdateTodo>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};

export default Approutes;
