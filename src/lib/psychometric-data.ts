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

// Updated psychometric test questions
export const questions: Question[] = [
  {
    id: "q1",
    text: "¿Qué frase define mejor tu situación actual?",
    answers: [
      { id: "q1a1", text: "Estoy buscando un reto que me saque de mi zona de confort", value: 25 },
      { id: "q1a2", text: "Quiero dejar de sentir que desperdicio mi talento", value: 25 },
      { id: "q1a3", text: "Necesito empezar una etapa que me dé futuro", value: 25 },
      { id: "q1a4", text: "Me motiva la idea de reinventarme desde lo digital", value: 25 },
    ],
  },
  {
    id: "q2",
    text: "Imagina que estás frente a una puerta con un cartel que dice \"Prohibido pasar, salvo que lo cuestiones\". ¿Qué haces?",
    answers: [
      { id: "q2a1", text: "Entro sin pensarlo, me gusta tomar riesgos", value: 25 },
      { id: "q2a2", text: "Me detengo a analizar si debo cruzarla, me gusta pensar antes de actuar", value: 25 },
      { id: "q2a3", text: "Me siento motivado por el desafío, eso me impulsa", value: 25 },
      { id: "q2a4", text: "Pregunto primero qué hay detrás, me gusta entender el contexto", value: 25 },
    ],
  },
  {
    id: "q3",
    text: "¿Cuál de estas palabras sientes que más te representa hoy?",
    answers: [
      { id: "q3a1", text: "Evolución (quiero crecer y aprender)", value: 25 },
      { id: "q3a2", text: "Potencial (sé que tengo más para dar)", value: 25 },
      { id: "q3a3", text: "Búsqueda (estoy en una etapa de exploración)", value: 25 },
      { id: "q3a4", text: "Determinación (tengo claro lo que quiero)", value: 25 },
    ],
  },
  {
    id: "q4",
    text: "¿Cuál es el siguiente número de la serie? 1 – 4 – 9 – 16 – ?",
    answers: [
      { id: "q4a1", text: "20", value: 0 },
      { id: "q4a2", text: "25", value: 25 },
      { id: "q4a3", text: "30", value: 0 },
      { id: "q4a4", text: "36", value: 0 },
    ],
  },
  {
    id: "q5",
    text: "Tienes que aprender una nueva herramienta que aún no entiendes. ¿Cómo actúas?",
    answers: [
      { id: "q5a1", text: "Pruebo por mi cuenta hasta entenderlo", value: 25 },
      { id: "q5a2", text: "Busco tutoriales o pido ayuda a alguien", value: 25 },
      { id: "q5a3", text: "Me frustro un poco pero no abandono", value: 25 },
      { id: "q5a4", text: "Busco otra solución más simple", value: 25 },
    ],
  },
  {
    id: "q6",
    text: "¿Qué representa mejor el tipo de cambio que quieres hacer?",
    answers: [
      { id: "q6a1", text: "De lo teórico a lo práctico", value: 25 },
      { id: "q6a2", text: "De lo repetitivo a lo creativo", value: 25 },
      { id: "q6a3", text: "De lo cómodo a lo desafiante", value: 25 },
      { id: "q6a4", text: "De la incertidumbre a un rumbo claro", value: 25 },
    ],
  },
  {
    id: "q7",
    text: "¿Cuál de estas actitudes crees que necesitas reforzar para crecer profesionalmente?",
    answers: [
      { id: "q7a1", text: "Tolerancia al error", value: 25 },
      { id: "q7a2", text: "Visión de largo plazo", value: 25 },
      { id: "q7a3", text: "Mentalidad digital", value: 25 },
      { id: "q7a4", text: "Autoconfianza", value: 25 },
    ],
  },
  {
    id: "q8",
    text: "Si pudieras elegir un superpoder profesional hoy, ¿cuál escogerías?",
    answers: [
      { id: "q8a1", text: "Entender patrones complejos para anticipar soluciones", value: 25 },
      { id: "q8a2", text: "Proteger sistemas y personas de amenazas", value: 25 },
      { id: "q8a3", text: "Anticipar decisiones con datos", value: 25 },
      { id: "q8a4", text: "Crear soluciones nunca vistas con tecnología", value: 25 },
    ],
  },
  {
    id: "q9",
    text: "¿Con qué nivel te identificas ahora mismo?",
    answers: [
      { id: "q9a1", text: "Estoy preparado, solo necesito una dirección", value: 25 },
      { id: "q9a2", text: "Estoy en construcción, pero tengo hambre de crecer", value: 25 },
      { id: "q9a3", text: "Me falta claridad, pero sé que tengo lo necesario", value: 25 },
      { id: "q9a4", text: "Tengo dudas, pero también determinación", value: 25 },
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
    thumbnailUrl: "/lovable-uploads/c0b78cb7-3fe5-4a7e-860c-f1da8103f415.png",
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
    thumbnailUrl: "/lovable-uploads/3e9e4c80-ea08-47b6-b8c3-5c2870a4aed7.png",
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
  // Always return 87% regardless of the answers
  const percentage = 87;
  
  // These values won't be displayed anymore but we still need to return them
  const strengthArea = "conocimientos generales de negocios";
  const improvementArea = "habilidades fundamentales";
  
  // Customized assessment message
  const overallAssessment = "Tu perfil encaja al 87% con nuestro máster: tienes la base perfecta y este programa será el impulso que te llevará al siguiente nivel profesional.";
  
  return {
    percentage,
    strengthArea,
    improvementArea,
    overallAssessment
  };
};
