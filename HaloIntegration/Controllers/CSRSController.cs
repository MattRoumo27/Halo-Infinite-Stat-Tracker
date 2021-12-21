using Microsoft.AspNetCore.Mvc;
using HaloIntegration.Models;
using System.Text.Json;

namespace HaloIntegration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CSRSController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private BaseHttpClient _httpClient;

        public CSRSController(IConfiguration configuration)
        {
            _configuration = configuration;
            string bearerToken = _configuration.GetConnectionString("BearerToken");
            _httpClient = new BaseHttpClient(bearerToken);
        }

        [HttpGet]
        public async Task<JsonResult> Get(string gamertag, int? season)
        {
            string requestUrl = string.Format(_configuration.GetConnectionString("ApiUrl") + "/stats/csrs/?gamertag={0}", gamertag);

            // Add season to url at some point here

            var streamTask = _httpClient.CreateAndSendRequest(requestUrl);
            var csrsOfGamertag = await JsonSerializer.DeserializeAsync<CSRSRecord>(await streamTask);

            return new JsonResult(csrsOfGamertag);
        }

        [HttpGet]
        [Route("top-rank")]
        public async Task<JsonResult> Get(string gamertag)
        {
            string requestUrl = string.Format(_configuration.GetConnectionString("ApiUrl") + "/stats/csrs/?gamertag={0}", gamertag);

            var streamTask = _httpClient.CreateAndSendRequest(requestUrl);
            var csrsOfGamertag = await JsonSerializer.DeserializeAsync<CSRSRecord>(await streamTask);

            if (csrsOfGamertag == null || csrsOfGamertag.data == null || csrsOfGamertag.data.Length == 0)
                return new JsonResult(null);

            CSRSData? csrsToReturn = csrsOfGamertag.data[0];

            for (int i = 1; i < csrsOfGamertag.data.Length; i++)
            {
                CSRSData csrs = csrsOfGamertag.data[i];
                if (csrs.response.current.value > csrsToReturn.response.current.value)
                    csrsToReturn = csrs;
            }

            return new JsonResult(csrsToReturn);
        }
    }
}
