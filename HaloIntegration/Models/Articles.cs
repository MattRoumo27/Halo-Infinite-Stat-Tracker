namespace HaloIntegration.Models
{
    public class Articles
    {
        public Article[]? data { get; set; }
        public int count { get; set; }
        public ArticleAdditional? additional { get; set; }
    }

    public class Article
    {
        public string? title { get; set; }
        public string? subtitle { get; set; }
        public string? message { get; set; }
        public string? image_url { get; set; }
    }

    public class ArticleAdditional
    {
        public string? language { get; set; }
    }
}
