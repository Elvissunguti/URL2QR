const axios = require('axios');

export default async function handler(req, res) {
    const { url, fileFormat } = req.body;

    const apiKey = '457ae7e5a3msh52e6e81bc2c11f7p1e86edjsn13633e9ff48c';
    const apiUrl = 'https://api.qrcode-monkey.com/qr/custom';

    const requestData = {
        data: url,
        file: fileFormat
    };

    try {
        const response = await axios.post(apiUrl, requestData, {
            headers: {
                'Content-Type': 'application/json',
                'X-QRCode-Monkey-Key': apiKey
            },
            responseType: 'arraybuffer' // Ensure response is treated as binary data
        });

        // Convert response data to Base64 string
        const base64data = Buffer.from(response.data, 'binary').toString('base64');

        // Send JSON response with Base64 image data
        res.status(200).json({ image: base64data });
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
