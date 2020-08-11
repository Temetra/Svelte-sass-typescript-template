export function waitFor<TParam>(ms: number, param?: TParam) : Promise<TParam> {
	return new Promise(resolve => setTimeout(() => resolve(param), ms));
}

export function checkResponse(response: Response) {
	if (!response.ok) throw { message:response.statusText, status:response.status };
	else return response;
}