export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') return res.status(200).end();
      if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
        const { id } = req.query;
          if (!id) return res.status(400).json({ error: 'No ID' });
            const AT_TOKEN = process.env.AIRTABLE_TOKEN;
              const AT_BASE = process.env.AIRTABLE_BASE || 'apprewdegjHeK2AKx';
                const AT_TABLE = process.env.AIRTABLE_TABLE || 'tblwEFSoLzwXwM9pM';
                  if (!AT_TOKEN) return res.status(500).json({ error: 'Token not configured' });
                    try {
                        const r = await fetch(`https://api.airtable.com/v0/${AT_BASE}/${AT_TABLE}/${encodeURIComponent(id)}`, {
                              headers: { 'Authorization': 'Bearer ' + AT_TOKEN }
                                  });
                                      const data = await r.json();
                                          return res.status(r.status).json(data);
                                            } catch (err) {
                                                return res.status(500).json({ error: 'Failed' });
                                                  }
                                                  }
