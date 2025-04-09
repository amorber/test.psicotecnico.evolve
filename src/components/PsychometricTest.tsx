
import { useState } from "react";
import { Question, Answer, TestResult, questions, testimonials, calculateTestResult } from "@/lib/psychometric-data";
import QuestionCard from "./QuestionCard";
import TestResultComponent from "./TestResult";
import TestimonialCarousel from "./TestimonialCarousel";

const PsychometricTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  
  const handleAnswer = (questionId: string, answer: Answer) => {
    // Save the answer
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    // Move to next question or complete the test
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate and set results
      const result = calculateTestResult({
        ...answers,
        [questionId]: answer
      });
      setTestResult(result);
      setTestCompleted(true);
    }
  };
  
  return (
    <div className="flex flex-col space-y-8 py-6 px-4">
      <div className="text-center mb-6">
        <h1 className="text-lg font-medium mb-2">Program Compatibility Assessment</h1>
        <p className="text-sm text-notion-mediumGray max-w-md mx-auto">
          Take this quick assessment to see how well our Master's program aligns with your current skills and experience.
        </p>
      </div>
      
      {!testCompleted ? (
        <QuestionCard
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
        />
      ) : (
        <>
          {testResult && <TestResultComponent result={testResult} />}
          <TestimonialCarousel testimonials={testimonials} />
        </>
      )}
    </div>
  );
};

export default PsychometricTest;
