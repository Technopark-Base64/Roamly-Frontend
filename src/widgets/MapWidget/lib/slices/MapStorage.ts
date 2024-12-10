import { createSlice } from '@reduxjs/toolkit';
import { IPlace } from 'src/entities/Place';
import { IMapStorage, IMarker, TCircle } from '../../model/types';

const initialState: IMapStorage = {
	markers: [],
	isRoute: false,
	selectedId: '',
	mapSelectedPlace: null,
	currentZoom: 12,
	currentView: {
		lat: 0,
		lng: 0,
	},
	circle: null,
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
		setPlace: (state, action: { payload: IPlace | null }) => {
			state.mapSelectedPlace = action.payload;
		},
		setView: (state, action: { payload: IPlace['location'] }) => {
			state.currentView = action.payload;
		},
		setZoom: (state, action: { payload: number }) => {
			state.currentZoom = action.payload;
		},
		setCircle: (state, action: { payload: TCircle | null }) => {
			state.circle = action.payload;
		},
		clearMap: (state) => {
			state.currentZoom = initialState.currentZoom;
			state.currentView = initialState.currentView;
			state.markers = initialState.markers;
			state.isRoute = initialState.isRoute;
			state.selectedId = initialState.selectedId;
			state.circle = initialState.circle;
		}
	},
});

export const { setView, clearMap, setZoom, setMarkers, setPlace, setSelectedId, setCircle } = mapSlice.actions;

export default mapSlice.reducer;