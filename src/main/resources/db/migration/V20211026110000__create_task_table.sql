CREATE TABLE task
(
    id        bigserial primary key,
    name       text                     not null,
    cron      text                     not null
);
