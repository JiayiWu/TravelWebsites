用户表

id name mobile mail password  state（认证还是未认证 0是未认证 1是认证） logo_url create_time modify_time


管理员表

id name password create_time modify_time

认证表

id userId create_time modify_time attachment_url state(0新申请审批 1审批通过 2审批拒绝) context（附加信息）

活动表

id createId create_time modify_time cover_url  location  startTime endTime description

state(0未审核状态 1审核通过状态  2审批拒绝状态 3被删除 4活动结束) joinType(0直接加入 1需要审批后加入)

人员和活动关系表

id activityId userId state（0已经加入 1退出 2删除） create_time modify_time

活动加入审批表

id activityId  activityCreateId joinUserId state(0待审批，1审批通过，2拒绝，3删除) create_time modify_time 


------------------------------

用户表

 create table user(
      id int primary key auto_increment,
     name varchar(25) NOT NULL DEFAULT 'user' ,
     mobile varchar(30) DEFAULT NULL,
     mail varchar(255) DEFAULT NULL,
     password varchar(255) NOT NULL,
     state int DEFAULT 0,
     logo_url text DEFAULT NULL,
     create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
     modify_time timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
 );
 
CREATE TRIGGER `update_user_update_time_trigger` BEFORE UPDATE ON `user`
 FOR EACH ROW SET NEW.`modify_time` = NOW();

管理员表

create table admin(
 id int primary key auto_increment,
name varchar(25) NOT NULL DEFAULT 'admin'  ,
password varchar(255) NOT NULL,
create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
modify_time timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
);

CREATE TRIGGER `update_admin_update_time_trigger` BEFORE UPDATE ON `admin`
 FOR EACH ROW SET NEW.`modify_time` = NOW();

认证表(学生信息认证)

create table authentication(
 id int primary key auto_increment,
user_id int not NULL,
attachment_url text NOT NULL,
create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
modify_time timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
state int DEFAULT 0,
context text DEFAULT NULL
);
CREATE TRIGGER `update_authentication_update_time_trigger` BEFORE UPDATE ON `authentication`
 FOR EACH ROW SET NEW.`modify_time` = NOW();



活动表

create table activity(
 id int primary key auto_increment,
create_id int not NULL,
create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
modify_time timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
cover_url text DEFAULT NULL,
location varchar(255) DEFAULT NULL,
start_time  timestamp NOT NULL,
end_time  timestamp DEFAULT '0000-00-00 00:00:00',
description text DEFAULT NULL,
state int DEFAULT 0 ,
join_type int DEFAULT 0
);
CREATE TRIGGER `update_activity_update_time_trigger` BEFORE UPDATE ON `activity`
 FOR EACH ROW SET NEW.`modify_time` = NOW();







人员和活动关系表

create table relation(
 id int primary key auto_increment,
activity_id int not null,
user_id  int not null,
state int DEFAULT 0,
create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
modify_time timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
);
CREATE TRIGGER `update_relation_update_time_trigger` BEFORE UPDATE ON `relation`
 FOR EACH ROW SET NEW.`modify_time` = NOW();

活动加入审批表

create table audit(
 id int primary key auto_increment,
activity_id int not NULL,
activity_create_id  int not NULL,
join_user_id  int not NULL,
state int not NULL DEFAULT 0,
create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
modify_time timestamp NOT NULL DEFAULT '0000-00-00 00:00:00');

CREATE TRIGGER `update_audit_update_time_trigger` BEFORE UPDATE ON `audit`
 FOR EACH ROW SET NEW.`modify_time` = NOW();
