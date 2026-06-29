export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
        return res.status(200).end();
  }

  if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
  }

  const AT_TOKEN = process.env.AIRTABLE_TOKEN;
    const AT_BASE  = process.env.AIRTABLE_BASE  || 'apprewdegjHeK2AKx';
    const AT_TABLE = process.env.AIRTABLE_TABLE || 'tblwEFSoLzwXwM9pM';

  if (!AT_TOKEN) {
        return res.status(500).json({ error: 'Airtable token not configured' });
  }

  try {
        const response = await fetch(`https://api.airtable.com/v0/${AT_BASE}/${AT_TABLE}`, {
                method: 'POST',
                headers: {
                          'Authorization': 'Bearer ' + AT_TOKEN,
                          'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body)
        });

      const data = await response.json();
        return res.status(response.status).json(data);
  } catch (err) {
        return res.status(500).json({ error: 'Airtable request failed' });
  }
}
