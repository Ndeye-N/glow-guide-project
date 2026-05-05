# glow-guide-project
# MVP DEMO LINK VIDEO:
https://uncg-my.sharepoint.com/:v:/g/personal/nmndiaye_uncg_edu/IQDap3EjCz9yRa0Qr9bFItkIAQEr_WZkbUrIhj1LAp-Ic6g?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&e=qRuOgh

# Setup instructions
To run this project locally, clone the repository, run npm install to get the dependencies, and start the server with node server.js. Ensure you have your .env file set up with your database connection string.

# Deployed app URL
https://glow-guide-project.onrender.com/login.html

# Reflection write-up
GlowGuide was designed as a lightweight full-stack application using a Vanilla JavaScript frontend and a Node.js/Express backend to prioritize a clean, aesthetic user experience for skincare tracking. I chose PostgreSQL for the database schema because the structured nature of skincare product data (name, brand, and type) benefits from a relational format. One significant technical challenge I overcame was syncing the PUT route; I initially struggled to update multiple database columns simultaneously, but I resolved this by refactoring my SQL queries and utilizing parameterized inputs to ensure data persistence. This project taught me the complexities of the full-stack lifecycle, especially regarding the handshake between frontend fetch requests and backend database operations. In the future, I plan to expand this project by adding expiration date notifications and a routine timer to further assist users with their skincare regimens.