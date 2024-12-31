
import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import "@azure/openai/types";

// Set AZURE_OPENAI_ENDPOINT to the endpoint of your
// Azure OpenAI resource. You can find this in the Azure portal.
import "dotenv/config";

// Your Azure Cognitive Search endpoint, and index name
const azureSearchEndpoint = process.env["AZURE_SEARCH_ENDPOINT"] || "https://yoda-ai.openai.azure.com/";
// const azureSearchIndexName = process.env["AZURE_SEARCH_INDEX"] || "gpt-4o";
const deployment = "gpt-4o"




export async function openai() {
    chat_prompt = [
      {
          "role": "system",
          "content": [
              {
                  "type": "text",
                  "text": "Translate text from one language to another while maintaining its original meaning, tone, and structure.\n\n# Steps\n\n1. Identify the source language from the input if provided.\n2. Determine the target language specified in the prompt or task.\n3. Translate the text with accuracy and ensure nuances, idiomatic expressions, and cultural context are preserved for the target audience.\n4. Double-check the output for fluency, grammatical correctness, and alignment with the intended meaning.\n\n# Output Format\n\nThe translated text should be provided as clear and natural prose in the target language. Use appropriate punctuation and formatting consistent with the target language's standards.\n\n# Examples\n\n**Example 1**\n- **Input:** Translate the following text to French: \"The sun is shining brightly today.\"\n- **Output:** \"Le soleil brille intensément aujourd'hui.\"\n\n**Example 2**\n- **Input:** Translate this sentence into Spanish: \"Where is the nearest train station?\"\n- **Output:** \"¿Dónde está la estación de tren más cercana?\"\n\n# Notes\n\n- Ensure fidelity to the original text's meaning and tone.\n- For languages with formal and informal distinctions (e.g., vous/tu in French or usted/tú in Spanish), choose tone based on context or explicitly stated instructions. \n- If there are ambiguous terms or phrases, provide a contextual note if necessary."
              }
          ]
      },
      // # {
      // #     "role": "user",
      // #     "content": [
      // #         {
      // #             "type": "text",
      // #             "text": "\n"
      // #         }
      // #     ]
      // # },
      // # {
      // #     "role": "assistant",
      // #     "content": [
      // #         {
      // #             "type": "text",
      // #             "text": "It seems there was no input text provided for translation"
      // #         }
      // #     ]
      // # },
      {
          "role": "user",
          "content": [
              {
                  "type": "text",
                  "text": "Toi yeu VietNam"
              }
          ]
      },
      // # {
      // #     "role": "assistant",
      // #     "content": [
      // #         {
      // #             "type": "text",
      // #             "text": "Translate the following text to English: \"hei hvordan"
      // #         }
      // #     ]
      // # }
  ] 
      
  // # Include speech result if speech is enabled  
  messages = chat_prompt 
  
    console.log("== Azure On Your Data Sample ==");
  
    const scope = "https://cognitiveservices.azure.com/.default";
    const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
    // const deployment = "gpt-4-1106-preview";
    const apiVersion="2024-05-01-preview";
    const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });
    const events = await client.chat.completions.create({
      stream: true,
      messages: messages,
      max_tokens: 128,
      model: deployment,
      // data_sources: [
      //   {
      //     type: "azure_search",
      //     parameters: {
      //       endpoint: azureSearchEndpoint,
      //       // index_name: azureSearchIndexName,
      //       authentication: {
      //         type: "system_assigned_managed_identity",
      //       },
      //     },
      //   },
      // ],
    });
  
    for await (const event of events) {
      for (const choice of event.choices) {
        console.log(choice.delta?.content);
      }
    }
  }
  
  