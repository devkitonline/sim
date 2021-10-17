
export default async function handler(req, res) {
    const {
        query: { tag, author, publisher, slug },
        method,
    } = req

    switch (method) {
        case 'POST':
            // New a category
            res.status(200).json({ name: `POST new page` });
            break
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
