# Music Data Server

An application built using Next.js, Express.js, and PostgreSQL, showcasing top artists, albums, and song lyrics from Musixmatch API.

## Features

- User authentication using JWT.
- Display top 25 artists.
- Show a list of albums per artist.
- Display song lyrics, handling special characters like '\n' for a better user experience.

## Prerequisites

- Node.js v14+
- PostgreSQL 13+
- Musixmatch Developer API Key

## Installation & Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/LightningDev/music-data-server.git
    ```

2. **Navigate to the project directory and install dependencies:**
    ```bash
    cd music-data-server
    npm install
    ```

3. **Setup Environment Variables:**
    - Rename `.env.example` to `.env`.
    - Fill in the required variables such as `DATABASE_URL`, `SECRET_KEY`, and `MUSIXMATCH_API_KEY`. There is also explaination for each of them.

4. **Run Migrations:**
    ```bash
    npm run migrate:up
    ```

5. **Start the development server:**
    ```bash
    npm run dev
    ```

## Testing

This project uses Jest for testing. To run the tests:

```bash
npm test
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss the changes you'd like to make.

## License

This project is licensed under the MIT License.
