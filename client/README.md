# MovieLens - Client Application

## Running the Application

Before running this application, ensure that Docker is installed. You can install it by following this [Docker Installation Guide](https://docs.docker.com/engine/install/).

Once Docker is installed, add an `.env` file to the root of the project and include the `VITE_BASE_URL` environment variable with the base API link (e.g., "http://localhost:8080").

Open your terminal and run the following command:

```shell
docker-compose up -d
```

Your application will be accessible at http://localhost:80.

## Page Descriptions

- **Top K Movies:** On this page, you can search for the best movies by specifying a value for 'k' (number).
- **Popular Movies:** On this page, you will find the most popular movies based on the relationship between rating and the number of ratings.
- **Movies By Genre and Year:** On this page, you can search for movies by genre and year.
- **Home:** On this page, you can search for movies by title.

## Technologies Used

### Technologies used for developing this application:

- ReactJS with TypeScript using the ViteJS library.
- shadcn/ui for UI components.
- TailwindCSS for styling.
- react-router-dom for routing the application.
- axios for making requests to the API.
- lucide-react for the icons library.