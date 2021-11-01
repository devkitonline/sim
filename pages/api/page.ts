
export default async function handler(req, res) {
    const {
        method,
    } = req

    switch (method) {
        case 'POST':

            break
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
