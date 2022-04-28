CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes INTEGER DEFAULT 0
)

INSERT
  INTO blogs (author, url, title)
  VALUES ('John Doe', 'nnn', 'The first blog of the database');

INSERT
  INTO blogs (author, url, title)
  VALUES ('Michael Chan', 'https://reactpatterns.com/', 'React patterns')
