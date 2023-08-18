import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  Splash: undefined;
  Chat: {data: User; id: string};
};

export type MessageNavProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

export interface User {
  userId: string;
  name: string;
  email: string;
  mobile: number;
  password: string;
  avatar?: string; // Optional avatar property as defined in IMessage
}
