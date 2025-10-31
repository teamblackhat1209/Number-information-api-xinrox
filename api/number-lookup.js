const axios = require('axios');

module.exports = async (req, res) => {
  // CORS enable karein
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const { number, key } = req.query;

      // Key verify karein
      if (!key || key !== 'xinroxbhaiya') {
        return res.status(401).json({
          success: false,
          error: 'Invalid or missing key'
        });
      }

      if (!number) {
        return res.status(400).json({
          success: false,
          error: 'Number parameter is required'
        });
      }

      // API se data fetch karein
      const apiUrl = `https://ox.taitaninfo.workers.dev/?mobile=${number}`;
      
      const response = await axios.get(apiUrl);
      
      res.status(200).json({
        success: true,
        number: number,
        data: response.data,
        fetchedAt: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({
        success: false,
        error: 'Data fetch nahi ho paya',
        details: error.message
      });
    }
  } else {
    res.status(405).json({
      success: false,
      error: 'Only GET method allowed'
    });
  }
};
