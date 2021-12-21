using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace HaloIntegration.Controllers
{
    [Route("api/service-record")]
    [ApiController]
    public class ServiceRecordController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private BaseHttpClient _httpClient;

        public ServiceRecordController(IConfiguration configuration)
        {
            _configuration = configuration;
            string bearerToken = _configuration.GetConnectionString("BearerToken");
            _httpClient = new BaseHttpClient(bearerToken);
        }

        [HttpGet]
        public async Task<JsonResult> Get(string gamertag, string? experience="", string? playlist="")
        {
            string requestUrl = _configuration.GetConnectionString("ApiUrl") + "/stats/service-record/";
            requestUrl = requestUrl + string.Format("?gamertag={0}", gamertag);

            if (!string.IsNullOrEmpty(experience) && !string.IsNullOrEmpty(playlist))
                requestUrl = requestUrl + string.Format("&experience={0}&playlist={1}", experience, playlist);
            else if (!string.IsNullOrEmpty(experience) && string.IsNullOrEmpty(playlist))
                requestUrl = requestUrl + string.Format("&experience={0}", experience);
            else if (string.IsNullOrEmpty(experience) && !string.IsNullOrEmpty(playlist))
                requestUrl = requestUrl + string.Format("&playlist={0}", playlist);

            var streamTask = _httpClient.CreateAndSendRequest(requestUrl);
            var serviceRecordOfGamertag = await JsonSerializer.DeserializeAsync<Object>(await streamTask);

            return new JsonResult(serviceRecordOfGamertag);
        }
    }
}
