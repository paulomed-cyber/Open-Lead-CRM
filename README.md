# 🚀 Open Lead CRM

![Status](https://img.shields.io/badge/Status-Early%20Development-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-0.1.0--alpha-green)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748)

**Open Lead CRM** is a modern, open-source lead management system designed specifically for small agencies, consultants, and service-based businesses. Built with performance and simplicity in mind, it helps you manage your sales pipeline, track follow-ups, and understand your marketing attribution.

> **⚠️ STATUS: EARLY DEVELOPMENT (MVP)**  
> This project is currently in its early stages of development. It is functional as an MVP but should be considered experimental. We welcome contributions and feedback!

---

## 📸 Screenshots

*(MVP in early development)*

| Dashboard | Sales Pipeline |
|-----------|----------------|
| ![Dashboard](/public/screenshots/dashboard.png) | ![Pipeline](/public/screenshots/pipeline.png) |

| Leads List | Lead Details |
|------------|--------------|
| ![Leads](/public/screenshots/leads.png) | ![Detail](/public/screenshots/detail.png) |

---

## ✨ Features

- **📊 Modern Dashboard:** Real-time overview of your leads, tasks, and pipeline value.
- **👥 Lead Management:** Comprehensive lead tracking with status, value, and contact info.
- **📑 Sales Pipeline:** Visual Kanban board to manage deals across different stages.
- **✅ Follow-up Tasks:** Never miss a lead with integrated commercial tasks and reminders.
- **🔗 Marketing Attribution:** Built-in support for UTM parameters, GCLID, and FBCLID tracking.
- **🕒 Interaction History:** Keep a detailed log of every touchpoint with your leads.

---

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **ORM:** [Prisma](https://www.prisma.io/) (v7+)
- **Database:** SQLite (default for MVP), ready for PostgreSQL.
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm / yarn / pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/paulomed-cyber/Open-Lead-CRM.git
   cd Open-Lead-CRM
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   ```bash
   cp .env.example .env
   ```

4. **Initialize Database:**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. **Run Development Server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🗺 Roadmap

### Phase 1: MVP (Current)
- [x] Dashboard metrics
- [x] Leads management
- [x] Kanban Pipeline
- [x] Task management
- [x] Interaction history
- [x] Marketing attribution tracking

### Phase 2: Core Expansion
- [ ] User Authentication & Workspaces
- [ ] Advanced Filters & Search
- [ ] Proposal Generation
- [ ] Custom Fields

### Phase 3: Integrations
- [ ] WhatsApp Web integration
- [ ] Google Calendar synchronization
- [ ] Webhooks for lead capture
- [ ] Email automation

---

## 🤝 Contributing

We love contributions! Please see our [CONTRIBUTING.md](docs/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

---

## 🏗 Architecture

For a deep dive into how Open Lead CRM is built, check out our [ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ for the open-source community.
