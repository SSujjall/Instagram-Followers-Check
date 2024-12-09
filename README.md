
# Instagram Non-Follower Checker  

This web application helps users identify Instagram accounts that do not follow them back. The backend is developed in .NET 8 (Web API), while the frontend uses React.  

## Features  
- Fetch "Followers" and "Following" data from Instagram.  
- Compare the lists and identify non-followers.  
- Display results in a user-friendly UI.  

## Prerequisites  
Ensure the following are installed on your system:  
- **Node.js** (v20 or later)  
- **.NET SDK** (v8.0 or later)  
- **Git**  
- An Instagram account for fetching data.  

---

## Getting Instagram Data  

### Steps to Download Followers and Following Data:  
Instagram provides an option to download your account data, including "Followers" and "Following" lists. Here's how:  

1. **Request Your Data**  
   - Open the Instagram app or go to the [Instagram website](https://www.instagram.com).  
   - Navigate to **Settings > Privacy and Security > Data Download**.  
   - Request a copy of your data. Instagram will email you a download link.
   - NOTE: You need to download the data in json format.

2. **Download and Extract the Data**  
   - Once you receive the email, download the ZIP file and extract its contents.  
   - Locate the `followers.json` and `following.json` files in the extracted folder.  

3. **Provide JSON Files**  
   - Use these JSON files as input for the backend API.  

---

## Project Structure  

```
root  
│  
├── InstaFollow.API/            # .NET Web API Backend  
├── InstaFollow.FrontEnd/       # React Frontend  
└── InstaFollow.sln             # Solution for backend project.   
```  

---

## Backend Setup (Web API)  

### Prerequisites  
- .NET SDK 8.0+  
- Any IDE that supports .NET (e.g., Visual Studio, JetBrains Rider, or Visual Studio Code).  

### Steps to Run the Backend  

1. **Clone the Repository**  
   ```bash  
   git clone <repository-url>  
   cd backend  
   ```  

2. **Restore Dependencies**  
   ```bash  
   dotnet restore  
   ```  

3. **Run the Application**  
   ```bash  
   dotnet run  
   ```

4. **Test the API**  
   Use tools like [Postman](https://www.postman.com) or [cURL](https://curl.se/) to test the API.  

---

## Frontend Setup (React)  

### Prerequisites  
- Node.js and npm (or Yarn) installed.  

### Steps to Run the Frontend  

1. **Navigate to the Frontend Folder**  
   ```bash  
   cd frontend  
   ```  

2. **Install Dependencies**  
   ```bash  
   npm install  
   ```  

3. **Run the Application**  
   ```bash  
   npm start  
   ```  
   The React app will be available at `http://localhost:3000`.  

---

## Usage  

1. **Upload JSON Data**  
   - Go to the React app.  
   - Upload the `followers.json` and `following.json` files when prompted.  

2. **View Results**  
   - The app will display a list of users who do not follow you back.  

---

## Technologies Used  
- **Backend**: .NET 8 (Web API)  
- **Frontend**: React with TypeScript  
- **API Testing**: Postman  

--- 

## Contact  
For any queries or issues, feel free to reach out:  
- Email: [Your Email]  
- GitHub: [Your GitHub Profile]  
