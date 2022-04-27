import { useEffect, useState } from "react";
import axios from "axios";
import { IPasteFullDetails } from "../utils/interfaces";

export default function View(): JSX.Element {
  const [tenPosts, setTenPosts] = useState<IPasteFullDetails[]>([]);

  useEffect(() => {
    axios
      .get("https://paste-bin-backend-temi-jacob.herokuapp.com/")
      .then((response) => setTenPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const mapTenPosts = (): JSX.Element => {
    return (
      <>
        {tenPosts.map((post) => (
          <div key={post.paste_id}>
            <h1>{post.paste_title}</h1>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <h1>View</h1>
      {tenPosts.length > 0 && mapTenPosts()}
    </>
  );
}
