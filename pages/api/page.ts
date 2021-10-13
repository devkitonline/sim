import {apiHandler} from "../../helpers/api/api-handle";

export default apiHandler(handler);

async function handler(req, res) {
    const {
        query: { tag, author, publisher, slug },
        method,
    } = req

    switch (method) {
        case 'GET':
            // Get list of categories
            res.status(200).json({  name: `User` })
            break
        case 'POST':
            // New a category
            res.status(200).json({ name: `User` });
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
