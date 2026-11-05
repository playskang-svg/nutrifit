// Ads and analytics load only on the live domain, never on workers.dev previews or localhost.
export const isProdHost = (host: string | null): boolean => host === 'nutrifit.kr'
