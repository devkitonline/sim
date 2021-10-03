export default function handler(req, res) {
    const data = require('../../../constants/menu.json');
    res.status(200).json(data);
}
