my-app/
├── client/ (React App)
│   ├── public/             # Static assets (favicon, index.html)
│   ├── src/                # React source code
│   │   ├── assets/         # Images, global styles, fonts
│   │   ├── components/     # Reusable UI (Button, Card, Navbar)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Full page views (Home, Dashboard)
│   │   ├── services/       # API calls using fetch/axios to Node.js
│   │   ├── context/        # React Context for global state
│   │   └── App.js          # Main React component
│   └── package.json
├── server/ (Node.js API)
│   ├── config/             # Database connection strings
│   ├── controllers/        # Logic to handle requests and responses
│   ├── models/             # MySQL schema definitions or ORM models
│   ├── routes/             # Express route definitions
│   ├── middleware/         # Auth, logging, and error handlers
│   ├── scripts/            # Database migrations and seed files (SQL)
│   ├── app.js              # Express app configuration
│   └── server.js           # Server entry point
├── .env                    # Root environment variables (DB_URL, API_KEYS)
├── .gitignore              # Files to ignore (node_modules, .env)
└── README.md               # Project documentation


server side install

npm init -y
npm install cors dotenv bcryptjs jsonwebtoken cookie-parser multer cross-env

npm i mongoose express mongoose
npm i nodemon -D


client side install

npm create vite@latest client
npm install
npm install react-router-dom
npm i axios
npm install tailwindcss @tailwindcss/vite
