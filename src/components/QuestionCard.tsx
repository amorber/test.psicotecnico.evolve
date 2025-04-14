
import { useState, useEffect } from "react";
import { Question, Answer } from "@/lib/psychometric-data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  onAnswer: (questionId: string, answer: Answer) => void;
  currentIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  selectedAnswer: Answer | null;
}

const QuestionCard = ({ 
  question, 
  onAnswer, 
  currentIndex, 
  totalQuestions,
  onPrevious,
  onNext,
  selectedAnswer: existingSelectedAnswer
}: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(existingSelectedAnswer);

  useEffect(() => {
    setSelectedAnswer(existingSelectedAnswer);
  }, [existingSelectedAnswer, question.id]);

  const handleSelectAnswer = (answer: Answer) => {
    setSelectedAnswer(answer);
    onAnswer(question.id, answer);
    
    // Add a slight delay before moving to next question
    setTimeout(() => {
      onNext();
    }, 200);
  };

  return (
    <div className="notion-card w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs text-notion-mediumGray">
          Pregunta {currentIndex + 1} de {totalQuestions}
        </span>
        <div className="h-1 flex-1 ml-4 bg-notion-lightGray rounded-full overflow-hidden">
          <div 
            className="h-full bg-notion-text transition-all duration-700 ease-in-out" 
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }} 
          />
        </div>
      </div>
      
      <h3 className="text-[calc(1rem-1px)] mb-6 sm:text-[calc(1rem-1px)] text-[calc(0.875rem+1px)]">{question.text}</h3>
      
      <div className="space-y-3">
        {question.answers.map((answer) => (
          <div
            key={answer.id}
            className={cn(
              "notion-input-option",
              selectedAnswer?.id === answer.id ? 'selected bg-notion-accent/90' : '',
              "transition-colors duration-300 ease-in-out" // Using only color transition to prevent layout shifts
            )}
            onClick={() => handleSelectAnswer(answer)}
          >
            <div className="w-5 h-5 flex-shrink-0 border border-notion-mediumGray rounded-full flex items-center justify-center">
              {selectedAnswer?.id === answer.id && (
                <div className="w-3 h-3 bg-notion-text rounded-full" />
              )}
            </div>
            <span className="text-[calc(0.75rem+1px)] sm:text-[calc(0.75rem+1px)] text-[calc(0.75rem+2px)]">{answer.text}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button 
          onClick={onPrevious}
          disabled={currentIndex === 0}
          variant="outline"
          className="notion-button text-xs px-3 py-1 h-8 transition-all duration-300"
          size="sm"
        >
          <ArrowLeft size={14} className="mr-1" />
          Anterior
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={!selectedAnswer || currentIndex >= totalQuestions - 1}
          className="notion-button text-xs px-3 py-1 h-8 transition-all duration-300"
          size="sm"
        >
          Siguiente
          <ArrowRight size={14} className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
