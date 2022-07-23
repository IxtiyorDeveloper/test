import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit"
import {message} from "antd";
import * as asyncFunctions from "../../../service/functions"

export const attachDateToRoom = createAsyncThunk('add/room', async (data, {dispatch, getState}) => {
    try {
        dispatch(setLoading({key: "rooms", data: true}))
        const res = (await asyncFunctions.addClient(getState().reducer.rooms.data, data))
        message.success("Successfully booked!")
        return res.data
    } catch (err) {
        dispatch(setError({key: "rooms", data: true}))
        if (err.status === 505){
            message.warn("This room is busy in this day")
        }
        else {
            message.error("Error!!!")
        }
        throw err
    }
})

export const checkRoomStatus = createAsyncThunk('check/status', async (data, {dispatch, getState}) => {
    try {
        dispatch(setLoading({key: "isBusy", data: true}))
        const res = await asyncFunctions.checkStatus(getState().reducer.rooms.data, data)
        message.success("Successfully checked!")
        return res.data
    } catch (err) {
        dispatch(setError({key: "isBusy", data: true}))
        message.error("Error!!!")
        throw err
    }
})

export const getAllData = createAsyncThunk('room/get', async (data, {dispatch, getState}) => {
    try {
        dispatch(setLoading({key: "allData", data: true}))
        const res = (await asyncFunctions.getData(getState().reducer.allData.data))
        message.success("Rooms are successfully listed!")
        return res.data
    } catch (err) {
        dispatch(setError({key: "allData", data: true}))
        message.error("Error!!!")
        throw err
    }
})

const initialState = {
    rooms: {
        data: [],
        isLoading: false,
        isError: false
    },
    isBusy: {
        data: undefined,
        isLoading: false,
        isError: false
    },
    allData: {
        data: [],
        isLoading: false,
        isError: false
    }
}

const slice = createSlice({
    name: "roomsSlice",
    initialState,
    reducers: {
        setLoading: (store, {payload}) => {
            const {key, data} = payload
            store[key].isLoading = data
        },
        setError: (store, {payload}) => {
            const {key, data} = payload
            store[key].isError = data
        }
    },
    extraReducers: builder => builder.addCase(attachDateToRoom.fulfilled, (store, {payload}) => {
        store.rooms.data = payload;
        store.rooms.isLoading = false;
        store.rooms.isError = false;
    }).addCase(checkRoomStatus.fulfilled, (store, {payload}) => {
        store.isBusy.data = payload
        store.isBusy.isLoading = false
        store.isBusy.isError = false
    }).addCase(getAllData.fulfilled, (store, {payload}) => {
        store.allData.data = payload
        store.allData.isLoading = false
        store.allData.isError = false
    }).addCase(attachDateToRoom.rejected, (store) => {
        store.rooms.isLoading = false;
        store.rooms.isError = true;
    }).addCase(checkRoomStatus.rejected, (store) => {
        store.isBusy.isLoading = false;
        store.isBusy.isError = true;
    }).addCase(getAllData.rejected, (store) => {
        store.allData.isLoading = false;
        store.allData.isError = true;
    })
})

export const {setLoading, setError} = slice.actions
export default slice.reducer

export const getCallStatus = (key) => createSelector(
    store => store.reducer,
    reducer => ({isLoading: reducer[key].isLoading, isError: reducer[key].isError}),
)

export const getData = (key) => createSelector(
    store => store.reducer,
    state => state[key].data
)
