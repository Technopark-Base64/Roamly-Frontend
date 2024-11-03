import { useNavigate } from 'react-router-dom';
import { useFetch } from 'src/shared/hooks/useFetch';
import { deleteTrip } from '../api/deleteTrip';


export const useDeleteTrip = (id: string) => {
	const navigate = useNavigate();

	const {
		error,
		refetch,
	} = useFetch<unknown>(deleteTrip(id));

	const DeleteTrip = async () => {
		await refetch();
		if (!error) {
			navigate('/', { replace: true });
			navigate(0);
		}
	};

	return { DeleteTrip };
};
