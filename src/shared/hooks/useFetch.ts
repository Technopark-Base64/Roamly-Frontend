import { useState, useEffect } from 'react';

export interface IUseFetchProps<T> {
	url: string,
	options: {
		method: string,
		headers: {
			[key: string]: string
		},
		body?: string,
	},
	enabled?: boolean,
	retryCount?: number,
	retryDelay?: number,
	// eslint-disable-next-line no-unused-vars
	mapFunction?: (item: unknown) => T
}

export const useFetch = <T>(props: IUseFetchProps<T>) => {
	const {
		url,
		options,
		enabled = true,
		retryCount = 1,
		retryDelay = 500,
		mapFunction = (item: T) => item,
	} = props;

	const [data, setData] = useState<T | null>(null);
	const [isFetching, setIsFetching] = useState<boolean>(enabled);
	const [error, setError] = useState<string | null>(null);

	const refetch = async () => {
		setIsFetching(true);
		setError(null);

		let currentError = '';

		for (let it = 0; it < retryCount; it++) {
			try {
				const response = await fetch(url, options);

				const data = response.status === 204
					? { status: 'ok' }
					: await response.json();

				setIsFetching(false);

				if (!response.ok)
					setError(data.error ?? data.err);
				else
					setData(mapFunction(data));

				return response.ok && mapFunction(data);
			} catch (err: unknown) {
				console.error(err);
				currentError = 'Fetch Error';
			}

			await wait(retryDelay);
		}

		setIsFetching(false);
		setData(prev => prev);
		setError(currentError);

		return false;
	};

	useEffect(() => {
		if (enabled)
			refetch();
	}, []);

	return { data, isFetching, error, refetch };
};

const wait = (delay: number) => {
	return new Promise<void>((resolve) => {
		setTimeout(() => resolve(), delay);
	});
};
