export interface ITokensResponse {
  invitations: {
    token: string,
    access: 'reader' | 'editor',
    enable: boolean,
  }[],
}

export interface ITokens {
  reader: string | null,
  editor: string | null,
}
