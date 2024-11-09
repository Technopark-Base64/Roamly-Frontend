import { createSlice } from '@reduxjs/toolkit';
import { IPlace } from 'src/entities/Place';
import { IMapStorage, IMarker } from '../../model/types';

const initialState: IMapStorage = {
	markers: [],
	isRoute: false,
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
		setMarkers: (state, action: { payload: { markers: IMarker[], isRoute: boolean } }) => {
			state.markers = action.payload.markers;
			state.isRoute = action.payload.isRoute;
		},
		setView: (state, action: { payload: IPlace['location'] }) => {
			state.currentView = action.payload;
		},
		setZoom: (state, action: { payload: number }) => {
			state.currentZoom = action.payload;
		},
		clearMap: (state) => {
			state.currentZoom = initialState.currentZoom;
			state.currentView = initialState.currentView;
			state.markers = initialState.markers;
			state.isRoute = initialState.isRoute;
			state.selectedId = initialState.selectedId;
		}
	},
});

export const { setView, clearMap, setZoom, setMarkers, setSelectedId } = mapSlice.actions;

export default mapSlice.reducer;