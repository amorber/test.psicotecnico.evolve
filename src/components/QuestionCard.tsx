
import { useState, useEffect } from "react";
import { Question, Answer } from "@/lib/psychometric-data";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
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
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    setSelectedAnswer(existingSelectedAnswer);
  }, [existingSelectedAnswer, question.id]);

  const handleSelectAnswer = (answer: Answer) => {
    setSelectedAnswer(answer);
    setShowConfirmation(true);
    
    // Auto advance after selection with a small delay for animation
    setTimeout(() => {
      onAnswer(question.id, answer);
      onNext();
      setShowConfirmation(false);
    }, 500);
  };

  return (
    <div className="animate-fade-in notion-card w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs text-notion-mediumGray">
          Pregunta {currentIndex + 1} de {totalQuestions}
        </span>
        <div className="h-1 flex-1 ml-4 bg-notion-lightGray rounded-full overflow-hidden">
          <div 
            className="h-full bg-notion-text transition-all duration-300" 
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }} 
          />
        </div>
      </div>
      
      <h3 className="text-base mb-6">{question.text}</h3>
      
      <div className="space-y-3">
        {question.answers.slice(0, 3).map((answer) => (
          <div
            key={answer.id}
            className={cn(
              "notion-input-option",
              selectedAnswer?.id === answer.id ? 'selected' : '',
              showConfirmation && selectedAnswer?.id === answer.id ? 'animate-pulse' : ''
            )}
            onClick={() => handleSelectAnswer(answer)}
          >
            <div className="w-5 h-5 flex-shrink-0 border border-notion-mediumGray rounded-full flex items-center justify-center">
              {selectedAnswer?.id === answer.id && (
                <div className="w-3 h-3 bg-notion-text rounded-full" />
              )}
            </div>
            <span className="text-sm">{answer.text}</span>
            {showConfirmation && selectedAnswer?.id === answer.id && (
              <CheckCircle className="ml-auto text-green-500" size={20} />
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button 
          onClick={onPrevious}
          disabled={currentIndex === 0}
          variant="outline"
          className="notion-button"
        >
          <ArrowLeft size={16} className="mr-2" />
          Anterior
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={!selectedAnswer || currentIndex >= totalQuestions - 1}
          className="notion-button"
        >
          Siguiente
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
