import { useState, useEffect } from "react";
import { ICommentFullDetails, IFullPastePost } from "../utils/interfaces";
import axios from "axios";
import { Fade } from "react-awesome-reveal";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function FullPastePost(Props: IFullPastePost): JSX.Element {
  const [newComment, setNewComment] = useState<string>("");
  const [commentsArray, setCommentsArray] = useState<ICommentFullDetails[]>([]);
  const [editCommentID, setEditCommentID] = useState<number>(-1);
  const [editCommentContent, setEditCommentContent] = useState<string>("");

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

  const editComment = (comment_id: number, comment_content: string): void => {
    if (editCommentID === comment_id) {
      setEditCommentID(-1);
    } else {
      setEditCommentID(comment_id);
      setEditCommentContent(comment_content);
    }
  };

  const submitEditCommentContent = (keycode: string): void => {
    console.log(keycode);
    if (keycode === "Enter") {
      axios
        .patch(
          "https://paste-bin-backend-temi-jacob.herokuapp.com/pastes/" +
            Props.paste_id +
            "/comments/" +
            editCommentID.toString(),
          { comment_content: editCommentContent }
        )
        .then(() => console.log("success"))
        .then(() => setNewComment(""))
        .then(() => {
          const editCommentIndex = commentsArray.findIndex(
            (e) => e.comment_id === editCommentID
          );
          commentsArray[editCommentIndex].comment_content = editCommentContent;
          setCommentsArray(commentsArray);
        })
        .then(() => setEditCommentID(-1))
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const mapCommentsArray: JSX.Element[] = commentsArray.map((comment) => (
    <div key={comment.comment_id} className="comment">
      {editCommentID === comment.comment_id && (
        <textarea
          onChange={(e) => setEditCommentContent(e.target.value)}
          value={editCommentContent}
          placeholder="Edit"
          className="input-content"
          onKeyDown={(e) => submitEditCommentContent(e.key)}
        />
      )}
      {editCommentID !== comment.comment_id && (
        <h2>{comment.comment_content}</h2>
      )}
      <IconButton
        aria-label="edit"
        onClick={() => editComment(comment.comment_id, comment.comment_content)}
      >
        <EditIcon />
      </IconButton>
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
