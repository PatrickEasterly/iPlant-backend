insert into users (username, email, firstname, lastname, email, hash)
VALUES
('','','','','',''),
('','','','','',''),
('','','','','','');

insert into plantinfo (latinname, commonname, waterneeds, sunlight, lowtemp, soiltype, about, planttype, photo)
VALUES
('latinname', 'commonname', 'waterneeds', 'sunlight', 'lowtemp', 'soiltype', 'about', 'planttype', 'photo'),
('latinname', 'commonname', 'waterneeds', 'sunlight', 'lowtemp', 'soiltype', 'about', 'planttype', 'photo'),
('latinname', 'commonname', 'waterneeds', 'sunlight', 'lowtemp', 'soiltype', 'about', 'planttype', 'photo');

insert into plants (userid, plantinfoid, name)
VALUES
(1, 1, 'ficus'),
(1, 1, 'ficus'),
(1, 1, 'ficus');

insert into water(plantid, watertime)
VALUES
(1,'01-27-2020'),
(1,'01-31-2020'),
(1,'02-04-2020'),
(1,'02-08-2020');

insert into follow(userid, follows)
VALUES
(1,2),
(1,3);

insert into posts (userid, plantid, postdate, photo, caption)
VALUES
(1, 1, '01-27-2020', 'photo', 'caption');

insert into comments(userid, postid, commentdate, comment)
VALUES
(1,1, '01-28-2020', 'hey nice plant');

insert into likes(postid,userid)
VALUES
(1,1);