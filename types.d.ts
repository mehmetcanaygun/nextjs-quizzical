export type Participant = {
  username: string;
  score: number;
};

export type Quiz = {
  _id: string;
  owner: string;
  genre: string;
  difficulty: string;
  createdAt: string;
  participants: Participant[];
};
