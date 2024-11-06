import { createSlice } from '@reduxjs/toolkit';
import { IPlace } from 'src/entities/Place';
import { IMapStorage } from '../../model/types';

const initialState: IMapStorage = {
	selectedPlace: null,
	currentZoom: 12,
	currentView: {
		lat: 0,
		lng: 0,
	},
};

const mapSlice = createSlice({
	name: 'map',
	initialState,
	reducers: {
		setPlace: (state, action: {payload: IPlace | null }) => {
			state.selectedPlace = action.payload;
		},
		setView: (state, action: {payload: IPlace['location'] }) => {
			state.currentView = action.payload;
		},
		setZoom: (state, action: {payload: number }) => {
			state.currentZoom = action.payload;
		},
		clearMap: (state) => {
			state.selectedPlace = initialState.selectedPlace;
			state.currentView = initialState.currentView;
			state.currentZoom = initialState.currentZoom;
		}
	},
});

export const { setPlace, setView, clearMap, setZoom } = mapSlice.actions;

export default mapSlice.reducer;
