import { useRef, useEffect, useState } from "react";
import { useFormulaStore } from "../store/formulaStore";
import { useSuggestions } from "../hooks/useSuggestions";
import type {
  SuggestionItem,
  FormulaTag as FormulaTagType,
} from "../types/formula";
import FormulaTag from "./FormulaTag";
import SuggestionList from "./SuggestionList";

const OPERATORS = [
  "+",
  "-",
  "*",
  "/",
  "(",
  ")",
  "^",
  "=",
  "<",
  ">",
  "<=",
  ">=",
];

const isOperator = (char: string): boolean => {
  return OPERATORS.includes(char);
};

const FormulaInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setCursorIndex] = useState<number | null>(null);

  // Get state from Zustand store
  const {
    formula,
    inputValue,
    showSuggestions,
    selectedSuggestion,
    addToFormula,
    setCursorPosition,
    setInputValue,
    setShowSuggestions,
    setSelectedSuggestion,
    removeItem,
    calculateResult,
  } = useFormulaStore();

  // Fetch suggestions using React Query
  const { data: suggestions = [], isLoading } = useSuggestions(inputValue);

  useEffect(() => {
    // Only update showSuggestions when inputValue changes, not on every render
    if (inputValue) {
      if (suggestions.length > 0) {
        setShowSuggestions(true);
      }
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue, suggestions.length]); // Depend only on inputValue and suggestions.length

  // Focus input when clicking the container
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Check if the input is an operator
    if (value.length === 1 && isOperator(value)) {
      addToFormula(value);
    } else {
      setInputValue(value);
    }
  };

  // Handle selection of a suggestion
  const handleSelectSuggestion = (suggestion: SuggestionItem) => {
    const tag: FormulaTagType = {
      id: suggestion.id,
      name: suggestion.name,
      value: suggestion.value,
      type: suggestion.type,
    };

    addToFormula(tag);
    setSelectedSuggestion(0);

    // Focus input again
    focusInput();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // If suggestions are shown
    if (showSuggestions && suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedSuggestion((selectedSuggestion + 1) % suggestions.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedSuggestion(
          (selectedSuggestion - 1 + suggestions.length) % suggestions.length
        );
      } else if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        handleSelectSuggestion(suggestions[selectedSuggestion]);
      } else if (e.key === "Escape") {
        e.preventDefault();
        setShowSuggestions(false);
      }
      return;
    }

    // Regular input handling
    if (e.key === "Enter") {
      e.preventDefault();
      const result = calculateResult();
      if (result !== null) {
        console.log("Result:", result);
      }
    } else if (
      e.key === "Backspace" &&
      inputValue === "" &&
      formula.length > 0
    ) {
      e.preventDefault();
      removeItem(formula.length - 1);
    } else if (isOperator(e.key)) {
      e.preventDefault();
      addToFormula(e.key);
    }
  };

  // Handle clicking on a specific position
  const handleContainerClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    // Focus input anyway
    focusInput();

    // Calculate position based on click
    const containerRect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - containerRect.left;

    // Get all formula elements including the input
    const elements = containerRef.current.querySelectorAll(
      ".formula-item, input"
    );
    let totalWidth = 0;
    let newIndex = 0;

    for (let i = 0; i < elements.length; i++) {
      const elem = elements[i];
      const rect = elem.getBoundingClientRect();
      const elemWidth = rect.width;

      // If click is before the middle of this element
      if (clickX < totalWidth + elemWidth / 2) {
        newIndex = i;
        break;
      }

      totalWidth += elemWidth;
      newIndex = i + 1;
    }

    if (newIndex <= formula.length) {
      setCursorPosition(newIndex);
      setCursorIndex(newIndex);
    }
  };

  const result = calculateResult();

  return (
    <div className="flex flex-col space-y-4 w-full max-w-3xl mx-auto">
      <div
        ref={containerRef}
        onClick={handleContainerClick}
        className="min-h-12 p-2 rounded-md border border-gray-300 bg-white flex items-center flex-wrap gap-1 cursor-text relative"
      >
        {formula.map((item: string | FormulaTagType, index: number) => (
          <span key={index} className="formula-item">
            {typeof item === "string" ? (
              <span className="mx-0.5 text-black">{item}</span>
            ) : (
              <FormulaTag tag={item} index={index} onRemove={removeItem} />
            )}
          </span>
        ))}

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-grow min-w-[4rem] outline-none border-none bg-transparent text-black"
          placeholder={formula.length === 0 ? "Start typing..." : ""}
        />

        {/* Show suggestions */}
        {showSuggestions && (
          <SuggestionList
            suggestions={suggestions}
            isLoading={isLoading}
            onSelect={handleSelectSuggestion}
          />
        )}
      </div>

      {/* Result display */}
      {result !== null && (
        <div className="text-right px-2 text-sm text-gray-600">
          = <span className="font-semibold">{result}</span>
        </div>
      )}
    </div>
  );
};

export default FormulaInput;
