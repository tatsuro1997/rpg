export interface BaseExperience {
  date: string;
  title: string;
  point: number;
}

export interface WithId {
  id?: number;
}

export interface WithUserId {
  userId?: number;
}

// Generic type
export type Experience = BaseExperience & WithId & WithUserId;
