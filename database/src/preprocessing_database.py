# %% [markdown]
# # Database preprocessing for use by API

# %% [markdown]
# Import the libraries that will be used throughout the preprocessing.

# %%
import pandas as pd
import re
import sqlite3

# %% [markdown]
# Declare any constants that will be used in the preprocessing.

# %%
MOVIES_CSV_PATH = "../datasets/movies.csv";
RATINGS_CSV_PATH = "../datasets/ratings.csv";
DATABASE = "../../server/movielens.db"

# %% [markdown]
# Read the datasets that will be processed.
# 
# 

# %%
df_movies = pd.read_csv(MOVIES_CSV_PATH)
df_ratings = pd.read_csv(RATINGS_CSV_PATH)

# %% [markdown]
# Define a function that extracts the year from the movie titles using regular expressions.

# %%
def get_year_from_title(title: str):
    year = re.findall(r'\(\d{4}(?:–\d{4})?\)', title)


    if year:
        new_year = year[-1]
        new_year = str(new_year).replace("(", "").replace(")", "")
        return new_year

# %% [markdown]
# Create a function that removes the year from the movie titles.

# %%
def remove_year_from_title(title: str):
    new_title = re.sub(r'\(\d{4}(?:–\d{4})?\)', '', title)
    return new_title.strip()

# %% [markdown]
# Apply the function to extract all years from the movie titles and add them to a new column in the dataset.
# 
# Replace movies with no year information in the title with "Unknown."
# 
# 

# %%
df_movies["year"] = df_movies["title"].apply(get_year_from_title)
df_movies["year"].fillna("Unknown", inplace=True)
df_movies["year"].info()

# %% [markdown]
# Remove the year from the movie titles in the dataset.
# 

# %%
df_movies["title"] = df_movies["title"].apply(remove_year_from_title)
df_movies

# %% [markdown]
# Calculate the average ratings along with the count of ratings and associate them with movie IDs.

# %%
mean_ratings = df_ratings.groupby("movieId")["rating"].agg(["count", "mean"]).reset_index()
mean_ratings.columns = ["movieId", "amount_ratings", "rating"]
mean_ratings


# %% [markdown]
#  Add the calculated columns to the movies dataset and replace any missing values with 0.

# %%
df_movies = df_movies.merge(mean_ratings, on="movieId", how="left")
df_movies.fillna(0, inplace=True)
df_movies

# %% [markdown]
# Establish a connection to the database and execute insertion queries to insert the preprocessed data into the movies table.

# %%
connection = sqlite3.connect(DATABASE)

df_movies.to_sql("movies", con=connection, if_exists="replace", index=False)

connection.close()



