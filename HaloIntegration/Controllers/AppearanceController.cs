using Microsoft.AspNetCore.Mvc;
using HaloIntegration.Models;
using System.Text.Json;

namespace HaloIntegration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppearanceController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private BaseHttpClient _httpClient;

        public AppearanceController(IConfiguration configuration)
        {
            _configuration = configuration;
            string bearerToken = _configuration.GetConnectionString("BearerToken");
            _httpClient = new BaseHttpClient(bearerToken);
        }

        [HttpGet]
        public async Task<JsonResult> Get(string gamertag)
        {
            string requestUrl = string.Format(_configuration.GetConnectionString("ApiUrl") + "/appearance/?gamertag={0}", gamertag);

            var streamTask = _httpClient.CreateAndSendRequest(requestUrl);
            var appearanceOfQueriedGamertag = await JsonSerializer.DeserializeAsync<Object>(await streamTask);

            return new JsonResult(appearanceOfQueriedGamertag);
        }
    }
}
