insert into users (username, firstname, lastname, email, hash)
VALUES
('','','','','');

insert into rooms(userid, roomname, hightemp, lowtemp, lightamount)
VALUES
(1, 'kitchen', 68, 78, 'full');

-- insert into plantinfo (latinname, commonname, waterneeds, sunlight, lowtemp, soiltype, about, planttype, photo)
-- VALUES
-- ('latinname', 'commonname', 'waterneeds', 'sunlight', 'lowtemp', 'soiltype', 'about', 'planttype', 'photo');

insert into plants (userid, roomid, plantinfoid, plantname)
VALUES
(1, 1, 1, 'ficus');

insert into water(plantid, watertime)
VALUES
(1,'2020-01-08 14:05:06-05'),
(1,'2020-01-08 14:05:06-05'),
(1,'2020-01-08 14:05:06-05'),
(1,'2020-01-08 14:05:06-05');

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