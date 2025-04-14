
import type { TestResult as TestResultType } from "@/lib/psychometric-data";

interface TestResultProps {
  result: TestResultType;
  userInfo: {
    fullName: string;
    email: string;
  };
}

const TestResult = ({ result, userInfo }: TestResultProps) => {
  return (
    <div className="animate-fade-in notion-card w-full max-w-2xl mx-auto">
      <div className="mb-6 text-center">        
        <div className="text-4xl font-bold mb-4 text-notion-text">
          87%
        </div>
        
        <div className="h-3 w-full bg-notion-lightGray rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-notion-text transition-all duration-1000 ease-out"
            style={{ width: `87%` }} 
          />
        </div>
        <div className="flex justify-between text-xs text-notion-mediumGray">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-sm mb-3 text-center">
          Tu perfil encaja al 87% con nuestro máster: tienes el impulso, la mentalidad y el momento.
        </p>
      </div>
    </div>
  );
};

export default TestResult;
