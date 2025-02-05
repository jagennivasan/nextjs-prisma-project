import { authOptions } from "@/lib/auth";
import { ModeToggle } from "./ModeToggle";
import { getServerSession } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { FaUserCircle } from "react-icons/fa";
import SignOutBtn from "./SignOutBtn";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  
  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo / App Name */}
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
        welcome
        </div>

        {/* User Info & Toggle */}
        <div className="flex items-center space-x-4">
          {session && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 focus:outline-none">
                <FaUserCircle size={28} className="text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
                  {session.user.name}
                </span>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-white dark:bg-gray-800 rounded-md shadow-lg border dark:border-gray-700 mt-2 p-2 w-48">
                <DropdownMenuLabel className="text-gray-900 dark:text-gray-200 text-sm font-semibold">
                  {session.user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="border-t dark:border-gray-600 my-1" />
                <DropdownMenuItem >
                  <SignOutBtn />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
