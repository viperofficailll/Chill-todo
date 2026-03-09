import { useNavigate } from "react-router-dom";
import { Home, PlusCircle,  Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const navigate = useNavigate();

  const navlinks = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Add-Todo", path: "/add-todo", icon: <PlusCircle size={20} /> }, ];

  return (
    <nav className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between rounded-xl border-2 border-solid border-gray-300 bg-white px-6 mt-5">
      {/* Logo */}
      <div
        className="cursor-pointer text-2xl font-bold  transition text-purple-600"
        onClick={() => navigate("/")}
      >
        Chill-Todo
      </div>

      {/* Nav links */}
      <div className="hidden gap-6 md:flex">
        {navlinks.map((nav) => (
          <div
            key={nav.path}
            onClick={() => navigate(nav.path)}
            className="flex max-w-2xl cursor-pointer items-center gap-1 font-medium text-gray-700 transition  hover:text-purple-600"
          >
            {nav.icon}
            {nav.name}
          </div>
        ))}
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            {/* Wrapping in a button solves the ref issue and is better for accessibility */}
            <button className="rounded-lg p-2 transition-colors outline-none hover:bg-gray-100">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="w-75 sm:w-100">
            {/* Header Section */}
            <SheetHeader className="border-b pb-6 text-left">
              <SheetTitle className="text-2xl font-bold text-purple-600">
                Chill-Todo
              </SheetTitle>
              <SheetDescription className="text-muted-foreground text-sm">
                Stay organized and keep it light.
              </SheetDescription>
            </SheetHeader>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-2 py-6">
              {navlinks.map((nav) => (
                <div
                  key={nav.path}
                  onClick={() => navigate(nav.path)}
                  className="group flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 text-gray-600 transition-all duration-200 hover:bg-purple-50 hover:text-purple-700 hover:shadow-sm active:scale-[0.98]"
                >
                  <span className="flex items-center justify-center rounded-md bg-gray-100 p-1.5 text-gray-500 transition-all duration-200 group-hover:scale-110 group-hover:bg-purple-100 group-hover:text-purple-600">
                    {nav.icon}
                  </span>
                  <span className="text-base font-medium tracking-wide transition-all duration-200 group-hover:translate-x-1">
                    {nav.name}
                  </span>
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Header;
