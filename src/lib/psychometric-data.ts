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

// Updated testimonial data with the new images and information
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Carlos",
    role: "Alumno del Máster en Ciberseguridad & IA",
    testimonial: "Este programa transformó mi carrera. Adquirí habilidades prácticas que uso a diario.",
    videoUrl: "https://youtu.be/D9f5hKml4Qg",
    thumbnailUrl: "/lovable-uploads/3e9e4c80-ea08-47b6-b8c3-5c2870a4aed7.png",
  },
  {
    id: "t2",
    name: "Noelia",
    role: "Alumna del Máster en Desarrollo Web Full Stack & IA",
    testimonial: "Los marcos estratégicos enseñados aquí me ayudaron a liderar mi equipo hacia el éxito.",
    videoUrl: "https://youtu.be/MgwTHO06f1A",
    thumbnailUrl: "/lovable-uploads/00558a74-beae-4730-9f4c-6aade09128d8.png",
  },
  {
    id: "t3",
    name: "Alberto",
    role: "Alumno del Máster en Inteligencia Artificial",
    testimonial: "Obtuve una ventaja competitiva en mi campo. Vale cada minuto invertido.",
    videoUrl: "https://youtu.be/JN2Kp5Z3fQc",
    thumbnailUrl: "/lovable-uploads/c0b78cb7-3fe5-4a7e-860c-f1da8103f415.png",
  },
  {
    id: "t4",
    name: "Mario Fernández",
    role: "Alumno del Máster en Ciberseguridad & IA",
    testimonial: "El enfoque analítico del programa revolucionó mi proceso de toma de decisiones.",
    videoUrl: "https://youtu.be/RY_dzC2AZGw",
    thumbnailUrl: "/lovable-uploads/dc673ab1-a2ec-412e-b662-ab96aeb0d0f5.png",
  },
  {
    id: "t5",
    name: "Alberto García",
    role: "Alumno del Máster en Inteligencia Artificial",
    testimonial: "La formación práctica me ha permitido destacar entre otros profesionales del sector.",
    videoUrl: "https://youtu.be/Yyw3fs355ik",
    thumbnailUrl: "/lovable-uploads/912e8f56-f5d9-4682-822c-7f0da4b1f0bd.png",
  },
  {
    id: "t6",
    name: "Víctor Rico",
    role: "Alumno del Máster en Data Science & IA",
    testimonial: "Las herramientas y conocimientos adquiridos me han abierto nuevas oportunidades laborales.",
    videoUrl: "https://youtu.be/6kzffPuLCUg",
    thumbnailUrl: "/lovable-uploads/03ef3099-c01a-4f30-ba70-ff825c04da03.png",
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
