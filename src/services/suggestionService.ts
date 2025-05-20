import type { SuggestionItem } from "../types/formula";

// Mock data for suggestions
const mockVariables: SuggestionItem[] = [
  { id: "1", name: "Revenue", type: "variable", value: 1000 },
  { id: "2", name: "Cost", type: "variable", value: 500 },
  { id: "3", name: "Profit", type: "variable", value: 500 },
  { id: "4", name: "Growth Rate", type: "variable", value: 0.05 },
  { id: "5", name: "Tax Rate", type: "variable", value: 0.2 },
  { id: "6", name: "Expenses", type: "variable", value: 300 },
  { id: "7", name: "Sales", type: "variable", value: 1200 },
  { id: "8", name: "Marketing Budget", type: "variable", value: 200 },
];

const mockFunctions: SuggestionItem[] = [
  { id: "f1", name: "SUM", type: "function", value: 0 },
  { id: "f2", name: "AVG", type: "function", value: 0 },
  { id: "f3", name: "MIN", type: "function", value: 0 },
  { id: "f4", name: "MAX", type: "function", value: 0 },
];

const allSuggestions = [...mockVariables, ...mockFunctions];

export const getSuggestions = async (query: string): Promise<SuggestionItem[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  if (!query) return allSuggestions;

  const lowercaseQuery = query.toLowerCase();
  return allSuggestions.filter((item) => item.name.toLowerCase().includes(lowercaseQuery));
};
