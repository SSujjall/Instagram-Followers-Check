import axios from 'axios';

const API_URL = 'https://localhost:7038/api';

export const fetchUsersNotFollowingYou = async (followersFile: File, followingFile: File) => {
  const formData = new FormData();
  
  // Append the files to FormData
  formData.append('followersList', followersFile, followersFile.name);
  formData.append('followingList', followingFile, followingFile.name);

  try {
    const response = await axios.post(`${API_URL}/Main/users-notfollowing-you`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};