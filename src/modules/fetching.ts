export function waitFor(ms: number, param?: any) {
	return new Promise(resolve => setTimeout(() => resolve(param), ms));
}

export function checkResponse(response: any) {
	if (!response.ok) throw { message:response.statusText, status:response.status };
	else return response;
}