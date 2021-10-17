export default async function handler(req, res) {
    const {
        method,
    } = req

    switch (method) {
        case 'POST':
            // New a category
            res.status(200).json({ name: `POST filter page` });
            break
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
