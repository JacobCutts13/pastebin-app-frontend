import { IPaste } from "../utils/interfaces";
import { useState } from "react";
import axios from "axios";

export default function PasteSubmission(): JSX.Element {
  const [titleText, setTitleText] = useState<string>("");
  const [contentText, setContentText] = useState<string>("");

  const submitPaste = (): void => {
    const newPaste: IPaste =
      titleText === ""
        ? { content: contentText }
        : { title: titleText, content: contentText };
    axios
      .post("https://paste-bin-backend-temi-jacob.herokuapp.com/", newPaste)
      .then(() => console.log("success"))
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <input
        onChange={(e) => setTitleText(e.target.value)}
        value={titleText}
        placeholder="Enter Title"
      />
      <input
        onChange={(e) => setContentText(e.target.value)}
        value={contentText}
        placeholder="Enter contenet"
      />
      <button onClick={submitPaste}>Submit</button>
    </>
  );
}

// function PASTE_SUBMISSION(): JSX.Element{
//     set [titleText, setTitleText] = useState<string>("")
//     set [contentText, setContentText] = useState<string>("")

//     function UPDATE_TITLE_TEXT_STATE(NEW_TITLE: string): void {
//       SET_TITLE_TEXT(NEW_TITLE);
//     }
//     function UPDATE_CONTENT_TEXT__STATE(NEW_CONTENT: string): void {
//       SET_CONTENT_TEXT(NEW_CONTENT);
//     }
//     function SUBMIT_PASTE(): void {
//       define NEW_PASTE: I_PASTE = TITLE_TEXT===""? {content: CONTENT_TEXT}: {title: TITLE_TEXT, content: CONTENT_TEXT}
//       try{
//       axios post NEW_PASTE
//       }catch(error){
//       console.error(error)
//       }
//     }
//     return(
//       <input
//       onChange={(e) => UPDATE_TITLE_TEXT_STATE(e.value)}
//       value={TITLE_TEXT}
//       placeholder="Enter Title"
//       >
//       <input
//       onChange={(e) => UPDATE_CONTENT_TEXT_STATE(e.value)}
//       value={CONTENT_TEXT}
//       placeholder="Enter contenet"
//       >
//       <button
//       onClick={SUBMIT_PASTE}
//       >
//       Submit
//       </button>
//     )
//   }
