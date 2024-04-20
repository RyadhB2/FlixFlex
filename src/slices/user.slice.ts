import MMKVstorage from "../utils/mmkv";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../redux/store/ConfigureStore";
import axios from "axios";
import auth from "@react-native-firebase/auth"


// ------------------------------------
// Constants
// ------------------------------------
export interface UserState {
    authToken: string | null;
    id: string | null;
}

const initialState: UserState = {
    authToken: null,
    id: null
};

// ------------------------------------
// Slice
// ------------------------------------

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken: (state, { payload }) => {
            state.authToken = payload;
        },
        setId: (state, { payload }) => {
            state.id = payload;
        },
        resetUserInfos: () => initialState
    },
});

export const authenticate = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const authResponse = await auth().signInWithEmailAndPassword(email, password)
        const user = authResponse.user;
        if (user.uid) {
            dispatch(setId(user.uid))
            MMKVstorage.set("userId", user.uid);
        }
    } catch (e) {
        throw e
    }
};

export const { setToken, setId } = userSlice.actions;

export default userSlice.reducer;
