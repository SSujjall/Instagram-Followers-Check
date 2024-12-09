using InstaFollow.Helpers;  // Include the helper namespace
using InstaFollow.Models.InputModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace InstaFollow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {
        private FollowersData followersData = new FollowersData();
        private FollowingData followingData = new FollowingData();

        [HttpPost("users-notfollowing-you")]
        public async Task<IActionResult> UsersNotFollowingYou(IFormFile followersList, IFormFile followingList)
        {
            if (followersList == null || followersList.Length == 0)
                return BadRequest("The followers list file is missing or empty.");

            if (followingList == null || followingList.Length == 0)
                return BadRequest("The following list file is missing or empty.");

            try
            {
                // Use FileHelper to handle file reading and deserialization
                followersData = await FileHelper.GetFollowersDataAsync(followersList);
                followingData = await FileHelper.GetFollowingDataAsync(followingList);

                if (followersData == null)
                    return BadRequest("Invalid JSON content in followers list.");
                if (followingData == null)
                    return BadRequest("Invalid JSON content in following list.");

                // Extract followers and following data
                var followersSet = followersData.string_list_data
                    .Select(data => data.value)
                    .ToHashSet(StringComparer.OrdinalIgnoreCase); // Case-insensitive comparison

                var followingsList = followingData.relationships_following
                    .SelectMany(r => r.string_list_data)
                    .ToList();

                // Users not following you back (return username and profile link)
                var notFollowingBack = followingsList
                    .Where(following => !followersSet.Contains(following.value))
                    .Select(following => new
                    {
                        Username = following.value,
                        ProfileLink = following.href
                    })
                    .ToList();

                return Ok(new
                {
                    NotFollowingBack = notFollowingBack,
                    Counts = notFollowingBack.Count
                });
            }
            catch (JsonSerializationException ex)
            {
                return BadRequest($"Invalid JSON format: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { ex.Message, ex.StackTrace });
            }
        }
    }
}
