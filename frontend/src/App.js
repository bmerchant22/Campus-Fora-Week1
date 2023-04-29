import {useState} from "react";

export default function MyForm() {
    const [id, setId] = useState(0)
    const [username, setUsername] = useState("")
    const [post, setPost] = useState("")
    const [deleteId, setDeleteId] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault();

        setId(null)
        setUsername('')
        setPost('')
        setDeleteId(0)
    }

    let urlAddPost = "http://localhost:8080/add-post" + "?post_id=" + id + "&username=" + username + "&post=" + post;
    let urlDelete = "http://localhost:8080/delete-post" + "?post_id=" + deleteId;
    let urlFetchPosts = "http://localhost:8080/recent-posts"
    {console.log(id,username,post)}

    return(
        <>
            <form method="post" action={urlAddPost}>
                <input
                    type="number"
                    id="post_id"
                    placeholder="Post id"
                    onChange={(event) =>
                        setId(event.target.value)
                    }
                />
                <br/><br/>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    onChange={(event) =>
                        setUsername(event.target.value)
                    }
                />
                <br/><br/>
                <input
                    type="text"
                    id="post"
                    placeholder="Post"
                    onChange={(event)=>
                        setPost(event.target.value)
                    }
                />
                <br/><br/>
                <button type="submit">
                    Add post
                </button>
            </form>
            <br/><br/><br/>
            <form method = "post" action={urlDelete}>
                <input
                    type="text"
                    id="id"
                    placeholder="id"
                    onChange={(event)=>
                        setDeleteId(event.target.value)
                    }
                />
                <br/><br/>
                <button type="submit">
                    Delete post
                </button>
            </form>
            <br/><br/><br/>
            <button >
                <a href={urlFetchPosts}>Get posts</a>
            </button>
        </>
  );
}
