insert into asdf(id, works)
VALUES
('1', 'yes'),
('2', 'yes');

insert into users (username, firstname, lastname, email, hash)
VALUES
('patrick','patrick','easterly','pat@pat.com','hash'),
('catie','catie','evans','catie@catie.com','hash'),
('austin','austin','dryden','austin@austin.com','hash');

insert into rooms(userid, roomname, hightemp, lowtemp, lightamount, defaultroom)
VALUES
(1, 'kitchen', 68, 78, 'full', 'false'),
(1, 'bathroom', 68, 78, 'full', 'false'),
(1, 'bedroom', 68, 78, 'full', 'false'),
(2, 'bedroom', 68, 78, 'full', 'false'),
(2, 'livingroom', 68, 78, 'full', 'false'),
(2, 'hall', 68, 78, 'full', 'false'),
(2, 'kitchen', 68, 78, 'full', 'false');

-- insert into plantinfo (latinname, commonname, waterneeds, sunlight, lowtemp, soiltype, about, planttype, photo)
-- VALUES
-- ('latinname', 'commonname', 'waterneeds', 'sunlight', 'lowtemp', 'soiltype', 'about', 'planttype', 'photo');

insert into plants (userid, roomid, plantinfoid, plantname)
VALUES
(1, 1, 2, 'plantname'),
(1, 2, 2, 'plantname'),
(1, 3, 3, 'plantname'),
(2, 4, 4, 'plantname'),
(2, 5, 5, 'plantname'),
(2, 6, 1, 'plantname'),
(2, 7, 6, 'plantname');


insert into water(plantid, userid, watertime)
VALUES
(1,1,'2020-01-08 14:05:06-05'),
(1,1,'2020-01-08 14:05:06-05'),
(2,1,'2020-01-08 14:05:06-05'),
(3,1,'2020-01-08 14:05:06-05'),
(3,1,'2020-01-08 14:05:06-05'),
(3,1,'2020-01-08 14:05:06-05'),
(4,2,'2020-01-08 14:05:06-05'),
(4,2,'2020-01-08 14:05:06-05'),
(4,2,'2020-01-08 14:05:06-05'),
(4,2,'2020-01-08 14:05:06-05'),
(5,2,'2020-01-08 14:05:06-05'),
(5,2,'2020-01-08 14:05:06-05'),
(6,2,'2020-01-08 14:05:06-05'),
(6,2,'2020-01-08 14:05:06-05'),
(7,2,'2020-01-08 14:05:06-05');

insert into follow(userid, follows)
VALUES
(1,1);

insert into posts (userid, plantid, postdate, photo, caption)
VALUES
(1, 1, '2020-01-08 14:05:06-05', 'photo', 'caption');

insert into comments(userid, postid, commentdate, comment)
VALUES
(1, 1, '2020-01-08 14:05:06-05', 'hey nice plant');

insert into likes(postid,userid)
VALUES
(1,1);