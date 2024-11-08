import { createSlice } from '@reduxjs/toolkit';
import { IPlace } from 'src/entities/Place';
import { IMapStorage, IMarker } from '../../model/types';

const initialState: IMapStorage = {
	markers: [],
	selectedId: '',
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
		setSelectedId: (state, action: { payload: string }) => {
			state.selectedId = action.payload;
		},
		setMarkers: (state, action: { payload: IMarker[] }) => {
			state.markers = action.payload;
		},
		setView: (state, action: { payload: IPlace['location'] }) => {
			state.currentView = action.payload;
		},
		setZoom: (state, action: { payload: number }) => {
			state.currentZoom = action.payload;
		},
		clearMap: (state) => {
			state = initialState;
		}
	},
});

export const { setView, clearMap, setZoom, setMarkers, setSelectedId } = mapSlice.actions;

export default mapSlice.reducer;