drop table if exists INFO;
drop table if exists TITLE;
drop table if exists CASTS;
create table INFO(id INTEGER ,film_id INTEGER PRIMARY KEY,film_str VARCHAR(10000));
create table TITLE(film_id INTEGER PRIMARY KEY,film_title VARCHAR(200));
create table CASTS(film_id INTEGER,film_cast VARCHAR(300),PRIMARY KEY(film_id,film_cast));