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
      const { number } = req.query;

      if (!number) {
        return res.status(400).json({
          success: false,
          error: 'Number parameter is required. Example: ?number=9960553267'
        });
      }

      // NAYI API SE DATA FETCH KAREIN WITH KEY
      const apiUrl = `https://ox.taitaninfo.workers.dev/?mobile=${number}`;
      
      const response = await axios.get(apiUrl, {
        headers: {
          'key': 'xinroxbhaiya'
        }
      });
      
      res.status(200).json({
        success: true,
        number: number,
        data: response.data,
        fetchedAt: new Date().toISOString(),
        source: 'ox.taitaninfo.workers.dev'
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
