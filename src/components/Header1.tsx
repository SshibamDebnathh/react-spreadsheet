import React, { useState } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { FC } from "react";
import { tableData } from "../data/mockdata";

// Type
type RowData = typeof tableData[number];

// Group label component
export const GroupLabel: React.FC<{ label: string; className?: string }> = ({ label, className }) => (
  <div className={`text-xs px-2 py-1 rounded font-medium ${className}`}>{label}</div>
);

export const GroupLabelRow: FC = () => (
  <div className="flex justify-end gap-2 mb-2">
    <GroupLabel label="ABC" className="bg-green-200 text-green-900" />
    <GroupLabel label="Answer a question" className="bg-purple-200 text-purple-900" />
    <GroupLabel label="Extract" className="bg-orange-200 text-orange-900" />
    <GroupLabel label="..." className="bg-pink-200 text-pink-900" />
  </div>
);

export const HeaderBar: FC = () => {
  const actions = [
    {
      head: "ABC",
      color: "bg-green-300 w-1/3",
    },
    {
      head: "Answer a question",
      color: "bg-purple-300 w-1/2",
    },
    {
      head: "Extract",
      color: "bg-red-300 w-1/3",
    },
    {
      head: "+",
      color: "bg-green-200 w-1/4",
    },
  ];

  return (
    <div className="border-b border-gray-200 bg-white text-[13px]">
      {/* Top: Group Label Row */}
      <GroupLabelRow />

      {/* Bottom: Title and Actions */}
      <div className="flex justify-between items-center px-4 py-2">
        {/* Left: Title */}
        <div className="text-gray-800 font-medium flex items-center space-x-1">
          <span role="img" aria-label="folder">
            📁
          </span>
          <span>Q3 Financial Overview</span>
        </div>

        {/* Right: Tab-like buttons */}
        <div className="flex gap-5 justify-between text-gray-600 w-1/3">
          {actions.map((action, id) => (
            <button
              key={id}
              onClick={() => console.log(`${action.head} clicked`)}
              className={`hover:underline transition ${action.color} py-1`}
            >
              {action.head}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Column definitions
const columns: ColumnDef<RowData>[] = [
  {
    header: "#",
    id: "index",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Job Request",
    accessorKey: "job",
  },
  {
    header: "Submitted",
    accessorKey: "submitted",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      const colorMap: Record<string, string> = {
        "Complete": "bg-green-100 text-green-800",
        "In-process": "bg-yellow-100 text-yellow-800",
        "Need to start": "bg-blue-100 text-blue-800",
        "Blocked": "bg-red-100 text-red-800",
      };
      return <span className={`px-2 py-[2px] rounded-md font-medium text-[13px] ${colorMap[value]}`}>{value}</span>;
    },
  },
  {
    header: "Submitter",
    accessorKey: "submitter",
  },
  {
    header: "URL",
    accessorKey: "url",
  },
  {
    header: "Assigned",
    accessorKey: "assigned",
  },
  {
    header: "Priority",
    accessorKey: "priority",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      const priorityClassMap: Record<string, string> = {
        High: "bg-red-100 text-red-700",
        Medium: "bg-yellow-100 text-yellow-700",
        Low: "bg-blue-100 text-blue-700",
      };
      return <span className={`px-2 py-[2px] rounded-md font-medium text-[13px] ${priorityClassMap[value]}`}>{value}</span>;
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
    id: "spacer",
    cell: () => <span className="p-5 w-6 bg-white"></span>,
  },
];

// TableGrid component
export const Header1: FC = () => {
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
    <div className="p-4 overflow-auto bg-white text-[13px] border-b border-gray-200">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100 border-b border-gray-200">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="h-10">
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-3 py-2 text-left font-medium text-gray-700 border-x-4 border-x-white"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="h-11 border-b border-gray-100 hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-3 py-2 whitespace-nowrap text-gray-800">
                  {editingCell?.rowId === row.id && editingCell?.columnId === cell.column.id ? (
                    <input
                      autoFocus
                      value={cellValues[Number(row.id)][cell.column.id as keyof RowData] ?? ""}
                      onChange={(e) => {
                        const updated = { ...cellValues };
                        updated[Number(row.id)][cell.column.id as keyof RowData] = e.target.value;
                        setCellValues(updated);
                      }}
                      onBlur={() => setEditingCell(null)}
                      className="w-full px-2 py-[5px] rounded-md text-[13px] border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  ) : (
                    <span
                      onClick={() => setEditingCell({ rowId: row.id, columnId: cell.column.id })}
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
