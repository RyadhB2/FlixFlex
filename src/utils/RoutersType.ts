import { NavigatorScreenParams } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";



export type BottomTabParamList = {
  Movies: undefined;
  Series: undefined;
}
export type MainNavigatorParamList = {
  BottomTab: NavigatorScreenParams<BottomTabParamList> | undefined,
  Details: undefined
  TopRated: { forMedia: "Serie" | "Movie" }
};
export type BottomTabNavigationProp = StackNavigationProp<BottomTabParamList>;

export type DefaultMainNavigationProp = StackNavigationProp<MainNavigatorParamList>;
