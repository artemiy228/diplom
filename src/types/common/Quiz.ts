import { Question } from "./Question";

export interface Quiz {
  readonly id: string;
  title: string;
  questions_length: number;
  questions: Question[];
}
