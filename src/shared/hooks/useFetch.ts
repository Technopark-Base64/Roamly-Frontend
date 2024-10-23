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
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const refetch = async () => {
		setIsFetching(true);
		setError(null);

		let currentError = '';

		for (let it = 0; it < retryCount; it++) {
			try {
				const response = await fetch(url, options);

				const data = await response.json();

				setIsFetching(false);

				console.log(data);

				if (!response.ok)
					setError(data.error);
				else
					setData(mapFunction(data));

				return;
			} catch (err: unknown) {
				console.log(err);
				currentError = 'Fetch Error';
			}

			await wait(retryDelay);
		}

		setIsFetching(false);
		setData(prev => prev);
		setError(currentError);
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
