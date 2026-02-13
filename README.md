# Flight Tracker App

A premium real-time flight tracking application built with **Next.js**, **Tailwind CSS**, and **Framer Motion**.

## Prerequisites

- **Node.js** (v18 or later)
- **npm** or **yarn**

## Setup Instructions

1.  **Install Node.js**: Ensure you have Node.js installed. Download it from [nodejs.org](https://nodejs.org/).
2.  **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Configure API Key**:
    - Rename `.env.local.example` to `.env.local`.
    - Add your Aviationstack API key:
      ```env
      AVIATIONSTACK_API_KEY=your_actual_api_key_here
      ```
4.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
5.  **Open the App**:
    - Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Real-time Flight Tracking**: Proxies requests securely to Aviationstack.
- **Modern UI**: Glassmorphism design with responsiveness.
- **Animations**: Smooth transitions using Framer Motion.
