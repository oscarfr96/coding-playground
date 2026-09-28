// -------------------- CLASE 1 -------------------
/*using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Azure;
using Azure.AI.OpenAI;
using OpenAI.Chat;

class Program
{
    static async Task Main(string[] args)
    {
        // Cargar variables de entorno desde el archivo .env
        DotNetEnv.Env.Load();
        var endpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT")
            ?? throw new ArgumentNullException("AZURE_OPENAI_ENDPOINT");
        var apiKey = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY")
            ?? throw new ArgumentNullException("AZURE_OPENAI_API_KEY");
        var deploymentName = Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT_NAME")
            ?? throw new ArgumentNullException("AZURE_OPENAI_DEPLOYMENT_NAME");
        var searchEndpoint = Environment.GetEnvironmentVariable("AZURE_SEARCH_ENDPOINT")
            ?? throw new ArgumentNullException("AZURE_SEARCH_ENDPOINT");
        var searchKey = Environment.GetEnvironmentVariable("AZURE_SEARCH_KEY")
            ?? throw new ArgumentNullException("AZURE_SEARCH_KEY");
        var searchIndex = Environment.GetEnvironmentVariable("AZURE_SEARCH_INDEX")
            ?? throw new ArgumentNullException("AZURE_SEARCH_INDEX");


        //Creo mi obj Cliente
        AzureOpenAIClient client = new AzureOpenAIClient(new Uri(endpoint), new AzureKeyCredential(apiKey));

        //Obtener el cliente
        ChatClient chatClient = client.GetChatClient(deploymentName);

        //Configurar los mensajes
        var messages = new List<ChatMessage>
        {
            new SystemChatMessage("Eres un asistente traductor. Traduce todos mis mensajes a inglés con slangs callejeros."),
            new UserChatMessage("Hola, ¿cómo estás?")
        };

        //Llamar de forma asincrona al modelo
        ChatCompletion completion = await chatClient.CompleteChatAsync(messages);

        //Imprimir la respuesta
        Console.WriteLine("Respuesta del modelo:");
        Console.WriteLine(completion.Content[0].Text);

    }
}
*/

// -------------------- CLASE 2 -------------------

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Azure;
using Azure.AI.OpenAI;
using Azure.AI.OpenAI.Chat;
using OpenAI.Chat;

class AzureOpenAIRagDemo
{
    static async Task Main(string[] args)
    {
        // 1. Cargar las variables definidas en el archivo .env
        DotNetEnv.Env.Load();

        // 2. Obtener los valores desde las variables de entorno
        string azureOpenAiEndpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") 
            ?? throw new InvalidOperationException("Falta AZURE_OPENAI_ENDPOINT en el .env");
        string azureOpenAiKey = Environment.GetEnvironmentVariable("AZURE_OPENAI_KEY") 
            ?? throw new InvalidOperationException("Falta AZURE_OPENAI_KEY en el .env");
        string deploymentName = Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT") 
            ?? "gpt-4o";

        string searchEndpoint = Environment.GetEnvironmentVariable("AZURE_SEARCH_ENDPOINT") 
            ?? throw new InvalidOperationException("Falta AZURE_SEARCH_ENDPOINT en el .env");
        string searchKey = Environment.GetEnvironmentVariable("AZURE_SEARCH_KEY") 
            ?? throw new InvalidOperationException("Falta AZURE_SEARCH_KEY en el .env");
        string searchIndex = Environment.GetEnvironmentVariable("AZURE_SEARCH_INDEX") 
            ?? throw new InvalidOperationException("Falta AZURE_SEARCH_INDEX en el .env");

        // 3. Inicializar el cliente de Azure OpenAI
        AzureOpenAIClient azureClient = new(new Uri(azureOpenAiEndpoint), new AzureKeyCredential(azureOpenAiKey));
        ChatClient chatClient = azureClient.GetChatClient(deploymentName);

        // 4. Configurar Azure AI Search como fuente de datos (RAG)
        #pragma warning disable AOAI001 // Desactiva la advertencia de API experimental
        AzureSearchChatDataSource searchDataSource = new()
        {
            Endpoint = new Uri(searchEndpoint),
            IndexName = searchIndex,
            Authentication = DataSourceAuthentication.FromApiKey(searchKey)
        };

        // Enlazar la fuente de datos a través de la propiedad DataSources
        ChatCompletionOptions options = new();
        options.AddDataSource(searchDataSource);
        #pragma warning restore AOAI001

        // 5. Definir los mensajes
        var messages = new List<ChatMessage>
        {
            new SystemChatMessage("Eres un asistente que responde preguntas basándose exclusivamente en los documentos internos proporcionados. Al finalizar, siempre termina con \"Ha sido un placer muy señor mio\""),
            new UserChatMessage("¿politicas")
        };

        // 6. Realizar la solicitud asíncrona con RAG habilitado
        ChatCompletion completion = await chatClient.CompleteChatAsync(messages, options);

        // 7. Imprimir la respuesta generada
        Console.WriteLine(completion.Content[0].Text);
    }
}