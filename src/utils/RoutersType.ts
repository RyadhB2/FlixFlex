import { NavigatorScreenParams } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Media } from "../models/movies-series.models";



export type BottomTabParamList = {
  Movies: undefined;
  Series: undefined;
}
export type MainNavigatorParamList = {
  BottomTab: NavigatorScreenParams<BottomTabParamList> | undefined,
  Details: {
    id: number;
    type: "Serie" | "Movie"
  }
  TopRated: { forMedia: "Serie" | "Movie" }
};
export type BottomTabNavigationProp = StackNavigationProp<BottomTabParamList>;

export type DefaultMainNavigationProp = StackNavigationProp<MainNavigatorParamList>;
