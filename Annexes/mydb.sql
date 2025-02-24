-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS "mydb";
SET search_path TO mydb;

-- Table `mydb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(50) NOT NULL,
  "email" VARCHAR(200) NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "avatar_url" VARCHAR(255) NULL,
  "created_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "username_UNIQUE" UNIQUE ("username"),
  CONSTRAINT "email_UNIQUE" UNIQUE ("email")
);

-- Table `mydb`.`articles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "articles" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "subtitle" TEXT NULL,
  "content" TEXT NOT NULL,
  "banner_url" VARCHAR(255) NULL,
  "user_id" INT,
  "created_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  "status" VARCHAR(20) NOT NULL DEFAULT 'pending',
  "modified_at" TIMESTAMP NULL DEFAULT NULL,
  CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Table `mydb`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "comments" (
  "id" SERIAL PRIMARY KEY,
  "content" TEXT NOT NULL,
  "user_id" INT NOT NULL,
  "article_id" INT NOT NULL,
  "created_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT "fk_article_id" FOREIGN KEY ("article_id") REFERENCES "articles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Table `mydb`.`tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "tags" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(45) NOT NULL,
  CONSTRAINT "name_UNIQUE" UNIQUE ("name")
);

-- Table `mydb`.`article_tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "article_tags" (
  "article_id" INT NOT NULL,
  "tag_id" INT NOT NULL,
  CONSTRAINT "fk_article_id" FOREIGN KEY ("article_id") REFERENCES "articles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT "fk_tag_name" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Table `mydb`.`article_reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "article_reviews" (
  "id" SERIAL PRIMARY KEY,
  "article_id" INT NOT NULL,
  "user_id" INT NOT NULL,
  "score_content" INT NOT NULL CHECK ("score_content" BETWEEN 0 AND 10),
  "score_style" INT NOT NULL CHECK ("score_style" BETWEEN 0 AND 10),
  "score_impact" INT NOT NULL CHECK ("score_impact" BETWEEN 0 AND 10),
  "created_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "fk_article_reviews_article" FOREIGN KEY ("article_id") REFERENCES "articles" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT "fk_article_reviews_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Table `mydb`.`notifications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "notifications" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT NOT NULL,
  "type" VARCHAR(20) NOT NULL,
  "message" TEXT NOT NULL,
  "read" BOOLEAN NOT NULL DEFAULT FALSE,
  "created_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "fk_notifications_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);
