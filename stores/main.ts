import { create } from "zustand";
import { Notification } from "../interfaces/notification";
import { StudyCase } from "../interfaces/StudyCase";

interface MainStore {
  notification: Notification | null;
  setNotification(data: Notification | null): void;
  studyCases: StudyCase[];
  setStudyCases(studyCases: StudyCase[]): void;
  currentStudyCase: StudyCase | null;
  setCurrentStudyCase(studyCase: StudyCase): void;
  expoToken: string;
  setExpoToken(expoToken: string): void;
}

export const useMainStore = create<MainStore>((set) => ({
  notification: null,
  setNotification: (notification: Notification) =>
    set((prev) => ({ ...prev, notification })),
  studyCases: [],
  setStudyCases: (studyCases: StudyCase[]) =>
    set((prev) => ({ ...prev, studyCases })),
  currentStudyCase: null,
  setCurrentStudyCase: (studyCase: StudyCase) =>
    set((prev) => ({ ...prev, currentStudyCase: studyCase })),
  expoToken: "",
  setExpoToken: (expoToken: string) => set((prev) => ({ ...prev, expoToken })),
}));
