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

      // CUSTOM RESPONSE
      res.status(200).json({
        success: true,
        number: number,
        data: {
          carrier: "Unknown Carrier",
          location: "India",
          valid: true,
          type: "mobile"
        },
        fetchedAt: new Date().toISOString(),
        note: "Source API is down, using custom response"
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server error'
      });
    }
  } else {
    res.status(405).json({
      success: false,
      error: 'Only GET method allowed'
    });
  }
};
