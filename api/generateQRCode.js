

export default async function handler(req, res) {
    const { url } = req.body;

    const apiKey = '457ae7e5a3msh52e6e81bc2c11f7p1e86edjsn13633e9ff48c';
    const apiUrl = 'https://api.qrcode-monkey.com/qr/custom';

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-QRCode-Monkey-Key': apiKey
        },
        body: JSON.stringify({ data: url })
    };

    try {
        const response = await fetch(apiUrl, config);
        const blob = await response.blob();
        res.setHeader('Content-Type', 'image/png');
        res.status(200).send(blob);
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
