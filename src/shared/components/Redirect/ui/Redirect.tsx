import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  url: string,
  replace: boolean,
}

export const Redirect = ({ url, replace }: IProps) => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate(url, { replace });
	});
  
	return <></>;
};
