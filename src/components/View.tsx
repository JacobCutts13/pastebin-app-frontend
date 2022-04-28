import { useEffect, useState } from "react";
import axios from "axios";
import { IPasteFullDetails } from "../utils/interfaces";
import PastePost from "./PastePost";
import FullPastePost from "./FullPastePost";
import { Fade } from "react-awesome-reveal";

export default function View(): JSX.Element {
  const [tenPosts, setTenPosts] = useState<IPasteFullDetails[]>([]);
  const [selectedPost, setSelectedPost] = useState<IPasteFullDetails>();

  useEffect(() => {
    axios
      .get("https://paste-bin-backend-temi-jacob.herokuapp.com/pastes")
      .then((response) => setTenPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const mapTenPosts: JSX.Element[] = tenPosts.map((post) => (
    <button
      key={post.paste_id}
      className="paste-post-tile"
      onClick={() => setSelectedPost(post)}
    >
      <PastePost
        paste_title={post.paste_title}
        paste_content={post.paste_content}
        paste_date={post.paste_date}
        paste_id={post.paste_id}
      />
    </button>
  ));

  return (
    <section id="view" className="view">
      <div className="paste-posts-col">
        <h1>Recent Posts</h1>
        {tenPosts.length > 0 && (
          <Fade cascade={true} direction="left" triggerOnce={true}>
            {mapTenPosts}
          </Fade>
        )}
      </div>

      <div className="full-paste-post">
        {selectedPost === undefined && <h1>Click on a post to view</h1>}
        {selectedPost !== undefined && selectedPost.paste_id === -1 && (
          <h1>Post Deleted</h1>
        )}
        {selectedPost !== undefined && selectedPost.paste_id !== -1 && (
          <FullPastePost
            paste_title={selectedPost.paste_title}
            paste_content={selectedPost.paste_content}
            paste_date={selectedPost.paste_date}
            paste_id={selectedPost.paste_id}
            setSelectedPost={setSelectedPost}
            setTenPosts={setTenPosts}
            tenPosts={tenPosts}
          />
        )}
      </div>
    </section>
  );
}
