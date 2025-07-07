# Kafka Zap Worker

This service is a **Kafka-based worker** that processes actions defined in a Zap workflow. It consumes messages from the `zap-events` topic, parses the metadata using a template engine, performs the required action (such as sending an email or transferring Solana), and then enqueues the **next action stage** back into the same Kafka topic.

## 📌 Description

- **Consumes** Zap events from Kafka (`zap-events` topic).
- **Processes** the current stage (`i-th` action) of the Zap:
  - Email sending
  - Solana transfers
- **Parses** dynamic fields using metadata from the initial webhook.
- **Produces** the next stage (`i+1`) into Kafka for further processing.
- Implements **exactly-once** processing using manual offset commits.

This service enables **sequential orchestration of complex workflows** using event-driven architecture.

---


## 🚀 Getting Started


```bash
npm install
npx prisma generate
npm run dev
