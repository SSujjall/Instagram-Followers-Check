import React, { useState } from 'react';
import { fetchUsersNotFollowingYou } from '../services/Api'; // Import the API function

// Define types
interface User {
  username: string;
  profileLink: string;
}

interface ApiResponse {
  notFollowingBack: User[];
  counts: number;
}

const Index = () => {
  const [followersFile, setFollowersFile] = useState<File | null>(null); // Store the followers file
  const [followingFile, setFollowingFile] = useState<File | null>(null); // Store the following file
  const [users, setUsers] = useState<User[]>([]); // Store the users data with specific type
  const [counts, setCounts] = useState<number>(0); // Store the counts

  // Handle file input for followers file
  const handleFollowersFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFollowersFile(event.target.files[0]);
    }
  };

  // Handle file input for following file
  const handleFollowingFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFollowingFile(event.target.files[0]);
    }
  };

  // Fetch data when both files are selected
  const handleSubmit = async () => {
    if (followersFile && followingFile) {
      try {
        const data: ApiResponse = await fetchUsersNotFollowingYou(followersFile, followingFile);
        setUsers(data.notFollowingBack); // Set the users data
        setCounts(data.counts); // Set the counts
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      alert('Please select both files.');
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-slate-200 xl:w-3/5 w-4/5 h-5/6 rounded-xl shadow-md p-5">
        <div className="upper-div flex md:flex-row flex-col md:gap-0 gap-2 justify-between">
          <div className="flex flex-col">
            <label>Followers List:</label>
            <input
              type="file"
              accept=".json"
              onChange={handleFollowersFileChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Following List:</label>
            <input
              type="file"
              accept=".json"
              onChange={handleFollowingFileChange}
            />
          </div>
        </div>

        <div className="buttons-div mt-4 flex flex-row justify-evenly">
          <button
            onClick={handleSubmit}
            className="border border-black w-2/5 py-1 rounded bg-black text-white hover:bg-slate-700 transition-all duration-300"
          >
            Submit
          </button>
        </div>

        <div className="lower-div border mt-4">
          <div>
            <h1 className="text-center lg:text-2xl font-semibold">Followers Not Following You Back</h1>
            <p className="text-center">Total Count: {counts}</p>
          </div>

          <div className="border border-slate-400 text-sm xl:text-base  rounded-md overflow-y-auto mt-4 max-h-80 md:max-h-96 custom-scrollbar">
            {/* max-h-96 limits the table height */}
            <table className="w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Username</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700 border-l border-black">Link</th> {/* Added border-l here */}
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-t border-black hover:bg-gray-50">
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2 border-l border-black">
                      <a href={user.profileLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        {user.profileLink}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
