import { useState, useEffect } from "react";
import { ICommentFullDetails, IFullPastePost } from "../utils/interfaces";
import axios from "axios";
import { Fade } from "react-awesome-reveal";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function FullPastePost(Props: IFullPastePost): JSX.Element {
  const [newComment, setNewComment] = useState<string>("");
  const [commentsArray, setCommentsArray] = useState<ICommentFullDetails[]>([]);

  useEffect(() => {
    axios
      .get(
        "https://paste-bin-backend-temi-jacob.herokuapp.com/pastes/" +
          Props.paste_id +
          "/comments"
      )
      .then((response) => setCommentsArray(response.data))
      .catch((error) => console.error(error));
  }, [newComment, Props.paste_id]);

  const date = new Date(Props.paste_date);
  const formattedDate = `${date.toDateString()}, ${date.toLocaleTimeString()}`;

  const submitComment = (keycode: string): void => {
    if (keycode === "Enter") {
      axios
        .post(
          "https://paste-bin-backend-temi-jacob.herokuapp.com/pastes/" +
            Props.paste_id +
            "/comments",
          { comment_content: newComment }
        )
        .then(() => console.log("success"))
        .then(() => setNewComment(""))
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deleteComment = (comment_id: number): void => {
    axios
      .delete(
        "https://paste-bin-backend-temi-jacob.herokuapp.com/pastes/" +
          Props.paste_id +
          "/comments/" +
          comment_id
      )
      .then(() => console.log("success deleted"))
      .then(() =>
        setCommentsArray(
          commentsArray.filter((e) => e.comment_id !== comment_id)
        )
      ) //remove deleted comment
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePost = (): void => {
    axios
      .delete(
        "https://paste-bin-backend-temi-jacob.herokuapp.com/pastes/" +
          Props.paste_id
      )
      .then(() => console.log("success deleted"))
      .then(() =>
        Props.setSelectedPost({
          paste_content: "",
          paste_date: "",
          paste_id: -1,
        })
      )
      .then(() =>
        Props.setTenPosts(
          Props.tenPosts.filter((post) => post.paste_id !== Props.paste_id)
        )
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const mapCommentsArray: JSX.Element[] = commentsArray.map((comment) => (
    <div key={comment.comment_id} className="comment">
      <h2>{comment.comment_content}</h2>
      <IconButton
        aria-label="delete"
        onClick={() => deleteComment(comment.comment_id)}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  ));

  return (
    <>
      <Fade direction="left">
        <div className="paste-post-full-content">
          <div className="full-post-header">
            <h1>{Props.paste_title}</h1>
            <IconButton aria-label="delete" onClick={deletePost}>
              <DeleteIcon />
            </IconButton>
          </div>
          <em>{formattedDate}</em>
          <div>
            <p>{Props.paste_content}</p>
          </div>
        </div>
        <div className="comment-section">
          <textarea
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            placeholder="Comment"
            className="input-content"
            onKeyDown={(e) => submitComment(e.key)}
          />
          {commentsArray.length > 0 && mapCommentsArray}
        </div>
      </Fade>
    </>
  );
}
