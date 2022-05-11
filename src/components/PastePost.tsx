import { IPasteFullDetails } from "../utils/interfaces";

export default function PastePost(Props: IPasteFullDetails): JSX.Element {
  return (
    <>
      <h1>{Props.paste_title === "" ? "(No title)" : Props.paste_title}</h1>
      <div className="paste-tile-content">
        <p>{Props.paste_content}</p>
      </div>
    </>
  );
}
