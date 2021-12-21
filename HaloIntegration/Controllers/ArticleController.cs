using Microsoft.AspNetCore.Mvc;
using HaloIntegration.Models;
using System.Text.Json;
using System.Linq;

namespace HaloIntegration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private BaseHttpClient _httpClient;

        public ArticleController(IConfiguration configuration)
        {
            _configuration = configuration;
            string bearerToken = _configuration.GetConnectionString("BearerToken");
            _httpClient = new BaseHttpClient(bearerToken);
        }

        [HttpGet]
        public async Task<JsonResult> Get()
        {
            var articles = await GetAllArticlesFromAutoCodeApiAsync();

            if (articles != null)
                return new JsonResult(articles);
            else
                return new JsonResult(null);
        }

        [HttpGet("{articleId}")]
        public async Task<JsonResult> GetArticle(string articleId)
        {
            var articles = await GetAllArticlesFromAutoCodeApiAsync();

            // Look through articles for the one with the correct title
            if (articles != null && articles.data != null)
            {
                foreach (var article in articles.data)
                {
                    if (article.title != null)
                    {
                        string articleTitle = String.Concat(article.title.Where(c => !Char.IsWhiteSpace(c))).ToLower();
                        if (articleTitle == articleId)
                        {
                            return new JsonResult(article);
                        }
                    }
                }
            }

            return new JsonResult(null);
        }

        [NonAction]
        private async Task<Articles> GetAllArticlesFromAutoCodeApiAsync()
        {
            string requestUrl = _configuration.GetConnectionString("ApiUrl") + "/articles/";

            var streamTask = _httpClient.CreateAndSendRequest(requestUrl);
            var articles = await JsonSerializer.DeserializeAsync<Articles>(await streamTask);

            return articles;
        }
    }
}
