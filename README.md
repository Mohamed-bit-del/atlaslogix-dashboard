# AtlasLogix Dashboard

## Overview
AtlasLogix Dashboard is a modern, responsive web application designed for comprehensive logistics and shipment monitoring.

It focuses on:
- High-quality UX during loading and streaming states
- Clear separation of concerns using Atomic Design-inspired architecture
- Scalable data fetching with React Query


## Features

### 🔐 Authentication
- Secure, tenant-based login system.
- Protected routes ensuring only authenticated users can access the dashboard.

### 📦 Shipment Management
- **Statistical Overview**: Dashboard cards showing critical metrics:
  - Total Shipments
  - Approved Compliance
  - Pending Reviews
  - Locked/Flagged Shipments
- **Shipment List**: A comprehensive table view of all shipments with:
  - Status indicators (In Transit, Delivered, Processing)
  - Warehouse locations
  - Compliance status (with color-coded badges)
- **Shipment Details**: Dedicated views for individual shipment tracking and management.

### 📡 Sensor Data Monitoring
- **Live Stream**: Real-time visualization of sensor data feeds.
- **Metrics**: Monitoring of:
  - Temperature (°C)
  - Humidity (%)
  - Data Confidence Levels (High/Medium/Low)
- **Status Indicators**: Visual cues for live data reception.

## Tech Stack

This project utilizes a modern, robust frontend stack:

- **Core Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS for utility-first styling
- **Routing**: React Router DOM v7
- **State Management & Data Fetching**: TanStack Query (React Query)
- **API Client**: Axios
- **Form Handling**: React Hook Form + Yup validation
- **Icons**: Lucide React
- **Date Handling**: Day.js

## Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm (Node Package Manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd atlaslogix-dashboard
   ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

### Running the Application

Start the development server with hot-reload:
```bash
npm run dev
```
The application will be available at `http://localhost:5173` (or the specific port shown in your terminal).

### Building for Production

To create an optimized production build:
```bash
npm run build
```
The output will be generated in the `dist` directory.

To preview the production build locally:
```bash
npm run preview
```

## Project Structure

The project follows a scalable structure, partially inspired by Atomic Design principles:

```
src/
├── api/            # API configuration and service endpoints
├── components/     # Reusable UI components
│   ├── atoms/      # Basic elements (Icons, Badges, Skeletons)
│   ├── molecules/  # Simple component groups (Cards, Tables)
│   ├── organisms/  # Complex functional sections (ShipmentsTable)
│   └── templates/  # Page layouts (DashboardLayout)
├── context/        # React Context providers (e.g., AuthContext)
├── hooks/          # Custom React hooks (useShipments, useGlobalSensorStream)
├── pages/          # Main application page views
├── routes/         # Routing configuration
├── types/          # TypeScript definitions and interfaces
└── utils/          # Helper functions and utilities
```

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Runs the TypeScript compiler and builds the app for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: locally previews the production build.
