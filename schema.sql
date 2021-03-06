create table users (
    id serial primary key,
    username text unique not null,
    firstname text, 
    lastname text, 
    email text unique not null,
    hash text -- one way encryption hash. doesn't need to be recovered if user loses it. 
);

create table rooms(
    id serial primary key,
    userid INTEGER references users(id),
    roomname text,
    roomimg text,
    hightemp integer,
    lowtemp integer,
    lightamount text,
    defaultroom text
);

--plant info tables
create table plantinfo(
    id serial primary key,
    latinname text unique not null,
    commonname text,
    waterneeds text, -- summer dry, winter dry, low, moderate, high, wetlands, aquatic
    sunlight text, -- full (full sun.), part (part sun/part shade), some (filtered shade), shade (Deep Shade)
    lowtemp integer, -- most plant sites only give a lower range, not a high range, so whatever. High temp can be like low+50 or something.
    soiltype text, -- coarse (rocky, gravely, etc), humus (humus rich, fertile topsoil), bog, drained (well drained)
    soilph text, -- acidic, neutral, basic
    about text, -- a paragraph about how awesome this plant is, probably pulled from wikipedia.
    planttype text, -- Tree, Shrub, Perennial, Succulent, Vine/climber, bulb, etc.
    photo text,
    bigphoto text -- url location of plant photo?!?
);

create table plants (
    id serial primary key,
    userid INTEGER REFERENCES users(id),
    roomid INTEGER REFERENCES rooms(id),
    plantinfoid INTEGER REFERENCES plantinfo(id),
    plantname text,
    hassensor boolean
);

create table water(
    id serial primary key,
    plantid INTEGER REFERENCES plants(id),
    userid INTEGER REFERENCES users(id),
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

create table sensordata(
    sensortime timestamptz,
    moisture INTEGER
);