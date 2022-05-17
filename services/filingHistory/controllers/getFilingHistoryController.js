import { getFilingHistory } from "../service/getFilingHistory";
const getParamsSchema = {
    schema: {
        params: {
            title: '',
            type: 'object',
            properties: {
                company_number: { type: 'string' },
                transaction_id: { type: 'string' }
            }
        },
        querystring: {
            items_per_page: { type: 'integer', required: false }
        },
        response: { 200: {} }
    }
};
export const getFilingHistoryController = async (fastify, opts) => {
    fastify.get('/company/:company_number/filing-history/:transaction_id', getParamsSchema, (req, res) => {
        const { company_number, transaction_id } = req.params;
        return getFilingHistory(company_number, transaction_id);
    });
};
//# sourceMappingURL=getFilingHistoryController.js.map