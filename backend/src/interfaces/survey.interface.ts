export interface Choice {
  answer_choice: string;
  question_id:number;
  status: boolean;
  image?: string;
}

export interface Question {
  section_id: number;
  question_text: string;
  question_type: "essay" | "choice" | "scale"; 
  choices?: Choice[];
  image?: string;
}

export interface Section {
  questions: Question[];
}

export interface Survey {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  sections: Section[];
}