create table users (
    id int not null auto_increment,
    email varchar(50) not null unique,
    `name` varchar(50) not null,
    `password` varchar(50) not null,
    primary key (id)
);

create table transactions (
    id int not null auto_increment,
    userId int not null,
    title varchar(100),
    amount decimal not null,
    notes varchar(1000),
    `date` datetime not null default current_timestamp,
    primary key (id)
);

alter table transactions add constraint transactions_fk foreign key (userId) references users(id);