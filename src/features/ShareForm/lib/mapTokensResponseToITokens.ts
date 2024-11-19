import { ITokensResponse } from '../model/types';

export const mapTokensResponseToITokens = (res: ITokensResponse) => ({
	reader: res.invitations.find((i) => i.access === 'reader' && i.enable)?.token ?? null,
	editor: res.invitations.find((i) => i.access === 'editor' && i.enable)?.token ?? null,
});