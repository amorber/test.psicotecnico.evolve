
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
          {result.percentage}%
        </div>
        
        <div className="h-3 w-full bg-notion-lightGray rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-notion-text transition-all duration-1000 ease-out"
            style={{ width: `${result.percentage}%` }} 
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
          Este máster es una <span className="font-medium">coincidencia del {result.percentage}%</span> con tus conocimientos y habilidades.
        </p>
      </div>
      
      <div className="pt-4 border-t border-notion-lightGray">
        <div className="flex">
          <div className="w-1/2 pr-4 text-center">
            <h4 className="text-xs font-medium uppercase tracking-wider text-notion-mediumGray mb-2">Tus Fortalezas</h4>
            <p className="text-sm">{result.strengthArea}</p>
          </div>
          <div className="w-1/2 pl-4 border-l border-notion-lightGray text-center">
            <h4 className="text-xs font-medium uppercase tracking-wider text-notion-mediumGray mb-2">Áreas a Desarrollar</h4>
            <p className="text-sm">{result.improvementArea}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
