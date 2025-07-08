import type { FC } from "react";
import { BsChevronDoubleRight } from "react-icons/bs";
import { TfiDownload, TfiUpload } from "react-icons/tfi";
import { VscEyeClosed } from "react-icons/vsc";
import { LuArrowUpDown , LuListFilter } from "react-icons/lu";
import { FaRegShareSquare } from "react-icons/fa";
import { PiArrowsSplitThin } from "react-icons/pi";
import { TbArrowAutofitHeight } from "react-icons/tb";






export const ActionButtons: FC = () => {
  const buttons = [

    {
      name: "Import",
      meta: { icon: <TfiDownload className="text-gray-500 hover:text-white" /> }

    },
    {
      name: "Export",
      meta: { icon: <TfiUpload className="text-gray-500 hover:text-white" /> }

    },
    {
      name: "Share",
      meta: { icon: <FaRegShareSquare className="text-gray-500 hover:text-white" /> }

    },
    {
      name: "New Action",
      meta: { icon: <PiArrowsSplitThin className="text-white text-[18px]" /> }

    },

  ];
  const actions = [
    {
      name: "Hide fields",
      meta: { icon: <VscEyeClosed className="text-black" /> }

    },
    {
      name: "Sort",
      meta: { icon: <LuArrowUpDown className="text-black" /> }

    },
    {
      name: "Filter",
      meta: { icon: <LuListFilter  className="text-black" /> }

    },
    {
      name: "Cell view",
      meta: { icon: <TbArrowAutofitHeight className="text-black" /> }

    },
  ];


  return (

    <div className="flex flex-col gap-2 sm:flex-row justify-between px-4 py-2">
      <div className="flex space-x-4 text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <span>Tool bar</span>
          <BsChevronDoubleRight />
          <span className="text-lg text-gray-300">|</span>
        </div>
        {actions.map((action) => (
          <div
            key={action.name}
            onClick={() => console.log(`${action} clicked`)}
            className="flex gap-3 hover:underline transition items-center"
          >
            <span>{action.meta.icon}</span>
            {action.name}
          </div>
        ))}

      </div>
      <div className="flex items-center flex-wrap bg-white gap-2 text-[14px]">
        {buttons.map((btn) => (
          <div
            key={btn.name}
            onClick={() => console.log(`${btn} clicked`)}
            className={`flex items-center gap-2 px-3 py-[6px] rounded-md transition ${btn.name === "New Action"
              ? "bg-green-800 text-white px-7"
              : "border border-gray text-gray-500 hover:bg-green-800 hover:text-white px-4"
              }`}
          >
            {btn.meta.icon}
            {btn.name}
          </div>
        ))}
      </div>


    </div>


  );
};
