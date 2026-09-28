from azure.identity import DefaultAzureCredential, get_bearer_token_provider
from openai import OpenAI

endpoint = "https://oscarmodeloslab01.services.ai.azure.com/openai/v1"
deployment_name = "gpt-5.4"
token_provider = get_bearer_token_provider(DefaultAzureCredential(), "https://ai.azure.com/.default")

client = OpenAI(
    base_url=endpoint,
    api_key=token_provider
)

response = client.responses.create(
    model=deployment_name,
    input="What is the capital of France?",
)

print(f"answer: {response.output[0]}")
