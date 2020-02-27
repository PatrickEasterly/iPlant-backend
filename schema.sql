create table users (
    id serial primary key,
    username text unique not null,
    firstName text, 
    lastName text, 
    email text unique not null, -- this needs to be simple encrypted with a 2 way key (one key in the secret .env file SHOULD work for all users, I just don't want to store emails as plaintext)
    hash text -- one way encryption hash. doesn't need to be recovered if user loses it. 
);

--plant info tables
create table plantinfo(
    id serial primary key,
    info text --this schema will get fleshed out more once we settle on WHAT data to pull from what API.
);

create table plants (
    id serial primary key,
    userid INTEGER REFERENCES users(id),
    plantid INTEGER REFERENCES plantinfo(id),
    name text
);

create table water(
    plantid INTEGER REFERENCES plants(id),
    watertime text --saved as text, not date, so that only JS does any timezone conversions
);

-- social tables
create table follow(
    userid INTEGER REFERENCES users(id),
    follows INTEGER REFERENCES users(id)
);

create table posts(
    id serial primary key,
    userid INTEGER REFERENCES users(id),
    plantid INTEGER REFERENCES plants(id),
    postdate text, --saved as text, not date, so that only JS does any timezone conversions
    photo text, --url of photo on server.
    caption text
);

create table comments(
    id serial primary key,
    userid INTEGER REFERENCES users(id),
    postid INTEGER REFERENCES posts(id),
    commentdate text, --saved as text, not date, so that only JS does any timezone conversions
    comment text
);

create table likes(
    postid INTEGER REFERENCES posts(id),
    userid INTEGER REFERENCES users(id)
);