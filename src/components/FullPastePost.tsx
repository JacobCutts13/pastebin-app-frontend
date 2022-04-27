import { IPasteFullDetails } from "../utils/interfaces";

export default function FullPastePost(Props: IPasteFullDetails): JSX.Element {
  const date = new Date(Props.paste_date);
  const formattedDate = `${date.toDateString()}, ${date.toLocaleTimeString()}`;

  return (
    <>
      <h1>{Props.paste_title}</h1>
      <em>{formattedDate}</em>
      <div>
        <p>{Props.paste_content}</p>
      </div>
    </>
  );
}
