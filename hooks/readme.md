# Webhook Service

This is a lightweight **webhook receiver** built with **Express** and **Prisma ORM**. It is designed to receive incoming POST requests from external services and persist data using the **Transactional Outbox Pattern**, ensuring reliable event-driven processing.

## 📌 Description

- Listens for webhooks on:  
  `POST /hooks/catch/:userId/:zapId`
- Stores incoming data (`metadata`) tied to a `zapId` and a `userId`.
- Implements the **Transactional Outbox Pattern** to ensure consistent and atomic writes to both:
  - `zapRun` table (main event)
  - `zapRunOutbox` table (outbox for further processing by consumers)

## 🚀 Getting Started

```bash
npm install
npx prisma generate
npm run dev
