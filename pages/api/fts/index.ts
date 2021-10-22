

export function handler(req, res) {
    const {
        method,
    } = req

    switch (method) {
        case 'GET':

            res.status(200).json({code: 1, message: `Success`});
            break;
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
