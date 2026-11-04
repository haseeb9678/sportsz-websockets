# 🏆 SportZ – Real-Time Sports Updates

SportZ is a real-time sports updates application built to explore and implement WebSocket communication from scratch. It provides a foundation for delivering live sports information, including cricket and basketball updates, with minimal latency.

The project focuses on understanding how real-time systems work internally, implementing WebSocket communication, and exploring concepts such as Pub/Sub architecture and Ping-Pong (heartbeat) mechanisms.

## 🚀 Features

- **Real-Time Communication:** Uses WebSockets to exchange data between clients and servers.
- **Pub/Sub Architecture:** Implements Publisher-Subscriber messaging for distributing real-time events.
- **Ping-Pong Mechanism:** Maintains connection health through heartbeat messages.
- **PostgreSQL Database:** Stores application data using a relational database.
- **Drizzle ORM:** Handles database schemas, queries, and database operations.
- **React Frontend:** Minimal frontend for visualizing real-time updates and application functionality.
- **Event-Based Communication:** Handles real-time events and message distribution.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| WebSockets | Real-time bidirectional communication |
| React.js | Frontend development |
| Node.js | Backend runtime |
| PostgreSQL | Relational database |
| Drizzle ORM | Database queries and schema management |
| JavaScript | Application development |

## 🧠 What I Learned

This project was developed as a hands-on learning experience to understand real-time communication from the fundamentals.

- Understanding WebSockets from scratch.
- Establishing and managing WebSocket connections.
- Sending and receiving real-time messages.
- Implementing Pub/Sub architecture.
- Understanding Publisher and Subscriber communication.
- Implementing Ping-Pong heartbeat mechanisms.
- Managing real-time events and connections.
- Integrating PostgreSQL with Drizzle ORM.
- Connecting a React frontend with a real-time backend.

## 🏗️ Architecture Overview

The application follows a real-time communication approach:

1. The React frontend establishes a WebSocket connection with the backend.
2. The backend manages active WebSocket connections.
3. Publishers generate events and publish messages.
4. Subscribers receive relevant messages through the Pub/Sub mechanism.
5. Ping-Pong messages help monitor connection health.
6. PostgreSQL stores the application's persistent data through Drizzle ORM.

## ⚙️ Installation & Setup

**1. Clone the repository**

```bash
git clone YOUR_REPOSITORY_URL
cd SportZ
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Create a `.env` file in the backend directory (adjust according to your project structure).

```env
DATABASE_URL=your_postgresql_connection_string
PORT=3000
```

**4. Set up the database**

Run your Drizzle migrations using your configured scripts.

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

**5. Start the application**

Use the development scripts configured in your project.

```bash
npm run dev
```

## 🎯 Project Purpose

SportZ is primarily a project-based learning initiative focused on understanding how real-time communication systems work under the hood rather than relying entirely on pre-built real-time libraries.

It helped me build a practical understanding of WebSockets, message broadcasting, connection management, Pub/Sub patterns, and backend database integration.

## 👨‍💻 Developer

**Haseeb Ali**

Computer Science Student | Full Stack Developer

---

⭐ If you find this project interesting, feel free to explore the repository!
