import { AxiosResponse } from "axios";

import { QuestionAnswer, QuestionScore } from "@/types/test";

import apiClient from "./apiClient";

export function saveAnswers(
  id: string,
  answers: QuestionAnswer[],
): Promise<AxiosResponse<QuestionScore>> {
  const url = `/tests/${id}/scores/`;

  return apiClient.post(url, {
    answers,
  });
}
