import type { FC } from "react";
import { ChevronDown, Search, Bell } from "lucide-react";
import { VscLayoutSidebarRight } from "react-icons/vsc";
import {MdMoreHoriz} from 'react-icons/md';



export const TopNavBar: FC = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center px-4 py-2 border-b-2 text-sm border-gray-200 bg-white text-[13px]">
      {/* Left: Breadcrumb Path */}
      <div className="text-gray-600 flex items-center gap-3 font-semibold">
        <VscLayoutSidebarRight style={{fontSize:"20px",color:"green"}}/>
        <span className="text-gray-400">Workspace</span>
        <span className="text-gray-400">›</span>
        <span className="text-gray-400">Folder 2</span>
        <span className="text-gray-800 font-medium">›</span>
        <span>Spreadsheet 3</span>
        {/* <span className="text-lg font-semibold ml-4">...</span> */}
        <MdMoreHoriz className="text-xl font-semibold"/>
      </div>

      {/* Right: Search + Profile */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search within sheet"
            className="pl-10 pr-4 py-[10px] rounded-md border border-gray-300 text-xs bg-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <Search className="w-4 h-4 absolute left-2 top-2.5 text-gray-400" />
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-2">
          <div className="relative w-fit">
            <Bell className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-1 -right-1 inline-flex items-center px-1 justify-center text-[10px] font-bold text-white bg-green-800 rounded-full">
              2
            </span>
          </div>
          <img
            src="https://i.pravatar.cc/30?u=user"
            alt="avatar"
            className="w-6 h-6 rounded-full"
          />
          <span className="text-gray-700">John Doe</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
};
