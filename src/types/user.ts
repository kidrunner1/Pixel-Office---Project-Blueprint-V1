export type SafeUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
};

export type AuthTokenPayload = {
  userId: string;
  email: string;
  role: string;
};
