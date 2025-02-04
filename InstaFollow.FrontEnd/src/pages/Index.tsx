import React, { useState, useEffect } from 'react';
import { fetchUsersNotFollowingYou } from '../services/Api';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net';

interface User {
  username: string;
  profileLink: string;
}

interface ApiResponse {
  notFollowingBack: User[];
  counts: number;
}

const Index = () => {
  const [followersFile, setFollowersFile] = useState<File | null>(null);
  const [followingFile, setFollowingFile] = useState<File | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [counts, setCounts] = useState<number>(0);

  useEffect(() => {
    if (users.length > 0) {
      setTimeout(() => {
        $('#usersTable').DataTable();
      }, 0);
    }
  }, [users]);

  const handleFollowersFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFollowersFile(event.target.files[0]);
    }
  };

  const handleFollowingFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFollowingFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (followersFile && followingFile) {
      try {
        const data: ApiResponse = await fetchUsersNotFollowingYou(followersFile, followingFile);
        setUsers(data.notFollowingBack);
        setCounts(data.counts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      alert('Please select both files.');
    }
  };

  return (
    <div className="container-div h-screen flex justify-center items-center">
      <div className="bg-gray-200 w-full max-w-4xl h-full max-h-[99%] rounded-xl shadow-md pl-5 pr-5 pt-3 flex flex-col">
        <div className="upper-div flex flex-col sm:flex-row md:gap-6 gap-2 justify-between mb-2">
          <div className="flex flex-col w-full min-w-[250px]">
            <label className="font-semibold mb-2">Followers List:</label>
            <input
              type="file"
              accept=".json"
              onChange={handleFollowersFileChange}
              className="p-2 border border-gray-400 rounded"
            />
          </div>
          <div className="flex flex-col w-full min-w-[250px]">
            <label className="font-semibold mb-2">Following List:</label>
            <input
              type="file"
              accept=".json"
              onChange={handleFollowingFileChange}
              className="p-2 border border-gray-400 rounded"
            />
          </div>
        </div>

        <div className="buttons-div flex justify-start">
          <button
            onClick={handleSubmit}
            className="border border-black px-4 py-2 rounded bg-black text-white hover:bg-slate-700 transition-all duration-300"
          >
            Submit
          </button>
        </div>

        <div className="lower-div flex-grow overflow-hidden">
          <div>
            <h1 className="text-center text-xl lg:text-2xl font-semibold">Followers Not Following You Back</h1>
            <p className="text-center text-sm lg:text-base">Total Count: {counts}</p>
          </div>

          <div className="border border-slate-400 rounded-md overflow-y-auto max-h-[85%] sm:max-h-[90%] custom-scrollbar pl-2 pr-2">
            <table id="usersTable" className="display w-full">
              <thead className="bg-gray-300">
                <tr>
                  <th className="px-4 py-2 text-left font-bold text-gray-700">Username</th>
                  <th className="px-4 py-2 text-left font-bold text-gray-700">Profile Link</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-t border-gray-400 hover:bg-gray-50">
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">
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
