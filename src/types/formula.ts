export interface FormulaTag {
  id: string;
  name: string;
  value: number;
  type: "variable" | "function" | "reference";
}

export interface SuggestionItem {
  id: string;
  name: string;
  type: "variable" | "function" | "reference";
  value: number;
}

export interface FormulaState {
  formula: (FormulaTag | string)[];
  cursorPosition: number;
  inputValue: string;
  isEditing: boolean;
  suggestions: SuggestionItem[];
  selectedSuggestion: number;
  showSuggestions: boolean;
  addToFormula: (item: FormulaTag | string) => void;
  setFormula: (formula: (FormulaTag | string)[]) => void;
  setCursorPosition: (position: number) => void;
  setInputValue: (value: string) => void;
  setSuggestions: (suggestions: SuggestionItem[]) => void;
  setSelectedSuggestion: (index: number) => void;
  setShowSuggestions: (show: boolean) => void;
  setIsEditing: (editing: boolean) => void;
  removeItem: (index: number) => void;
  calculateResult: () => number | null;
}
