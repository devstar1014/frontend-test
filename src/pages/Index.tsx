import FormulaInput from "../components/FormulaInput";

const Index = () => {
  return (
    <div className="min-h-screen w-screen bg-gray-50 flex flex-col justify-center items-center p-8">
      <header className="w-full max-w-3xl mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Formula Input</h1>
        <p className="text-gray-600 mt-2">
          Create formulas with variables, functions, and operations
        </p>
      </header>

      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Enter your formula:</h2>
        <FormulaInput />
      </div>

      <div className="w-full max-w-3xl mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-800 mb-2">Instructions:</h3>
        <ul className="list-disc pl-5 text-blue-700 space-y-1">
          <li>Type a name to search for variables and functions</li>
          <li>Use operators like +, -, *, /, ^, (, ) between tags</li>
          <li>Press Enter to calculate the result</li>
          <li>Select tags to view or edit their properties</li>
          <li>Press Backspace to delete tags</li>
        </ul>
      </div>
    </div>
  );
};

export default Index;
