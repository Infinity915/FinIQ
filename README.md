## 💡 Inspiration

We’ve all been told that managing money is important — but most of us were never actually taught how. From students to young professionals, many people find finance confusing, intimidating, or just plain boring. Most online resources are filled with jargon, hidden behind paywalls, or lack structure.

We built **FinIQ** to change that. Our mission is to make financial education simple, engaging, and accessible to everyone — no ads, no logins, no catch. Just practical, structured content that anyone can understand.

---

## 🚀 What it does

**FinIQ** is a financial literacy platform that offers:

- 📚 Structured modules across **three levels**: beginner, intermediate, and advanced
- 🧠 **Interactive quizzes** to test understanding for each topic
- 📝 A global **notes app** that users can access from anywhere in the app
- 🌓 A clean, toggleable **light/dark theme**
- 🔐 **Google OAuth login** with personalized user profiles
- 📷 Multimedia-based learning with images and videos

It’s a full-stack platform designed to teach real-world finance in a clear and hands-on way.

---

## 🛠️ How we built it

We used a modern full-stack approach:

- **Frontend**: `React.js` with `React Router` for dynamic routing and smooth user experience
- **Backend**: `Node.js` and `Express` with `MongoDB` for storing user data, modules, and quizzes
- **Authentication**: Integrated **Google OAuth** for secure login
- **Theming & State**: Used `React Context API` and `localStorage` to manage global theme and user notes
- **Routing**: Created dynamic routes like `/levels/:levelId/topics/:topicId` using custom IDs
- **Quiz System**: Developed a smart quiz engine that locks answers after submission — even on refresh

---

## 🧱 Challenges we ran into

- Making quiz answers **uneditable and persistent**, even after refresh or revisit
- Ensuring the **notes app** worked globally across pages and persisted user input
- Designing a **responsive UI** that looks clean and consistent in both themes
- Managing static image uploads without bloating the GitHub repo
- Building and integrating multiple features (auth, quizzes, themes, notes) within the time constraints of a hackathon

---

## 🏆 Accomplishments that we're proud of

- Creating a **modular, scalable platform** that covers educational content, testing, and personalization
- Building a **responsive UI** with a smooth light/dark mode experience
- Implementing a **fully functional quiz system** with visual feedback and locked states
- Enabling **note-taking** across the platform — enhancing real-time learning
- Making the platform **truly accessible** — with no ads, logins required only for personalization, and everything structured clearly

---

## 🌱 What we learned

- Managing **global state and themes** using React Context and hooks
- Structuring a full-stack app with **dynamic content and persistent state**
- Writing **robust quiz logic** that handles multiple edge cases
- Syncing frontend and backend to create a seamless user experience
- Balancing feature richness with a clean, intuitive UI
- Collaborating effectively under pressure while maintaining code quality

---

## 🔮 What's next for FinIQ

We’re just getting started! Here's what we plan to add next:

- 🧾 **Progress tracking** so users can resume from where they left off
- 🏅 **Certificates** for completing levels or passing quizzes
- 🌐 **Regional language support** to make content even more accessible
- 📈 A dashboard to visualize learning stats
- 💬 Discussion threads or community Q&A for peer learning

FinIQ is our way of bringing financial knowledge to everyone — and we're excited to keep building and growing it beyond the hackathon!
