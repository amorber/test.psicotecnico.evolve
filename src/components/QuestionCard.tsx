
import { useState } from "react";
import { Question, Answer } from "@/lib/psychometric-data";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  onAnswer: (questionId: string, answer: Answer) => void;
  currentIndex: number;
  totalQuestions: number;
}

const QuestionCard = ({ question, onAnswer, currentIndex, totalQuestions }: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);

  const handleSelectAnswer = (answer: Answer) => {
    setSelectedAnswer(answer);
  };

  const handleContinue = () => {
    if (selectedAnswer) {
      onAnswer(question.id, selectedAnswer);
    }
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
        {question.answers.map((answer) => (
          <div
            key={answer.id}
            className={`notion-input-option ${selectedAnswer?.id === answer.id ? 'selected' : ''}`}
            onClick={() => handleSelectAnswer(answer)}
          >
            <div className="w-5 h-5 flex-shrink-0 border border-notion-mediumGray rounded-full flex items-center justify-center">
              {selectedAnswer?.id === answer.id && (
                <div className="w-3 h-3 bg-notion-text rounded-full" />
              )}
            </div>
            <span className="text-sm">{answer.text}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button 
          onClick={handleContinue}
          disabled={!selectedAnswer}
          className="notion-button"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
