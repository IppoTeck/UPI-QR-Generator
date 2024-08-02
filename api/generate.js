const qrcode = require('qrcode');

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // Allow specific methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers

    // Handle preflight requests (for OPTIONS method)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { upiId, payeeName, amount, note } = req.query;

    if (!upiId || !payeeName) {
        return res.status(400).json({ error: 'UPI ID and Payee Name are required' });
    }

    let baseUrl = `upi://pay?pa=${upiId}&pn=${payeeName}`;
    if (amount) baseUrl += `&amt=${amount}&cu=INR`;
    if (note) baseUrl += `&tn=${note}`;

    try {
        const qrCode = await qrcode.toDataURL(baseUrl);
        res.status(200).json({ qrCode });
    } catch (err) {
        res.status(500).json({ error: 'Error generating QR code' });
    }
};
