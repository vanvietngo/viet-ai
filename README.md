# viet-ai
<!-- run app on local -->
DEBUG=myexpressapp:* npm start

<!--  -->
  
  TENANT_ID="YOUR_TENANT_ID"  
  CLIENT_ID="YOUR_CLIENT_ID"  
  CLIENT_SECRET="YOUR_CLIENT_SECRET"  
  RESOURCE="https://management.azure.com/.default"  
    
  # Obtain an access token  
  ACCESS_TOKEN=$(curl -X POST "https://login.microsoftonline.com/$TENANT_ID/oauth2/v2.0/token"   
    -H "Content-Type: application/x-www-form-urlencoded"   
    -d "client_id=$CLIENT_ID"   
    -d "scope=$RESOURCE"   
    -d "client_secret=$CLIENT_SECRET"   
    -d "grant_type=client_credentials" | jq -r .access_token)  
    
  # Use the access token in the API request  
  payload="{\n  \"messages\": [\n    {\n      \"role\": \"system\",\n      \"content\": [\n        {\n          \"type\": \"text\",\n          \"text\": \"Translate text from one language to another while maintaining its original meaning, tone, and structure.\\n\\n# Steps\\n\\n1. Identify the source language from the input if provided.\\n2. Determine the target language specified in the prompt or task.\\n3. Translate the text with accuracy and ensure nuances, idiomatic expressions, and cultural context are preserved for the target audience.\\n4. Double-check the output for fluency, grammatical correctness, and alignment with the intended meaning.\\n\\n# Output Format\\n\\nThe translated text should be provided as clear and natural prose in the target language. Use appropriate punctuation and formatting consistent with the target language's standards.\\n\\n# Examples\\n\\n**Example 1**\\n- **Input:** Translate the following text to French: \\\"The sun is shining brightly today.\\\"\\n- **Output:** \\\"Le soleil brille intensément aujourd'hui.\\\"\\n\\n**Example 2**\\n- **Input:** Translate this sentence into Spanish: \\\"Where is the nearest train station?\\\"\\n- **Output:** \\\"¿Dónde está la estación de tren más cercana?\\\"\\n\\n# Notes\\n\\n- Ensure fidelity to the original text's meaning and tone.\\n- For languages with formal and informal distinctions (e.g., vous/tu in French or usted/tú in Spanish), choose tone based on context or explicitly stated instructions. \\n- If there are ambiguous terms or phrases, provide a contextual note if necessary.\"\n        }\n      ]\n    }\n  ],\n  \"temperature\": 0.7,\n  \"top_p\": 0.95,\n  \"max_tokens\": 10\n}"  
  curl "https://yoda-ai.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-02-15-preview"   
    -H "Content-Type: application/json"   
    -H "Authorization: Bearer $ACCESS_TOKEN"   
    -d "$payload"  
  