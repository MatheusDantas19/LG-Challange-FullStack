# MovieLens API

The API is responsible for managing data stored in the database and delivering it to the client.

## Running the Project

To run the project, Docker installation is required. You can find the installation tutorial at this link: [Docker Installation Guide](https://docs.docker.com/engine/install/).

Once Docker is installed, you can execute the following command:

```shell
docker-compose up -d
```

The application will be available at the following link: [http://localhost:8080](http://localhost:8080). Additionally, the API documentation can be accessed through this link: [http://localhost:8080/api](http://localhost:8080/api).

## Technologies Used

- NestJS with TypeScript
- SQLite
- TypeORM
- Swagger

## Considerations

Since all the information is contained within a single table, a significant portion of data manipulation occurs within the movie service methods. All the methods proposed in the challenge were completed (including the bonus).

To determine the popularity of movies, a weighted calculation was used with the following formula:

```shell
(rating * amount_ratings) / threshold
```

The threshold was set to 164, chosen as the minimum number of ratings required to consider a movie popular.

The framework also offers dependency injection by default, facilitating code decoupling.