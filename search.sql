drop procedure if exists SEARCH;
delimiter //
create procedure SEARCH(in info VARCHAR(300) )
begin
    select INFO.film_str from INFO where INFO.film_id in(
        select film_id from TITLE where film_title REGEXP CONCAT('.*',info,'.*')
        union 
        select film_id from CASTS where film_cast REGEXP CONCAT('.*',info,'.*')
    );
end//
delimiter ;
