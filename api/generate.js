const qrcode = require('qrcode');

module.exports = async (req, res) => {
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
