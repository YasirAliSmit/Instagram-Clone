import React from 'react';

export type headerProps = {
  right?: () => React.ReactNode | boolean;
  left?: () => React.ReactNode | boolean;
  post?: () => React.ReactNode | null;
  search?:()=>React.ReactNode | boolean;
  middle?:()=>React.ReactNode | boolean;
  messageHeader?:()=>React.ReactNode | boolean;
};
export interface userStories {
  id: string;
  image: string;
  title: string;
}
export interface postType {
  id: string;
  imageUrl: string;
  user: string;
  likes: string;
  profile_picture: string;
  comments: comment[];
  caption:string;
  likes_by_users:any[];
  owner_email:string
}
export type TextInputProps = {
  placeHolder: string;
  value: string;

  onChangeText: (text: string) => void;
  keyboardType: KeyboardType = 'default' |
    'email-address' |
    'numeric' |
    'phone-pad' |
    'number-pad' |
    'decimal-pad' |
    'visible-password';
  textContentType: TextContentType = 'none' |
    'URL' |
    'addressCity' |
    'emailAddress' |
    'fullStreetAddress' |
    'name' |
    'telephoneNumber' |
    'username' |
    'password';
    secureTextEntry:boolean;
};
export interface buttonTypes {
  title: string;
  event: () => void;
}
interface User {
_id:number,
name:string,
avatar:string
}
export  interface Messages {
  _id:number,
  text:string,
  createdAt:Date,
  user:User
}


