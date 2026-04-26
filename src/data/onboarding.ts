export interface GoalOption {
  id: string;
  label: string;
  description: string;
}

export interface PainPoint {
  id: string;
  label: string;
}

export interface TinderStatement {
  id: string;
  text: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface ProcessingMessage {
  text: string;
  delay_ms: number;
}

export const goalOptions: GoalOption[] = [
  {
    id: "teach",
    label: "Teach better classes",
    description: "Build sequences for your students faster",
  },
  {
    id: "personal",
    label: "Build a personal practice",
    description: "Design flows that fit your body and goals",
  },
  {
    id: "daily",
    label: "Find quick daily flows",
    description: "Short practices that fit a busy schedule",
  },
  {
    id: "learn",
    label: "Learn yoga properly",
    description: "Understand poses, alignment, and sequencing",
  },
];

export const painPoints: PainPoint[] = [
  { id: "prep-time", label: "Class prep takes too long" },
  { id: "generic", label: "Pre-recorded classes feel generic" },
  { id: "combining", label: "I don't know which poses to combine" },
  { id: "consistency", label: "I can't stay consistent" },
];

export const tinderStatements: TinderStatement[] = [
  { id: "ts-001", text: "I wish I could design my own flows" },
  { id: "ts-002", text: "I want a yoga app that isn't just video classes" },
  { id: "ts-003", text: "I'd practice more if it took less planning" },
  { id: "ts-004", text: "I want to understand why poses are sequenced a certain way" },
];

export const testimonialsByGoal: Record<string, Testimonial> = {
  teach: {
    quote:
      "I used to spend 45 minutes planning each class. Now I build a full sequence in under 5 minutes and my students love the variety.",
    name: "Sarah M.",
    role: "Yoga teacher, 8 years",
  },
  personal: {
    quote:
      "Having a tool that lets me pick exactly the poses I need changed everything. My home practice went from sporadic to daily.",
    name: "James K.",
    role: "Software engineer & yoga practitioner",
  },
  daily: {
    quote:
      "Ten minutes in the morning with a custom flow does more for me than an hour-long class I never get to.",
    name: "Priya R.",
    role: "Working parent",
  },
  learn: {
    quote:
      "I finally understand how poses connect. Building my own sequences taught me more about yoga than two years of classes.",
    name: "Alex T.",
    role: "Yoga student",
  },
};

export const processingMessages: ProcessingMessage[] = [
  { text: "Finding poses for your style...", delay_ms: 800 },
  { text: "Curating flows for your goals...", delay_ms: 1200 },
  { text: "Personalizing your home screen...", delay_ms: 1000 },
];
