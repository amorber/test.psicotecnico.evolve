
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
    text: "How comfortable are you with data analysis and statistical methods?",
    answers: [
      { id: "q1a1", text: "Very comfortable, I use them regularly", value: 25 },
      { id: "q1a2", text: "Somewhat comfortable, I have some experience", value: 18 },
      { id: "q1a3", text: "Neutral, I understand the basics", value: 12 },
      { id: "q1a4", text: "Not very comfortable, limited experience", value: 6 },
      { id: "q1a5", text: "Not comfortable at all, no experience", value: 0 },
    ],
  },
  {
    id: "q2",
    text: "How would you rate your current project management skills?",
    answers: [
      { id: "q2a1", text: "Expert, I lead complex projects", value: 25 },
      { id: "q2a2", text: "Advanced, I can manage most projects well", value: 18 },
      { id: "q2a3", text: "Intermediate, I can handle basic projects", value: 12 },
      { id: "q2a4", text: "Basic, I need guidance with projects", value: 6 },
      { id: "q2a5", text: "Beginner, little to no experience", value: 0 },
    ],
  },
  {
    id: "q3",
    text: "What is your experience level with strategic planning and decision-making?",
    answers: [
      { id: "q3a1", text: "Extensive experience in strategic roles", value: 25 },
      { id: "q3a2", text: "Good experience with strategic initiatives", value: 18 },
      { id: "q3a3", text: "Some exposure to strategic planning", value: 12 },
      { id: "q3a4", text: "Limited involvement in strategic decisions", value: 6 },
      { id: "q3a5", text: "No experience with strategic planning", value: 0 },
    ],
  },
  {
    id: "q4",
    text: "How would you describe your leadership and team management abilities?",
    answers: [
      { id: "q4a1", text: "Strong leader, experienced with diverse teams", value: 25 },
      { id: "q4a2", text: "Effective leader in most situations", value: 18 },
      { id: "q4a3", text: "Developing leader with some experience", value: 12 },
      { id: "q4a4", text: "Emerging leader, limited experience", value: 6 },
      { id: "q4a5", text: "No leadership experience yet", value: 0 },
    ],
  },
];

// Sample testimonial data
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Alex Johnson",
    role: "Data Scientist",
    testimonial: "This program transformed my career. I gained practical skills that I use daily.",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=528",
  },
  {
    id: "t2",
    name: "Sarah Chen",
    role: "Product Manager",
    testimonial: "The strategic frameworks taught here helped me lead my team to success.",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=528",
  },
  {
    id: "t3",
    name: "Michael Taylor",
    role: "Marketing Director",
    testimonial: "I gained a competitive edge in my field. Worth every minute invested.",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=528",
  },
  {
    id: "t4",
    name: "Jennifer Lee",
    role: "Operations Manager",
    testimonial: "The program's analytical approach revolutionized my decision-making process.",
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
  
  let strengthArea = "overall business acumen";
  let improvementArea = "foundational skills";
  
  if (strengths.length > 0) {
    const topStrength = strengths[0].questionIndex;
    if (topStrength === 0) strengthArea = "data analysis and statistical methods";
    if (topStrength === 1) strengthArea = "project management";
    if (topStrength === 2) strengthArea = "strategic planning";
    if (topStrength === 3) strengthArea = "leadership and team management";
  }
  
  if (improvements.length > 0) {
    const topImprovement = improvements[0].questionIndex;
    if (topImprovement === 0) improvementArea = "data analysis skills";
    if (topImprovement === 1) improvementArea = "project management capabilities";
    if (topImprovement === 2) improvementArea = "strategic thinking";
    if (topImprovement === 3) improvementArea = "leadership abilities";
  }
  
  // Generate overall assessment
  let overallAssessment = "";
  if (percentage >= 80) {
    overallAssessment = `You show exceptional compatibility with this program. With your strong ${strengthArea}, you're likely to excel and can focus on further developing your ${improvementArea}.`;
  } else if (percentage >= 60) {
    overallAssessment = `This program is a good match for you. Your ${strengthArea} provides a solid foundation, while the curriculum will help strengthen your ${improvementArea}.`;
  } else if (percentage >= 40) {
    overallAssessment = `You have moderate compatibility with this program. While you have some knowledge in ${strengthArea}, you'll benefit significantly from the comprehensive coverage of ${improvementArea}.`;
  } else {
    overallAssessment = `This program will be challenging but rewarding for you. It will provide fundamental knowledge and skills, particularly in ${improvementArea}, while building upon your existing ${strengthArea}.`;
  }
  
  return {
    percentage,
    strengthArea,
    improvementArea,
    overallAssessment
  };
};
