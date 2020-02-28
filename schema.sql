create table users (
    id serial primary key,
    username text unique not null,
    firstname text, 
    lastname text, 
    email text unique not null, -- this needs to be simple encrypted with a 2 way key (one key in the secret .env file SHOULD work for all users, I just don't want to store emails as plaintext)
    hash text -- one way encryption hash. doesn't need to be recovered if user loses it. 
);

create table rooms(
    id serial primary key,
    userid INTEGER references users(id),
    name text,
    hightemp integer,
    lowtemp integer,
    lightamount text
);

--plant info tables
create table plantinfo(
    id serial primary key,
    latinname text unique not null,
    commonname text,
    waterneeds text, -- one of maybe 5 or so categories.
    sunlight text, -- one of probably 3 categories, shade, partial sun, full sun.
    lowtemp text, -- most plant sites only give a lower range, not a high range, so whatever. High temp can be like low+50 or something.
    soiltype text, -- fine, medium, coarse (can be one or many of these types)
    about text, -- a paragraph about how awesome this plant is, probably pulled from wikipedia.
    planttype text, -- theres a better term I can think of, but this would be like, Tree, Shrub, Perennial, Succulent, Vine/climber, bulb, etc.
    photo text -- url location of plant photo?!?
);

create table plants (
    id serial primary key,
    userid INTEGER REFERENCES users(id),
    roomid INTEGER REFERENCES rooms(id),
    plantinfoid INTEGER REFERENCES plantinfo(id),
    name text
);

create table water(
    plantid INTEGER REFERENCES plants(id),
    watertime timestamptz
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
    postdate timestamptz,
    photo text, --url of photo on server.
    caption text
);

create table comments(
    id serial primary key,
    userid INTEGER REFERENCES users(id),
    postid INTEGER REFERENCES posts(id),
    commentdate timestamptz,
    comment text
);

create table likes(
    postid INTEGER REFERENCES posts(id),
    userid INTEGER REFERENCES users(id)
);