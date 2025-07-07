# zapped

A modular, event-driven workflow execution system built using:

- **Node.js (Express)**
- **Apache Kafka**
- **KafkaJS**
- **Prisma ORM**
- **PostgreSQL**
- **Docker**

This project processes user-defined workflows ("Zaps") via a **webhook → outbox → Kafka → consumer** pipeline, following the **Transactional Outbox Pattern** to ensure reliability and consistency.

---

## 🧱 Components

### 🔹 1. Primary-backend

- The client facing bakend for Authentication and zap related operations

### 🔹 2. Webhook Service

- Endpoint: `POST /hooks/catch/:userId/:zapId`
- Stores zap run metadata and outbox entry **within a transaction**

### 🔹 2. Outbox Processor

- Polls the `zapRunOutbox` table for unprocessed events
- Publishes them to Kafka topic `zap-events`

### 🔹 3. Kafka Worker

- Consumes `zap-events`
- Parses the metadata and executes the current action (e.g. email, Solana)
- Sends the next stage back into Kafka for continuation

---

## 🚀 Quick Start

### 🐳 Step 1: Spin Up Kafka and PostgreSQL

```bash
# Start PostgreSQL on port 5433 with password 'pushan'
docker run -p 5433:5432 --name zap_postgres -e POSTGRES_PASSWORD=pushan -d postgres

# Start Kafka on port 9092
docker run -p 9092:9092 --name zap_kafka -d apache/kafka:latest

# Create Kafka topic 'zap-events'

