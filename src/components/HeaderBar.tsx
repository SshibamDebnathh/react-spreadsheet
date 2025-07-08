import type { FC } from "react";

export const HeaderBar: FC = () => {
  const actions = [
    {
      head: "ABC",
      color:"bg-green-300 w-1/3",
      
    },
    {
      head: "Answer a question",
      color:"bg-purple-300 w-1/2",

    },
    {
      head: "Extract",
      color:"bg-red-300 w-1/3",

    },
    {
      head: "+",
      color:"bg-green-200 w-1/4",

    },
  ];

  return (
    <div className="flex justify-between items-center border-b border-gray-200 bg-white text-[13px]">
      {/* Left: Title */}
      <div className="text-gray-800 font-medium flex items-center space-x-1">
        <span role="img" aria-label="folder">
          📁
        </span>
        <span>Q3 Financial Overview</span>
      </div>

      {/* Right: Tab-like buttons */}
      <div className="flex gap-5 justify-between text-gray-600 w-1/3">
        {actions.map((action,id) => (
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
  );
};
