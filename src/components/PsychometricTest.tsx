
import { useState } from "react";
import { Question, Answer, TestResult, questions, testimonials, calculateTestResult } from "@/lib/psychometric-data";
import QuestionCard from "./QuestionCard";
import TestResultComponent from "./TestResult";
import TestimonialCarousel from "./TestimonialCarousel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/lib/registerUser";

const PsychometricTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAnswer = (questionId: string, answer: Answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const result = calculateTestResult(answers);
      setTestResult(result);
      setTestCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleUserInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    const res = await registerUser({
      fullName: userInfo.fullName,
      email: userInfo.email,
    });
    setSubmitting(false);
    if (!res.success) {
      setErrorMsg("No se pudo registrar tu información. Intenta nuevamente.");
      return;
    }
    setFormSubmitted(true);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] : null;

  return (
    <div className="flex flex-col space-y-8 py-6 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-lg sm:text-xl font-medium mb-2">Test psicotécnico Evolve</h1>
        <p className="text-sm text-notion-mediumGray max-w-md mx-auto sm:text-sm text-xs">
          Realiza este test psicotécnico y descubre cómo se alinean tus habilidades y tu perfil con los desafíos reales de nuestro Máster.
        </p>
      </div>

      <div className="w-full transition-all duration-700 ease-in-out">
        {!formSubmitted ? (
          <div className="notion-card w-full max-w-md mx-auto">
            <form onSubmit={handleUserInfoSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-1 sm:text-sm text-xs">Nombre completo</label>
                <Input
                  id="fullName"
                  value={userInfo.fullName}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, fullName: e.target.value }))}
                  required
                  className="w-full text-sm sm:text-sm text-xs"
                  disabled={submitting}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 sm:text-sm text-xs">Correo electrónico</label>
                <Input
                  id="email"
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="w-full text-sm sm:text-sm text-xs"
                  disabled={submitting}
                />
              </div>
              {errorMsg && (
                <div className="text-xs text-destructive text-center">
                  {errorMsg}
                </div>
              )}
              <Button
                type="submit"
                className="w-full notion-button text-xs"
                disabled={submitting}
              >
                {submitting ? "Registrando..." : "Comenzar"}
              </Button>
            </form>
          </div>
        ) : !testCompleted ? (
          currentQuestion ? (
            <QuestionCard
              question={currentQuestion}
              onAnswer={handleAnswer}
              currentIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              selectedAnswer={selectedAnswer}
            />
          ) : (
            <div className="text-center">Error: No hay preguntas disponibles</div>
          )
        ) : (
          <div className="animate-fade-in transition-all duration-700">
            {testResult && <TestResultComponent result={testResult} userInfo={userInfo} />}
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PsychometricTest;
