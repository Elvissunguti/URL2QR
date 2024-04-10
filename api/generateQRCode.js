export default async function handler(req, res) {
    const { url, fileFormat } = req.body;

    const apiKey = '457ae7e5a3msh52e6e81bc2c11f7p1e86edjsn13633e9ff48c';
    const apiUrl = 'https://api.qrcode-monkey.com/qr/custom';

    const requestData = {
        data: url,
        file: fileFormat
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-QRCode-Monkey-Key': apiKey
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Failed to generate QR code');
        }

        // Determine the appropriate content type based on the requested file format
        let contentType;
        if (fileFormat === 'png') {
            contentType = 'image/png';
        } else if (fileFormat === 'svg') {
            contentType = 'image/svg+xml';
        } else if (fileFormat === 'pdf') {
            contentType = 'application/pdf';
        } else if (fileFormat === 'eps') {
            contentType = 'application/postscript';
        }

        const blob = await response.blob();
        res.setHeader('Content-Type', contentType);
        res.status(200).send(blob);
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
