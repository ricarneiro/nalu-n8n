import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionTypes,
	NodeOperationError,
} from 'n8n-workflow';

export class NaluAi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'NaLU AI',
		name: 'naluAi',
		icon: { light: 'file:nalu.svg', dark: 'file:nalu.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{ "Validator: " + $parameter["operation"] }}',
		description: 'Semantic data validation and extraction for chatbots using NaLU AI.',
		defaults: {
			name: 'NaLU AI',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'naluAiApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Validator',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Validate Birthdate (Validate_birthdate)',
						value: 'birthdate',
						description: 'Extract and validate birth date in any format. Detects minors.',
						action: 'Extract and validate birth date in any format detects minors',
					},
					{
						name: 'Validate Cancel Intent (Validate_cancel_intent)',
						value: 'cancel_intent',
						description: 'Differentiate actual service cancellation from current operations',
						action: 'Differentiate actual service cancellation from current operations',
					},
					{
						name: 'Validate CEP (Validate_cep)',
						value: 'cep',
						description: 'Extract Brazilian CEP and return enriched address data',
						action: 'Extract brazilian cep and return enriched address data',
					},
					{
						name: 'Validate CNPJ (Validate_cnpj)',
						value: 'cnpj',
						description: 'Extract and validate CNPJ tax ID with mod 11',
						action: 'Extract and validate CNPJ tax ID with mod 11.',
					},
					{
						name: 'Validate CPF (Validate_cpf)',
						value: 'cpf',
						description: 'Extract and validate CPF tax ID with mod 11',
						action: 'Extract and validate CPF tax ID with mod 11.',
					},
					{
						name: 'Validate Email (Validate_email)',
						value: 'email',
						description: 'Extract email and correct typos (e.g. gmail to gmail.com)',
						action: 'Extract email and correct typos e g gmail to gmail com',
					},
					{
						name: 'Validate Handoff (Validate_handoff)',
						value: 'handoff',
						description: 'Semantic detection of intention to speak with a human agent',
						action: 'Semantic detection of intention to speak with a human agent',
					},
					{
						name: 'Validate License Plate BR (Validate_plate_br)',
						value: 'plate_br',
						description: 'Extract Brazilian Mercosul and old format plates, written out too',
						action: 'Extract brazilian mercosul and old format plates written out too',
					},
					{
						name: 'Validate Name (Validate_name)',
						value: 'name',
						description: 'Extract full names while ignoring greetings and titles',
						action: 'Extract full names while ignoring greetings and titles',
					},
					{
						name: 'Validate Phone (Validate_phone)',
						value: 'phone',
						description: 'Extract phone numbers with DDD. Validates active DDD ranges.',
						action: 'Extract phone numbers with ddd validates active ddd ranges',
					},
					{
						name: 'Validate Postal Code (Validate_postal_code)',
						value: 'postal_code',
						description: 'Extract and validate international postal codes',
						action: 'Extract and validate international postal codes',
					},
					{
						name: 'Validate Reply Context (Validate_reply)',
						value: 'reply',
						description: 'Analyze conversational context like counter-proposals (installments vs currency)',
						action: 'Analyze conversational context like counter proposals installments vs currency',
					},
					{
						name: 'Validate Yes/No (Validate_yes_no)',
						value: 'yes_no',
						description: 'Detect yes/no intent in any language, including indirect replies',
						action: 'Detect yes no intent in any language including indirect replies',
					},
				],
				default: 'name',
				description: 'Choose which NaLU AI validator to run',
			},
			// Inputs for all validators EXCEPT validate_reply
			{
				displayName: 'Agent Prompt/Question',
				name: 'agent_input',
				type: 'string',
				default: '',
				placeholder: 'Ex: Qual o seu nome?',
				required: true,
				displayOptions: {
					hide: {
						operation: ['reply'],
					},
				},
				description: 'The question or statement the chatbot sent to the user',
			},
			{
				displayName: 'User Reply',
				name: 'user_input',
				type: 'string',
				default: '',
				placeholder: 'Ex: Bom dia! Me chamo João Silva',
				required: true,
				displayOptions: {
					hide: {
						operation: ['reply'],
					},
				},
				description: 'The response given by the user',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'options',
				options: [
					{
						name: 'English',
						value: 'en',
					},
					{
						name: 'Portuguese (Brazil)',
						value: 'pt-BR',
					},
					{
						name: 'Spanish',
						value: 'es',
					},
				],
				default: 'pt-BR',
				displayOptions: {
					hide: {
						operation: ['reply'],
					},
				},
				description: 'The conversation language',
			},
			// Inputs ONLY for validate_reply
			{
				displayName: 'Agent Message (Reply)',
				name: 'agent_message',
				type: 'string',
				default: '',
				placeholder: 'Ex: Posso parcelar em 20x de R$100. Topa?',
				required: true,
				displayOptions: {
					show: {
						operation: ['reply'],
					},
				},
				description: 'The message sent by the agent',
			},
			{
				displayName: 'User Reply (Reply)',
				name: 'user_reply',
				type: 'string',
				default: '',
				placeholder: 'Ex: Bora em 48?',
				required: true,
				displayOptions: {
					show: {
						operation: ['reply'],
					},
				},
				description: 'The reply given by the user',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const operation = this.getNodeParameter('operation', itemIndex) as string;
				const body: Record<string, string> = {};

				if (operation === 'reply') {
					body.agent_message = this.getNodeParameter('agent_message', itemIndex) as string;
					body.user_reply = this.getNodeParameter('user_reply', itemIndex) as string;
				} else {
					body.agent_input = this.getNodeParameter('agent_input', itemIndex) as string;
					body.user_input = this.getNodeParameter('user_input', itemIndex) as string;
					body.language = this.getNodeParameter('language', itemIndex, 'pt-BR') as string;
				}

				const options = {
					method: 'POST' as const,
					url: `https://naluai.dev/v1/extract/${operation}`,
					body,
					json: true,
				};

				const responseData = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'naluAiApi',
					options
				);

				returnData.push({
					json: responseData,
					pairedItem: itemIndex,
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error.message },
						pairedItem: itemIndex,
					});
				} else {
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex,
					});
				}
			}
		}

		return [returnData];
	}
}
