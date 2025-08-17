export interface Values {
  title: string;
  content: string;
  tag: string;
}

export interface Note extends Values {
  id: number,
}