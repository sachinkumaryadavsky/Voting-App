Voting App
Description

The Voting App is an online platform for casting and managing votes in an election. It allows users to vote for their preferred candidates, and administrators can register candidates and view vote counts. Each user can cast only one vote, and admins are restricted from voting.

This application includes:

    User Authentication using JWT (JSON Web Tokens).
    Admin Control for registering candidates.
    Voting Mechanism where each user can vote for one candidate.
    Vote Counting that sorts candidates based on the number of votes they have received.
Features

    User Authentication: Sign in to securely vote using JWT.
    Vote Casting: Users can vote for a candidate.
    Vote Count: Displaying vote counts in real-time for each candidate.
    Admin Role Management: Admins can register new candidates.
    Single Vote: Ensures each user can only cast one vote.
    Vote Sorting: Candidates are listed by the total number of votes in descending order.
Tech Stack

    Backend:
        Node.js: Server-side JavaScript runtime.
        Express.js: Framework for building RESTful APIs.
        MongoDB: NoSQL database to store user and candidate data.
        Mongoose: MongoDB ODM for interacting with the database.
        JWT: Token-based authentication.
    Version Control: Git, GitHub for project versioning and collaboration.
API Endpoints
1. Register a Candidate

    URL: /api/candidate/register
    Method: POST
    Access: Admin
    Description: Allows an admin to register a new candidate.

2. Cast a Vote

    URL: /api/candidate/vote/cast
    Method: PUT
    Access: Authenticated Users
    Description: Authenticated users can vote for a candidate.
3. View Vote Counts

    URL: /api/candidate/vote/count
    Method: GET
    Access: Public
    Description: Fetches the list of candidates sorted by their vote count in descending order.
