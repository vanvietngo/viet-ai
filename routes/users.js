const express = require('express');
const { AzureOpenAI } = require('openai');
const { DefaultAzureCredential, getBearerTokenProvider } = require('@azure/identity');
require('dotenv').config();

const router = express.Router();
const azureSearchEndpoint = process.env["AZURE_SEARCH_ENDPOINT"];
const deployment = process.env["AZURE_DEPLOYMENT_NAME"] || "gpt-4-1106-preview";
const apiVersion = "2024-05-01-preview";

router.get('/open-ai', async function (req, res) {
  const chat_prompt = [
    {
      role: "system",
      content: "Translate text from one language to another while maintaining its original meaning, tone, and structure."
    },
    {
      role: "user",
      content: "Toi yeu VietNam"
    },
  ];

  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), "https://cognitiveservices.azure.com/.default");
  const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });

  try {
    const events = await client.chat.completions.create({
      stream: true,
      messages: chat_prompt,
      max_tokens: 128,
      model: deployment,
    });

    res.setHeader('Content-Type', 'text/plain');
    for await (const event of events) {
      for (const choice of event.choices) {
        res.write(choice.delta?.content || '');
      }
    }
    res.end();
  } catch (error) {
    console.error('Error during OpenAI request:', error);
    res.status(500).json({ error: 'Failed to process the OpenAI request.' });
  }
});

module.exports = router;
