import base64
from openai import OpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

endpoint = "https://clase4-envivo.services.ai.azure.com/openai/v1"
deployment_name = "FLUX.1-Kontext-pro"
token_provider = get_bearer_token_provider(DefaultAzureCredential(), "https://ai.azure.com/.default")

client = OpenAI(
    base_url=endpoint,
    api_key=token_provider
)

img = client.images.generate(
    model=deployment_name,
    prompt="Crear una imagen de un bebe cocodrillo tierno",
    n=1,
    size="1024x1024",
)

image_bytes = base64.b64decode(img.data[0].b64_json)
with open("output2.png", "wb") as f:
    f.write(image_bytes)
