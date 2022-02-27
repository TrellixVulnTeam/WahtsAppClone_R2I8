
import "./posts.css";
import { MoreVert } from "@material-ui/icons";
import { useState, useEffect, useContext} from "react";
import axios from "axios";
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

export default function Post({post}) {
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user, setUser] = useState({});
  const {user : currentUser } = useContext(AuthContext)

  useEffect(() => {                       //check the db is this post been liked before or not
    setIsLiked(post.likes.includes(currentUser?._id))

  }, [currentUser?._id, post.likes])
  
  useEffect(() => {
      const fetchUser = async () =>{
          const res = await axios.get(`/users?userId=${post.userId}`);
          setUser(res.data);
      }
      
      fetchUser();

  }, [post.userId])


  const likeHandler =()=>{
    try {
      axios.put("/posts/" + post._id + "/likes", {userId: currentUser._id})
    } catch (err) {
      
    }
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to = {`/profile/${user.username}`}>
            <img
              className="postProfileImg"
              src={user.profilePicture || "/assets/images/person/noAvatar.png"}
              alt=""
            />
            </Link>

            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img className="postImg" src={`http://localhost:9000/images/${post.img}`}  alt="" />
          {/* <img className="postImg" src={"http://localhost:9000/images/" + post.img} alt="" /> */}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="" />
            <img className="likeIcon" src="/assets/heart.png" onClick={likeHandler} alt="" />
            <span className="postLikeCounter">"{like}" people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">""comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}