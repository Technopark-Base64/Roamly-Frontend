import { useEffect, useState } from 'react';
import { useCurrentTrip } from 'src/entities/Trip';
import { INVITE_LINK_BASE } from 'src/shared/config';
import { useFetch } from 'src/shared/hooks/useFetch';
import { createToken } from '../api/createToken';
import { deleteToken } from '../api/deleteToken';
import { getTokens } from '../api/getTokens';
import { ITokens } from '../model/types';

interface IProps {
  isEditor: boolean,
	// eslint-disable-next-line no-unused-vars
	setEnabled: (state: boolean) => void,
}

export const useShareForm = ({ isEditor, setEnabled }: IProps) => {
	const { id } = useCurrentTrip().currentTrip ?? { id: '' };
	const [tokens, setTokens] = useState<ITokens>({
		reader: null,
		editor: null
	});

	const { data: tokensRes } = useFetch<ITokens>(getTokens(id));
	const { data: createTokenRes, refetch: CreateToken } = useFetch(createToken({
		trip_id: id,
		access: isEditor ? 'editor' : 'reader',
	}));
	const { data: deleteTokenRes, refetch: DeleteToken } = useFetch(deleteToken({
		trip_id: id,
		access: isEditor ? 'editor' : 'reader',
	}));

	useEffect(() => {
		tokensRes && setTokens(tokensRes);
	}, [tokensRes]);

	useEffect(() => {
		createTokenRes && setTokens(prev => ({ ...prev, ...createTokenRes }));
	}, [createTokenRes]);

	useEffect(() => {
		deleteTokenRes && setTokens(prev => ({ ...prev, ...deleteTokenRes }));
	}, [deleteTokenRes]);

	useEffect(() => {
		setEnabled(!!tokens[isEditor ? 'editor' : 'reader']);
	}, [isEditor, tokens]);

	const inviteLink = tokens[isEditor ? 'editor' : 'reader']
		?`${INVITE_LINK_BASE}${tokens[isEditor ? 'editor' : 'reader']}`
		: '';

	return { inviteLink, CreateToken, DeleteToken };
};
