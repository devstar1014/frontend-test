import type { SuggestionItem } from "../types/formula";
import { useFormulaStore } from "../store/formulaStore";

interface SuggestionListProps {
  suggestions: SuggestionItem[];
  isLoading: boolean;
  onSelect: (suggestion: SuggestionItem) => void;
}

const SuggestionList = ({ suggestions, isLoading, onSelect }: SuggestionListProps) => {
  const selectedSuggestion = useFormulaStore((state) => state.selectedSuggestion);
  const setSelectedSuggestion = useFormulaStore((state) => state.setSelectedSuggestion);

  if (isLoading) {
    return (
      <div className="absolute z-10 mt-1 bg-white shadow-lg rounded-md border border-gray-200 w-64 max-h-60 overflow-auto">
        <div className="p-2 text-sm text-gray-500">Loading suggestions...</div>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute z-10 mt-1 bg-white shadow-lg rounded-md border border-gray-200 w-64 max-h-60 overflow-auto">
      <ul className="py-1">
        {suggestions.map((suggestion, index) => (
          <li
            key={suggestion.id}
            className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${index === selectedSuggestion ? "bg-blue-50" : ""}`}
            onClick={() => onSelect(suggestion)}
            onMouseEnter={() => setSelectedSuggestion(index)}
          >
            <div className="flex items-center">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  suggestion.type === "variable" ? "bg-blue-500" : suggestion.type === "function" ? "bg-purple-500" : "bg-green-500"
                }`}
              />
              <span className="text-black">{suggestion.name}</span>
              <span className="ml-auto text-xs text-gray-400">{suggestion.type}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionList;
