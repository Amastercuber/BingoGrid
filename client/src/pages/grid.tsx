import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GridPage() {
  const [highlightedNumbers, setHighlightedNumbers] = useState<Set<number>>(new Set());
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Clear error message after 3 seconds
  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  const showErrorMessage = (message: string) => {
    setErrorMessage(message);
    setShowError(true);
  };

  const validateInput = (value: string): { valid: false; message: string } | { valid: true; number: number } => {
    const number = parseInt(value);
    if (isNaN(number)) {
      return { valid: false, message: "Please enter a valid number." };
    }
    if (number < 1 || number > 100) {
      return { valid: false, message: "Please enter a number between 1 and 100." };
    }
    return { valid: true, number };
  };

  const toggleHighlight = (number: number) => {
    setHighlightedNumbers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(number)) {
        newSet.delete(number);
      } else {
        newSet.add(number);
      }
      return newSet;
    });
  };

  const highlightEnteredNumber = () => {
    const value = inputValue.trim();
    if (!value) {
      showErrorMessage("Please enter a number.");
      return;
    }

    const validation = validateInput(value);
    if (!validation.valid) {
      showErrorMessage(validation.message);
      return;
    }

    if (highlightedNumbers.has(validation.number)) {
      showErrorMessage(`Number ${validation.number} is already highlighted.`);
      return;
    }

    setHighlightedNumbers(prev => new Set(prev).add(validation.number));
    setInputValue("");
  };

  const lightUpRandomNumber = () => {
    // Get all numbers that are not highlighted
    const availableNumbers = [];
    for (let i = 1; i <= 100; i++) {
      if (!highlightedNumbers.has(i)) {
        availableNumbers.push(i);
      }
    }

    if (availableNumbers.length === 0) {
      showErrorMessage("All numbers are already highlighted!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const randomNumber = availableNumbers[randomIndex];
    setHighlightedNumbers(prev => new Set(prev).add(randomNumber));
    
    // Briefly flash the randomly selected number
    const cell = document.querySelector(`[data-number="${randomNumber}"]`) as HTMLElement;
    if (cell) {
      cell.style.transform = 'scale(1.1)';
      setTimeout(() => {
        cell.style.transform = 'scale(1)';
      }, 200);
    }
  };

  const clearAllHighlights = () => {
    setHighlightedNumbers(new Set());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      highlightEnteredNumber();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (showError) {
      setShowError(false);
      setErrorMessage("");
    }
  };

  const renderGrid = () => {
    const cells = [];
    for (let i = 1; i <= 100; i++) {
      const isHighlighted = highlightedNumbers.has(i);
      cells.push(
        <div
          key={i}
          data-number={i}
          onClick={() => toggleHighlight(i)}
          className={`
            ${isHighlighted 
              ? 'bg-blue-600 border-blue-500 hover:bg-blue-700 shadow-lg' 
              : 'bg-gray-800 border-gray-600 hover:bg-gray-700'
            }
            border rounded-lg flex items-center justify-center cursor-pointer 
            transition-all duration-200 text-white font-medium select-none
            aspect-square text-sm
          `}
        >
          {i}
        </div>
      );
    }
    return cells;
  };

  return (
    <div className="h-screen flex flex-col dark-surface overflow-hidden">
      {/* Header */}
      <header className="text-center py-4 border-b dark-border">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          Interactive Number Grid
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          Click numbers to highlight them
        </p>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex p-4 gap-4 overflow-hidden">
        {/* Left Side - Controls */}
        <div className="w-1/3 min-w-[300px] flex flex-col">
          <div className="dark-elevated border dark-border rounded-lg p-4 shadow-xl h-full flex flex-col">
            {/* Manual Input Section */}
            <div className="mb-6">
              <Label htmlFor="numberInput" className="block text-sm font-medium text-gray-300 mb-2">
                Enter a number (1-100)
              </Label>
              <div className="flex flex-col gap-2">
                <Input
                  ref={inputRef}
                  id="numberInput"
                  type="number"
                  min="1"
                  max="100"
                  placeholder="Enter number..."
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="px-3 py-2 dark-surface border dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                />
                <Button
                  onClick={highlightEnteredNumber}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Highlight Number
                </Button>
              </div>
              {/* Error Message */}
              {showError && (
                <div className="mt-2 text-red-400 text-sm" role="alert">
                  {errorMessage}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <Button
                onClick={lightUpRandomNumber}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Light up Random Number
              </Button>
              <Button
                onClick={clearAllHighlights}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Clear All
              </Button>
            </div>

            {/* Status Indicator */}
            <div className="mt-auto text-center text-gray-400 text-sm">
              <span>
                {highlightedNumbers.size} number{highlightedNumbers.size !== 1 ? 's' : ''} highlighted
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Grid */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full h-full max-w-2xl max-h-[calc(100vh-200px)] aspect-square">
            <div className="grid grid-cols-10 gap-1 w-full h-full">
              {renderGrid()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
