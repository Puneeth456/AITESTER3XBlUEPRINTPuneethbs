import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_EMAIL    = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;

const authHeader = 'Basic ' + Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');

// Proxy all /jira/* requests to Jira
app.all('/jira/*', async (req, res) => {
  const jiraPath = req.params[0];
  const url = `${JIRA_BASE_URL}/rest/api/3/${jiraPath}`;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log('✅ Jira proxy running on http://localhost:3001'));