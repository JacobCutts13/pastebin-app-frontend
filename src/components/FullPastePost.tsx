import { IPasteFullDetails } from "../utils/interfaces";

export default function FullPastePost(Props: IPasteFullDetails): JSX.Element {
  return (
    <>
      <h1>{Props.paste_title}</h1>
      <div>
        <p>{Props.paste_content}</p>
      </div>
    </>
  );
}
