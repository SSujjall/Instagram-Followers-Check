using InstaFollow.Models.InputModels;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;

namespace InstaFollow.Helpers
{
    public static class FileHelper
    {
        // Method to read and deserialize followers data from the file
        public static async Task<FollowersData> GetFollowersDataAsync(IFormFile followersFile)
        {
            if (followersFile == null || followersFile.Length == 0)
                return null;

            using (var stream = followersFile.OpenReadStream())
            using (var reader = new StreamReader(stream))
            {
                string content = await reader.ReadToEndAsync();
                var followersListData = JsonConvert.DeserializeObject<List<FollowersData>>(content);

                if (followersListData != null)
                {
                    return new FollowersData
                    {
                        string_list_data = followersListData
                            .SelectMany(f => f.string_list_data)
                            .ToList()
                    };
                }

                return null;
            }
        }

        // Method to read and deserialize following data from the file
        public static async Task<FollowingData> GetFollowingDataAsync(IFormFile followingFile)
        {
            if (followingFile == null || followingFile.Length == 0)
                return null;

            using (var stream = followingFile.OpenReadStream())
            using (var reader = new StreamReader(stream))
            {
                string content = await reader.ReadToEndAsync();
                return JsonConvert.DeserializeObject<FollowingData>(content);
            }
        }
    }
}
