export interface Notification {
  title: string;
  validUntil: Date;
  description: string;
  readingTimeMinutes: number;
  tagList: string[];
  authorName: string;
  id: number;
}
