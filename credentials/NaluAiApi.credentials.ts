import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class NaluAiApi implements ICredentialType {
	name = 'naluAiApi';

	displayName = 'NaLU AI API';

	icon: Icon = { light: 'file:../nodes/NaluAi/nalu.svg', dark: 'file:../nodes/NaluAi/nalu.dark.svg' };

	documentationUrl = 'https://naluai.dev/docs';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key (Bearer Token)',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Enter your NaLU AI Bearer Token here.',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials?.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.naluai.dev',
			url: '/v1/extract/name',
			method: 'POST',
			body: {
				agent_input: 'test',
				user_input: 'test',
				language: 'pt-BR',
			},
		},
	};
}
