export interface Videos {
  _id: string;
  caption: string;
  comments: Comment[];
  likes: Like[];
  postedBy: PostedBy;
  userId: string;
  video: {
    asset: Assets;
  };
}

export interface Comment {
  _key: string;
  comment: string;
  postedBy: PostedBy;
}

export interface PostedBy {
  _id: string;
  image: string;
  userName: string;
}

export interface Like {
  _key: string;
  _ref: string;
  _type: string;
}

export interface Assets {
  _id: string;
  url: string;
}
