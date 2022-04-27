import { IPaste } from "../utils/interfaces";
import { useState } from "react";
import axios from "axios";

export default function PasteSubmission(): JSX.Element {
  const [titleText, setTitleText] = useState<string>("");
  const [contentText, setContentText] = useState<string>("");

  const submitPaste = (): void => {
    const newPaste: IPaste =
      titleText === ""
        ? { paste_content: contentText }
        : { paste_title: titleText, paste_content: contentText };
    axios
      .post("https://paste-bin-backend-temi-jacob.herokuapp.com/", newPaste)
      .then(() => console.log("success"))
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section
      className="flex-container flex-column paste-submissions"
      id="paste-submissions"
    >
      <input
        onChange={(e) => setTitleText(e.target.value)}
        value={titleText}
        placeholder="Enter Title"
      />
      <textarea
        onChange={(e) => setContentText(e.target.value)}
        value={contentText}
        placeholder="Enter content"
        className="input-content"
      />
      <button onClick={submitPaste} className="button-submit">
        Submit
      </button>
    </section>
  );
}
