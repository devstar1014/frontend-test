import { useState, useRef } from "react";
import type { FormulaTag as FormulaTagType } from "../types/formula";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface FormulaTagProps {
  tag: FormulaTagType;
  index: number;
  onRemove: (index: number) => void;
}

const FormulaTag = ({ tag, index, onRemove }: FormulaTagProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      e.stopPropagation();
      onRemove(index);
    }
  };

  const getBgColor = () => {
    switch (tag.type) {
      case "variable":
        return "bg-blue-100";
      case "function":
        return "bg-purple-100";
      case "reference":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div
      ref={containerRef}
      className={`inline-flex items-center rounded-md mx-0.5 ${getBgColor()} border border-gray-300 group relative`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <span className="px-2 py-1 text-sm rounded-l-md select-none text-black">{tag.name}</span>

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <ChevronDown className="h-3 w-3 text-gray-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="text-black" onClick={() => console.log(`Edit ${tag.name}`)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-black" onClick={() => onRemove(index)}>
            Remove
          </DropdownMenuItem>
          <DropdownMenuItem className="text-black" onClick={() => console.log(`View ${tag.name} details`)}>
            View details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FormulaTag;
