DROP TABLE IF EXISTS song_reviews CASCADE;
CREATE TABLE IF NOT EXISTS song_reviews (
    track_id INT,
    song_name VARCHAR(50),
    review VARCHAR(500),
    review_date VARCHAR(60)
);