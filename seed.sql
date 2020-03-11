insert into users (username, firstname, lastname, email, hash)
VALUES
('undefined', 'undefined', 'undefined', 'undefined', 'undefined'), --quickfix to make these unavailible uniques. account can't be logged into, on purpose.
('patrick','patrick','easterly','pat@pat.com','$2b$10$SsoEEoyE0KBEpzKnsbGpQ.pR6Vg.i3JELnRxLOAoH9EHv0d6stpVi'),
('catie','catie','evans','catie@catie.com','$2b$10$Kgsum6c2JN6OfDd1fbMzOuuMjU0T2bE8oHCJcvu0ZotHg5D2ZDakK'),
('austin','austin','dryden','austin@austin.com','$2b$10$PpmS6WjGpkwHb/Po4i7.VOYcE17T2b5KIL1jfqs34pAGfcgMYQcGW');

insert into rooms(userid, roomname, hightemp, lowtemp, lightamount, defaultroom)
VALUES
(3, 'kitchen', 68, 78, 'full', 'false'),
(3, 'bathroom', 68, 78, 'full', 'false'),
(3, 'bedroom', 68, 78, 'full', 'false'),
(2, 'bedroom', 68, 78, 'full', 'false'),
(2, 'livingroom', 68, 78, 'full', 'false'),
(2, 'hall', 68, 78, 'full', 'false'),
(2, 'kitchen', 68, 78, 'full', 'false');

-- insert into plantinfo (latinname, commonname, waterneeds, sunlight, lowtemp, soiltype, about, planttype, photo)
-- VALUES
-- ('latinname', 'commonname', 'waterneeds', 'sunlight', 'lowtemp', 'soiltype', 'about', 'planttype', 'photo');

insert into plants (userid, roomid, plantinfoid, plantname, hassensor)
VALUES
(3, 1, 2, 'plantname', false),
(3, 2, 2, 'plantname', false),
(3, 3, 3, 'plantname', false),
(2, 4, 4, 'plantname', false),
(2, 5, 5, 'plantname', false),
(2, 6, 1, 'plantname', false),
(2, 7, 6, 'plantname', false);


insert into water(plantid, userid, watertime)
VALUES
(1,3,'2020-01-08 14:05:06-05'),
(1,3,'2020-01-08 14:05:06-05'),
(2,3,'2020-01-08 14:05:06-05'),
(3,3,'2020-01-08 14:05:06-05'),
(3,3,'2020-01-08 14:05:06-05'),
(3,3,'2020-01-08 14:05:06-05'),
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

insert into sensordata(sensortime, moisture)
VALUES
('2020-01-08 14:05:06-05', 350);