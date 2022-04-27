import { useState } from "react";
import { IPasteFullDetails } from "../utils/interfaces";
import axios from "axios";
import { Fade } from "react-awesome-reveal";

export default function FullPastePost(Props: IPasteFullDetails): JSX.Element {
  const [newComment, setNewComment] = useState<string>("");

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
        </div>
      </Fade>
    </>
  );
}
