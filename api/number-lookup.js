const axios = require('axios');

module.exports = async (req, res) => {
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
          error: 'Invalid or missing key. Use ?key=xinroxbhaiya'
        });
      }

      if (!number) {
        return res.status(400).json({
          success: false,
          error: 'Number parameter is required. Use &number=9960553267'
        });
      }

      // API se data fetch karein
      const response = await axios.get(`https://number-info-anmol.vercel.app/?number=${number}`);
      
      // Original data se credits hata kar naya data banayein
      const originalData = response.data;
      
      // Naya response banayein without unwanted credits
      const modifiedData = {
        success: true,
        number: number,
        data: originalData.data, // Direct data show karein
        credits: "Owner: loard_x79 | DM for buy API | API by xinrox",
        fetchedAt: new Date().toISOString(),
        source: "number-info-anmol.vercel.app"
      };
      
      res.status(200).json(modifiedData);

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
