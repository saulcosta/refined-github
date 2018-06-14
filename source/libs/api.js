import OptionsSync from 'webext-options-sync';

const cache = new Map();
const headers = new Headers();
const options = new OptionsSync().getAll();

export default async endpoint => {
	if (cache.has(endpoint)) {
		return cache.get(endpoint);
	}
	const {personalToken = ''} = await options;
	if (personalToken.trim().length === 40) {
		headers.set('Authorization', 'token ' + personalToken.trim());
	}
	const api = location.hostname === 'github.com' ? 'https://api.github.com/' : `${location.origin}/api/`;
	const response = await fetch(api + endpoint, {headers});
	const json = await response.json();
	cache.set(endpoint, json);
	return json;
};
