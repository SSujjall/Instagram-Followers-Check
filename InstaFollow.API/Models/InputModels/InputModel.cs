namespace InstaFollow.Models.InputModels
{
    public class FollowingData
    {
        public List<RelationshipsFollowing> relationships_following { get; set; }
    }

    public class FollowersData
    {
        public string title { get; set; }
        public List<object> media_list_data { get; set; }
        public List<StringListDatum> string_list_data { get; set; }
    }

    #region Common
    public class RelationshipsFollowing
    {
        public string title { get; set; }
        public List<object> media_list_data { get; set; }
        public List<StringListDatum> string_list_data { get; set; }
    }

    public class StringListDatum
    {
        public string href { get; set; }
        public string value { get; set; }
        public int timestamp { get; set; }
    }
    #endregion
}
