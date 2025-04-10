
import PsychometricTest from "@/components/PsychometricTest";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 bg-notion-background">
      <div className="w-full max-w-4xl">
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/5b650d58-f5d6-460f-b733-92bf8bfddff5.png" 
            alt="Logo" 
            className="h-12 w-auto" 
          />
        </div>
        <PsychometricTest />
      </div>
    </div>
  );
};

export default Index;
