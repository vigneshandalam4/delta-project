# 🌍 Wanderlust - Explore, Share & Book Your Next Adventure

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)

Wanderlust is a **full-stack travel platform** designed to help users **explore, share, and book** destinations worldwide. Built using the **MEN stack (MongoDB, Express.js, Node.js)**, Wanderlust offers an immersive experience for adventurers looking to discover new places and make bookings seamlessly.

---

## ✨ Features

### ✅ Core Features
- 🔑 **User Authentication**: Secure login and registration using **Passport.js**.
- 🏕 **Listings Management**: Users can **create, edit, and delete** travel listings.
- ⭐ **Reviews & Ratings**: Leave **detailed reviews and ratings** for various locations.
- ☁️ **Cloud Storage**: **Image uploads** are handled via **Cloudinary**.
- 🗺 **Map Integration**: Interactive maps powered by **Mapbox API**.
- 📱 **Responsive UI**: Built with **EJS & Bootstrap** for a smooth experience.
- 🏨 **Booking System**: Users can **book stays** at listed locations.
- 💳 **Secure Payments**: Integrated **Stripe** for **hassle-free transactions**.
- ⏳ **Real-Time Availability**: Users **cannot book** dates that are already reserved.
- ❌ **Past Date Restriction**: Users **cannot** book for past dates.

### 🚀 Future Enhancements
- ❌ **Booking Cancellation**: Users will be able to **cancel** their bookings.
- 📊 **Admin Dashboard**: Advanced **analytics and management** for listings & bookings.
- 🛎 **Host Mode**: Allow users to act as **hosts** for their own listings.

---

## 🛠 Tech Stack

| Technology   | Usage        |
|-------------|-------------|
| **Backend** | Node.js, Express.js, MongoDB |
| **Frontend** | EJS, Bootstrap |
| **Authentication** | Passport.js |
| **File Storage** | Cloudinary |
| **Mapping Service** | Mapbox API |
| **Payment Gateway** | Stripe |

---

## 🏗 Installation

To run the project locally, follow these steps:

```sh
# Clone the repository
git clone https://github.com/vigneshandalam4/delta-project.git

# Navigate into the project directory
cd delta-project

# Install dependencies
npm install

# Create a .env file and configure required environment variables

# Start the server
node index.js
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
MONGO_URI=<your_mongodb_connection_string>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
MAPBOX_TOKEN=<your_mapbox_access_token>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
STRIPE_PUBLIC_KEY=<your_stripe_public_key>
```

---

## 🎯 Usage

1️⃣ **Sign up** or **log in** to your account.
2️⃣ **Browse listings** of various travel destinations.
3️⃣ **Add new listings** with images, descriptions, and locations.
4️⃣ **Book stays** at your favorite destinations and **make secure payments via Stripe**.
5️⃣ **View past bookings** from your profile.
6️⃣ **Leave reviews** and ratings for destinations.

---

## 🤝 Contributing

🚀 Contributions are welcome! Feel free to open issues and pull requests to **improve the project**.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📩 Contact
For any inquiries, feel free to reach out via **GitHub** or email.

---

🚀 **Start Exploring with Wanderlust Today!** 🌍

