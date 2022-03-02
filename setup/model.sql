create table users (userId serial primary key,username varchar(30),password varchar(500),age int);

create table todos(
    todoId serial not null primary key,
    userId int references users(userId),
    todoText varchar(50) not null,
    todoDate timestamp not null default now(),
    todoCompleted boolean default false
);

