import {
  getCoreRowModel,
  flexRender,
  useReactTable,
  type ColumnDef,
  type Row,
} from "@tanstack/react-table";
import type { FC } from "react";
import { useState } from "react";
import { tableData as originalData } from "../data/mockdata";
import {
  FaHashtag,
  FaBriefcase,
  FaCalendarAlt,
  FaInfoCircle,
  FaUser,
  FaRegSmile,
  FaGlobe,
  FaChevronDown,
} from "react-icons/fa";
import { FiLink2 } from "react-icons/fi";
import { MdLoop, MdMoreHoriz } from "react-icons/md";
import { PiArrowsSplitThin } from "react-icons/pi";



type RowData = typeof originalData[number];

// Append 50 empty rows
const emptyRows: RowData[] = Array.from({ length: 50 }, () => ({
  job: "",
  submitted: "",
  status: "",
  submitter: "",
  url: "",
  assigned: "",
  priority: "",
  dueDate: "",
  value: "",
}));

const tableData = [...originalData, ...emptyRows];

const columns: ColumnDef<RowData>[] = [
  {
    header: "",
    id: "index",
    cell: ({ row }: { row: Row<RowData> }) => row.index + 1,
    meta: { icon: <FaHashtag className="text-gray-400" /> },
  },
  {
    header: "Job Request",
    accessorKey: "job",
    meta: { icon: <FaBriefcase className="text-gray-400" /> },
  },
  {
    header: "Submitted",
    accessorKey: "submitted",
    meta: { icon: <FaCalendarAlt className="text-gray-400" /> },
  },
  {
    header: "Status",
    accessorKey: "status",
    meta: { icon: <FaInfoCircle className="text-gray-400" /> },
    cell: ({ getValue }) => {
      const value = getValue() as string;
      const colorMap: Record<string, string> = {
        Complete: "bg-green-100 text-green-800",
        "In-process": "bg-yellow-100 text-yellow-800",
        "Need to start": "bg-blue-100 text-blue-800",
        Blocked: "bg-red-100 text-red-800",
      };
      return (
        <span
          className={`px-2 py-[2px] rounded-md font-medium text-[13px] ${colorMap[value] || ""
            }`}
        >
          {value}
        </span>
      );
    },
  },
  {
    header: "Submitter",
    accessorKey: "submitter",
    meta: { icon: <FaUser className="text-gray-400" /> },
  },
  {
    header: "URL",
    accessorKey: "url",
    meta: { icon: <FaGlobe className="text-gray-400" /> },
  },
  {
    header: "Assigned",
    accessorKey: "assigned",
    meta: { icon: <FaRegSmile className="text-gray-400" /> },
  },
  {
    header: "Priority",
    accessorKey: "priority",
    meta: { icon: null },
    cell: ({ getValue }) => {
      const value = getValue() as string;
      const priorityClassMap: Record<string, string> = {
        High: "text-[#EF4D44]",
        Medium: "text-[#C29210]",
        Low: "text-[#1A8CFF]",
      };
      return (
        <span
          className={`px-2 py-[2px] rounded-md font-semibold text-[13px] ${priorityClassMap[value] || "text-gray-700"
            }`}
        >
          {value}
        </span>
      );
    },
  },
  {
    header: "Due Date",
    accessorKey: "dueDate",
  },
  {
    header: "Est. Value",
    accessorKey: "value",
  },
  {
    header: "",
    // id: "filler",
    accessorKey: "filler",
    cell: () => <span className="block min-w-[48px] sm:min-w-[96px] bg-white" />,
  },
];

export const TableGrid: FC = () => {
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [editingCell, setEditingCell] = useState<{
    rowId: string;
    columnId: string;
  } | null>(null);

  const [cellValues, setCellValues] = useState(() => {
    return tableData.reduce((acc, row, rowIndex) => {
      acc[rowIndex] = { ...row };
      return acc;
    }, {} as Record<number, RowData>);
  });

  return (
    <div className="w-full overflow-x-auto max-h-[80vh] overflow-y-auto scrollbar-hide bg-[#F6F6F6]">
      <table className="min-w-[900px] w-[97vw] table-auto text-sm border-b border-gray-200 bg-white">
        <thead>
          {/* Grouped Header Row */}

          <tr className="py-2 bg-gray-200 border-b border-white sticky top-0">
            <th className="px-2 bg-white w-9"></th>
            <th colSpan={4} className="px-2 py-1 text-left text-gray-500 font-light">

              <div className="flex items-center"><span className="flex bg-gray-100 items-center gap-1 px-2 text-xs"><FiLink2 className="text-blue-700" />Q3 Financial Overview</span><MdLoop className="ml-2 text-red-600 text-[18px]" /></div>

            </th>
            <th className="bg-white"></th>
            <th className="px-2 py-2 text-left font-semibold text-gray-500 bg-green-300" style={{ backgroundColor: "#D2E0D4" }}>
              <div className="flex gap-2 items-center justify-center px-2">
                <PiArrowsSplitThin />
                <span>ABC
                </span>
                <MdMoreHoriz />
              </div>

            </th>
            <th colSpan={2} className="px-2 py-2 text-left font-semibold text-gray-500 bg-purple-300" style={{ backgroundColor: "#DCCFFC" }}>
              <div className="flex gap-2 items-center justify-between px-6 text-nowrap">
                <PiArrowsSplitThin className="text-white" />
                <span>Answer a Question</span>
                <MdMoreHoriz />

              </div>

            </th>
            <th className="px-2 py-2 text-left font-semibold text-gray-500" style={{ backgroundColor: "#FAC2AF" }}>
              <div className="flex gap-2 items-center justify-center px-2">
                <PiArrowsSplitThin className="text-white" />
                <span>Extract</span>
                <MdMoreHoriz />


              </div>
            </th>
            <th className="px-2 text-center font-semibold text-green-600 cursor-pointer bg-gray-100">
              +
            </th>
          </tr>

          {/* Column Header Row */}
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="h-10 bg-gray-100 sticky z-10"
            >
              {headerGroup.headers.map((header, index) => {

                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={`px-3 py-2 text-left font-semibold text-gray-500 font-sans border-x border-x-gray whitespace-nowrap ${header.id==="filler"?"bg-white":null} ${header.id==="priority"?"bg-[#EAE3FC]":null} ${header.id==="dueDate"?"bg-[#EAE3FC]":null} ${header.id==="assigned"?"bg-[#E8F0E9]":null} ${header.id==="value"?"bg-[#FFE9E0]":null}`}
                    onClick={(event)=>console.log(event.target)}
                  >
                    <div 
                    className="flex items-center gap-2 w-full text-xs">
                      {header.column.columnDef.meta?.icon && (
                        <span className="text-sm">
                          {header.column.columnDef.meta.icon}
                        </span>
                      )}
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {index > 0 && index < 5 && <FaChevronDown className="ml-auto text-gray-500" />}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="h-[36px] border-b border-gray-100 hover:bg-gray-50 text-xs"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`px-2 py-1 whitespace-nowrap text-gray-800 ${cell.column.id === "filler"
                    ? "border-l-2 border-r-2 border-dashed border-gray-300"
                    : "border-l border-gray-100"
                    }`}
                >
                  {editingCell?.rowId === row.id &&
                    editingCell?.columnId === cell.column.id ? (
                    <input
                      autoFocus
                      value={
                        cellValues[Number(row.id)][
                        cell.column.id as keyof RowData
                        ] ?? ""
                      }
                      onChange={(e) => {
                        const updated = { ...cellValues };
                        updated[Number(row.id)][
                          cell.column.id as keyof RowData
                        ] = e.target.value;
                        setCellValues(updated);
                      }}
                      onBlur={() => setEditingCell(null)}
                      className="w-full px-2 py-[5px] rounded-md text-sm border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  ) : (
                    <span
                      onClick={() =>
                        setEditingCell({
                          rowId: row.id,
                          columnId: cell.column.id,
                        })
                      }
                      className="cursor-pointer"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
