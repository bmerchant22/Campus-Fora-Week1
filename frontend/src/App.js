import {useState} from "react";

export default function MyForm() {
    const [id, setId] = useState(0)
    const [username, setUsername] = useState("")
    const [post, setPost] = useState("")
    const [deleteId, setDeleteId] = useState(0)
    const [json, setJson] = useState([])
    const [postMessage, setPostMessage] = useState("")
    const [deleteMessage, setDeleteMessage] = useState("")

    const handlePostSubmit = (e) => {
        e.preventDefault();

        setId(null)
        setUsername('')
        setPost('')
    }

    const handleDeletesubmit = (e) => {
        e.preventDefault();

        setDeleteId(null)
    }

    let urlAddPost = "http://localhost:8080/add-post" + "?post_id=" + id + "&username=" + username + "&post=" + post;
    let urlDelete = "http://localhost:8080/delete-post" + "?post_id=" + deleteId;
    let urlFetchPosts = "http://localhost:8080/recent-posts"
    {console.log(id,username,post)}

    async function getPosts() {
        const response = await fetch(urlFetchPosts);
        const jsonData = await response.json();
        setJson(jsonData);
        console.log(json);
      }
     
    async function addPost() {
        const response = await fetch(urlAddPost, {
            method: "POST"
        })      
        setPostMessage("Post added successfully")
        console.log("post message testing"+ postMessage)
    }  

    async function deletePost() {
        const response = await fetch(urlDelete, {
            method: "POST"
        })      
        setDeleteMessage("Post deleted successfully")
        console.log("Delete message testing"+ deleteMessage)
    }
      

    return(
        <>
            <form onSubmit={handlePostSubmit}>
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
                <button type="submit" onClick={addPost}>
                    Add post
                </button>
            </form>
                <p>{postMessage}</p>
            <br/><br/><br/>
            <form onSubmit={handleDeletesubmit}>
                <input
                    type="text"
                    id="id"
                    placeholder="id"
                    onChange={(event)=>
                        setDeleteId(event.target.value)
                    }
                />
                <br/><br/>
                <button type="submit" onClick={deletePost}>
                    Delete post
                </button>
                <p>{deleteMessage}</p>
            </form>
            <br/><br/><br/>
            <button onClick={getPosts}>
                {/* <a href={urlFetchPosts}>Get posts</a> */}
                Get posts
            </button>
            <div>
                <table>
                <tr>
                    <th>User</th>
                    <th>Post</th>
                </tr>
            {json.map(jsonData=> 
                <tr>
                    <td>{jsonData.Username}</td>
                    <td>{jsonData.Post}</td>
                </tr>
            )}
                </table>
            </div>
        </>
  );
}
