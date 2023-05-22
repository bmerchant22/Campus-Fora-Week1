package web

import (
	"github.com/bmerchant22/Campus-Fora1/pkg/store"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func CreateWebServer(store *store.PostgresStore) *Server {
	srv := new(Server)
	srv.store = store
	srv.r = gin.Default()

	srv.r.POST(kAddPost, MW1, srv.AddPost)
	srv.r.GET(kFetchPosts, MW1, srv.FetchPosts)
	srv.r.POST(kDeletePost, MW1, srv.DeletePost)
	srv.r.Run("localhost:8080")

	zap.S().Infof("Web server created successfully !!")

	return srv
}
