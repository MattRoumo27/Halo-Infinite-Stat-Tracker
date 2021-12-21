namespace HaloIntegration.Models
{

    public class CSRSRecord
    {
        public CSRSData[] data { get; set; }
        public CSRSAdditional additional { get; set; }
    }

    public class CSRSAdditional
    {
        public string gamertag { get; set; }
        public int season { get; set; }
    }

    public class CSRSData
    {
        public string queue { get; set; }
        public string input { get; set; }
        public CSRSResponse response { get; set; }
    }

    public class CSRSResponse
    {
        public CSRSCurrent current { get; set; }
        public CSRSSeason season { get; set; }
        public CSRSAll_Time all_time { get; set; }
    }

    public class CSRSCurrent
    {
        public int value { get; set; }
        public int measurement_matches_remaining { get; set; }
        public string tier { get; set; }
        public int tier_start { get; set; }
        public int sub_tier { get; set; }
        public string next_tier { get; set; }
        public int next_tier_start { get; set; }
        public int next_sub_tier { get; set; }
        public int initial_measurement_matches { get; set; }
        public string tier_image_url { get; set; }
    }

    public class CSRSSeason
    {
        public int value { get; set; }
        public int measurement_matches_remaining { get; set; }
        public string tier { get; set; }
        public int tier_start { get; set; }
        public int sub_tier { get; set; }
        public string next_tier { get; set; }
        public int next_tier_start { get; set; }
        public int next_sub_tier { get; set; }
        public int initial_measurement_matches { get; set; }
        public string tier_image_url { get; set; }
    }

    public class CSRSAll_Time
    {
        public int value { get; set; }
        public int measurement_matches_remaining { get; set; }
        public string tier { get; set; }
        public int tier_start { get; set; }
        public int sub_tier { get; set; }
        public string next_tier { get; set; }
        public int next_tier_start { get; set; }
        public int next_sub_tier { get; set; }
        public int initial_measurement_matches { get; set; }
        public string tier_image_url { get; set; }
    }
}

