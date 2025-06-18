import { IRole, ITenant, IUser } from '@/lib/appInterface/IUser';
import { createSlice } from '@reduxjs/toolkit';

interface IState {
    user?: IUser | null,
    tenant?: ITenant | null,
    permissions?: object | null, // it is object that contains permissions both role and user(will add it in future)
    refreshToken?: object,
    isLoading?: boolean,
    roles?: IRole[]
}

// initial state
const initialState: IState = {
    user: null,
    permissions: null,
    tenant: null,
    refreshToken: {},
    isLoading: true,
    roles: []
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            const { user, refreshToken } = action.payload;
            state.user = user;
            state.refreshToken = refreshToken;
        },
        setAppInitData(state, action) {
            const { tenant, permissions, roles } = action.payload;
            state.tenant = tenant;
            state.permissions = permissions;
            state.roles = roles;
            state.isLoading = false
        },
        setAuthUser(state, action) {
            state.user = action.payload;
        },
        setTenant(state, action) {
            state.tenant = action.payload;
        },
        logout(state) {
            state.user = null;
            state.permissions = null;
            state.refreshToken = undefined;
            state.tenant = null;
            state.isLoading = false;
        }
    }
});

export default auth.reducer;

export const { login, setAuthUser, logout, setAppInitData, setTenant } = auth.actions;
