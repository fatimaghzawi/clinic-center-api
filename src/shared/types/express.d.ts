declare global {
  namespace Express {
    interface Request {
      user?: import('../../modules/auth/models/user.model').IUserDocument;
    }
  }
}

export {};
