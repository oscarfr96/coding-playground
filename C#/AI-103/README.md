# Laboratorios de Azure AI

Prácticas de integración con servicios Azure. La carpeta
`demo2/AzureOpenAIDemo2026/` combina un proyecto de consola C# y scripts Python
independientes; no comparten gestor de dependencias.

## Demo C#

`AzureOpenAIDemo2026.csproj` apunta a **.NET 10**. El programa activo usa Azure OpenAI
y un índice de Azure AI Search para aportar contexto documental.

Desde `demo2/AzureOpenAIDemo2026/`, crea un `.env` local con:

```dotenv
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_KEY=replace-me
AZURE_OPENAI_DEPLOYMENT=your-deployment
AZURE_SEARCH_ENDPOINT=https://your-search.search.windows.net/
AZURE_SEARCH_KEY=replace-me
AZURE_SEARCH_INDEX=your-index
```

```powershell
dotnet build
dotnet run
```

El deployment, el índice y los recursos deben existir en tu suscripción. La carpeta
incluye una primera versión comentada con otros nombres de variables; los de arriba
corresponden al programa activo.

## Scripts Python

`demo.py` usa `openai` y `python-dotenv`, la variable `AZURE_OPENAI_API_KEY` y un
endpoint/deployment definidos en el propio script. Sustituye esos valores por los
de tu laboratorio antes de ejecutarlo. `ejercicios/computer-vision/` contiene
ejercicios adicionales; revisa sus imports y configuración por separado.

Estos laboratorios hacen llamadas a servicios reales y no se validan con la suite
offline del curso de LangChain.

[Volver a C#](../README.md)
