using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;


namespace HaloIntegration
{
    public class BaseHttpClient
    {
        private HttpClient _httpClient;
        private string _bearerToken;

        public BaseHttpClient(string bearerToken)
        {
            _httpClient = new HttpClient();
            _bearerToken = bearerToken;
        }

        public Task<Stream> CreateAndSendRequest(string url)
        {
            this.CreateRequest();
            return _httpClient.GetStreamAsync(url);
        }

        private void CreateRequest()
        {
            _httpClient.DefaultRequestHeaders.Accept.Clear();
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _bearerToken);
        }
    }
}
