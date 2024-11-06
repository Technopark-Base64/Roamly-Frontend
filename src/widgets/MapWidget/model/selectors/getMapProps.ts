import { RootState } from 'src/app/providers/StoreProvider';

export const getMapProps = (state: RootState) => {
	return state.mapReducer;
};
