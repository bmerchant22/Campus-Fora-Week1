package web

import (
	"github.com/bmerchant22/Campus-Fora1/pkg/store"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"net/http"
	"strconv"
)

type Server struct {
	r     *gin.Engine
	store *store.PostgresStore
}

func (srv *Server) AddPost(c *gin.Context) {
	post_id, err := strconv.ParseInt(c.PostForm("post_id"), 10, 64)
	if err != nil {
		zap.S().Errorf("Error while parsing post id : %v", err)
	}
	username := c.PostForm("username")
	post := c.PostForm("post")

	if err = srv.store.AddPost(post_id, username, post); err != nil {
		zap.S().Errorf("Error while calling AddPost method : %v", err)
		panic(err)
	}
	c.String(http.StatusOK, "Post added successfully !")
}

func (srv *Server) FetchPosts(c *gin.Context) {
	posts := srv.store.FetchPosts()
	c.JSON(http.StatusOK, posts)
}
