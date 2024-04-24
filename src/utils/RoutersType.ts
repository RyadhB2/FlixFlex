import { NavigatorScreenParams } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";



export type BottomTabParamList = {
  Movies: undefined;
  Series: undefined;
}
export type AuthNavigatorParamList = {
  Login: undefined;
  Register: undefined;
}
export type MainNavigatorParamList = {
  BottomTab: NavigatorScreenParams<BottomTabParamList> | undefined,
  Details: {
    id: number;
    type: "Serie" | "Movie"
  }
  TopRated: { forMedia: "Serie" | "Movie" }
};

export type AuthNavigationProp = StackNavigationProp<AuthNavigatorParamList>;
export type DefaultMainNavigationProp = StackNavigationProp<MainNavigatorParamList>;
