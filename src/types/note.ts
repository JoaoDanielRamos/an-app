interface Note {
  id: number;
  title: string;
  tags: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}

export type { Note };
