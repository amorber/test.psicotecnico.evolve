
export type Answer = {
  id: string;
  text: string;
  value: number; // Weighted value for assessment
};

export type Question = {
  id: string;
  text: string;
  answers: Answer[];
};

export type TestResult = {
  percentage: number;
  strengthArea: string;
  improvementArea: string;
  overallAssessment: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  testimonial: string;
  videoUrl: string;
  thumbnailUrl: string;
};

// Sample psychometric test questions
export const questions: Question[] = [
  {
    id: "q1",
    text: "¿Qué tan cómodo/a te sientes con el análisis de datos y métodos estadísticos?",
    answers: [
      { id: "q1a1", text: "Muy cómodo/a, los uso regularmente", value: 25 },
      { id: "q1a2", text: "Algo cómodo/a, tengo algo de experiencia", value: 18 },
      { id: "q1a3", text: "Neutral, entiendo los conceptos básicos", value: 12 },
      { id: "q1a4", text: "No muy cómodo/a, experiencia limitada", value: 6 },
      { id: "q1a5", text: "Nada cómodo/a, sin experiencia", value: 0 },
    ],
  },
  {
    id: "q2",
    text: "¿Cómo calificarías tus habilidades actuales en gestión de proyectos?",
    answers: [
      { id: "q2a1", text: "Experto/a, lidero proyectos complejos", value: 25 },
      { id: "q2a2", text: "Avanzado/a, puedo gestionar la mayoría de los proyectos bien", value: 18 },
      { id: "q2a3", text: "Intermedio/a, puedo manejar proyectos básicos", value: 12 },
      { id: "q2a4", text: "Básico/a, necesito orientación con los proyectos", value: 6 },
      { id: "q2a5", text: "Principiante, poca o ninguna experiencia", value: 0 },
    ],
  },
  {
    id: "q3",
    text: "¿Cuál es tu nivel de experiencia en planificación estratégica y toma de decisiones?",
    answers: [
      { id: "q3a1", text: "Amplia experiencia en roles estratégicos", value: 25 },
      { id: "q3a2", text: "Buena experiencia con iniciativas estratégicas", value: 18 },
      { id: "q3a3", text: "Alguna exposición a la planificación estratégica", value: 12 },
      { id: "q3a4", text: "Participación limitada en decisiones estratégicas", value: 6 },
      { id: "q3a5", text: "Sin experiencia en planificación estratégica", value: 0 },
    ],
  },
  {
    id: "q4",
    text: "¿Cómo describirías tus habilidades de liderazgo y gestión de equipos?",
    answers: [
      { id: "q4a1", text: "Líder fuerte, experimentado con equipos diversos", value: 25 },
      { id: "q4a2", text: "Líder eficaz en la mayoría de situaciones", value: 18 },
      { id: "q4a3", text: "Líder en desarrollo con alguna experiencia", value: 12 },
      { id: "q4a4", text: "Líder emergente, experiencia limitada", value: 6 },
      { id: "q4a5", text: "Sin experiencia de liderazgo aún", value: 0 },
    ],
  },
];

// Sample testimonial data
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Alejandro Jiménez",
    role: "Científico de Datos",
    testimonial: "Este programa transformó mi carrera. Adquirí habilidades prácticas que uso a diario.",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=528",
  },
  {
    id: "t2",
    name: "Sara Carreño",
    role: "Product Manager",
    testimonial: "Los marcos estratégicos enseñados aquí me ayudaron a liderar mi equipo hacia el éxito.",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=528",
  },
  {
    id: "t3",
    name: "Miguel Torres",
    role: "Director de Marketing",
    testimonial: "Obtuve una ventaja competitiva en mi campo. Vale cada minuto invertido.",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=528",
  },
  {
    id: "t4",
    name: "Julia López",
    role: "Gerente de Operaciones",
    testimonial: "El enfoque analítico del programa revolucionó mi proceso de toma de decisiones.",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=528",
  },
];

// Calculate test results based on user answers
export const calculateTestResult = (selectedAnswers: Record<string, Answer>): TestResult => {
  // Calculate total points based on selected answers
  const totalPossiblePoints = questions.length * 25; // Max 25 points per question
  const earnedPoints = Object.values(selectedAnswers).reduce((total, answer) => 
    total + (answer?.value || 0), 0);
  
  const percentage = Math.round((earnedPoints / totalPossiblePoints) * 100);
  
  // Determine strengths and areas for improvement based on answers
  const answerValues = questions.map((q, index) => {
    const answer = selectedAnswers[q.id];
    return {
      questionIndex: index,
      value: answer?.value || 0,
      maxValue: 25,
      ratio: (answer?.value || 0) / 25,
    };
  });
  
  const strengths = answerValues
    .filter(a => a.ratio >= 0.6)
    .sort((a, b) => b.ratio - a.ratio);
    
  const improvements = answerValues
    .filter(a => a.ratio < 0.6)
    .sort((a, b) => a.ratio - b.ratio);
  
  let strengthArea = "conocimientos generales de negocios";
  let improvementArea = "habilidades fundamentales";
  
  if (strengths.length > 0) {
    const topStrength = strengths[0].questionIndex;
    if (topStrength === 0) strengthArea = "análisis de datos y métodos estadísticos";
    if (topStrength === 1) strengthArea = "gestión de proyectos";
    if (topStrength === 2) strengthArea = "planificación estratégica";
    if (topStrength === 3) strengthArea = "liderazgo y gestión de equipos";
  }
  
  if (improvements.length > 0) {
    const topImprovement = improvements[0].questionIndex;
    if (topImprovement === 0) improvementArea = "habilidades de análisis de datos";
    if (topImprovement === 1) improvementArea = "capacidades de gestión de proyectos";
    if (topImprovement === 2) improvementArea = "pensamiento estratégico";
    if (topImprovement === 3) improvementArea = "habilidades de liderazgo";
  }
  
  // Generate overall assessment
  let overallAssessment = "";
  if (percentage >= 80) {
    overallAssessment = `Muestras una compatibilidad excepcional con este programa. Con tu sólido ${strengthArea}, es probable que sobresalgas y puedas centrarte en desarrollar aún más tus ${improvementArea}.`;
  } else if (percentage >= 60) {
    overallAssessment = `Este programa es una buena opción para ti. Tu ${strengthArea} proporciona una base sólida, mientras que el plan de estudios te ayudará a fortalecer tus ${improvementArea}.`;
  } else if (percentage >= 40) {
    overallAssessment = `Tienes una compatibilidad moderada con este programa. Aunque tienes algunos conocimientos en ${strengthArea}, te beneficiarás significativamente de la cobertura integral de ${improvementArea}.`;
  } else {
    overallAssessment = `Este programa será desafiante pero gratificante para ti. Te proporcionará conocimientos y habilidades fundamentales, particularmente en ${improvementArea}, mientras construye sobre tu existente ${strengthArea}.`;
  }
  
  return {
    percentage,
    strengthArea,
    improvementArea,
    overallAssessment
  };
};
