import { create } from "zustand";
import type { FormulaState, FormulaTag } from "../types/formula";

export const useFormulaStore = create<FormulaState>((set, get) => ({
  formula: [],
  cursorPosition: 0,
  inputValue: "",
  isEditing: false,
  suggestions: [],
  selectedSuggestion: 0,
  showSuggestions: false,

  addToFormula: (item) =>
    set((state) => {
      const newFormula = [...state.formula];
      newFormula.splice(state.cursorPosition, 0, item);
      return {
        formula: newFormula,
        cursorPosition: state.cursorPosition + 1,
        inputValue: "",
        showSuggestions: false,
      };
    }),

  setFormula: (formula) => set({ formula }),

  setCursorPosition: (position) => set({ cursorPosition: position }),

  setInputValue: (value) => set({ inputValue: value }),

  setSuggestions: (suggestions) => set({ suggestions }),

  setSelectedSuggestion: (index) => set({ selectedSuggestion: index }),

  setShowSuggestions: (show) => set({ showSuggestions: show }),

  setIsEditing: (editing) => set({ isEditing: editing }),

  removeItem: (index) =>
    set((state) => {
      const newFormula = [...state.formula];
      newFormula.splice(index, 1);
      return { formula: newFormula, cursorPosition: index };
    }),

  calculateResult: () => {
    const { formula } = get();
    if (formula.length === 0) return null;

    try {
      // Convert the formula to a string expression
      let expression = "";

      for (const item of formula) {
        if (typeof item === "string") {
          expression += item;
        } else {
          // Use the value of the tag
          expression += item.value;
        }
      }

      // Use Function constructor to safely evaluate the expression
      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${expression}`)();
      return typeof result === "number" ? result : null;
    } catch (error) {
      console.error("Error calculating formula:", error);
      return null;
    }
  },
}));
