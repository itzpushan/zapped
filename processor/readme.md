# Outbox Processor

The **Outbox Processor** is a background service that implements the second step of the **Transactional Outbox Pattern**. It reads unprocessed `zapRunOutbox` entries from the database and publishes them to a **Kafka** topic (`zap-events`) for downstream consumers.

## 📌 Description

- Periodically polls the `zapRunOutbox` table.
- Fetches up to **10** unprocessed zap events at a time.
- Sends them to the **Kafka** topic: `zap-events`.
- Deletes the entries from the outbox after successful publishing.

This ensures **eventual consistency** and reliable event delivery in distributed systems.

## 🚀 Getting Started

### Prerequisites


```bash
npm install
npx prisma generate
npm run dev
