package store

import (
	"database/sql"
	"fmt"
	"go.uber.org/zap"
)

type PostgresStore struct {
	db *sql.DB
}

type Post struct {
	Post_id  int64
	Username string
	Post     string
}

func (p *PostgresStore) ConnectToDatabase() error {
	const (
		host     = "localhost"
		port     = 5432
		user     = "postgres"
		password = "postgres53"
		dbname   = "new_posts"
	)

	zap.S().Infof("Connecting to database ...")

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	var err error
	p.db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	//defer p.db.Close()
	zap.S().Infof("Connection established successfully with user: %v, db: %v", user, dbname)
	return err
}

func (p *PostgresStore) AddPost(post_id int64, username string, post string) error {
	sqlStatement := `
       INSERT INTO posts (post_id, username, post)
	   VALUES($1, $2, $3);`
	_, err := p.db.Exec(sqlStatement, post_id, username, post)
	if err != nil {
		zap.S().Errorf("Unable to insert the given post with error : %v", err)
	}
	zap.S().Infof("Post  inserted successfully !")
	return err
}

func (p *PostgresStore) FetchPosts() []Post {
	sqlStatement := `
      SELECT * FROM posts `
	result, err := p.db.Query(sqlStatement)
	if err != nil {
		zap.S().Errorf("Error while fetching posts from postgres db : %v", err)
	}
	defer result.Close()

	posts := make([]Post, 0)
	temp := Post{}
	for result.Next() {
		if err := result.Scan(&temp.Post_id, &temp.Username, &temp.Post); err != nil {
			zap.S().Errorf("Error while scanning posts in db : %v", err)
		}
		posts = append(posts, temp)
	}
	return posts
}
