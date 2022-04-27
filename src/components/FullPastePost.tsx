import { useState, useEffect } from "react";
import { IPasteFullDetails, ICommentFullDetails } from "../utils/interfaces";
import axios from "axios";
import { Fade } from "react-awesome-reveal";

export default function FullPastePost(Props: IPasteFullDetails): JSX.Element {
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

  const mapCommentsArray: JSX.Element[] = commentsArray.map((comment) => (
    <div key={comment.comment_id}>
      <h2>{comment.comment_content}</h2>
    </div>
  ));

  return (
    <>
      <Fade direction="left">
        <div className="paste-post-full-content">
          <h1>{Props.paste_title}</h1>
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
