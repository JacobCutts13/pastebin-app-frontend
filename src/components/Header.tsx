import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header(): JSX.Element {
  const [currentPage, setCurrentPage] = useState<string>("/");

  const currentPageStyle = {
    color: "rgb(255, 255, 255)",
  };

  return (
    <section className="header" id="header">
      <div className="flex-container">
        <h1>PasteBin</h1>

        <div className="router-links">
          <Link
            onClick={() => setCurrentPage("/")}
            style={currentPage === "/" ? currentPageStyle : undefined}
            to="/"
          >
            View
          </Link>
          <Link
            onClick={() => setCurrentPage("/submit")}
            style={currentPage === "/submit" ? currentPageStyle : undefined}
            to="/submit"
          >
            Submit
          </Link>
          <hr />
        </div>
      </div>
    </section>
  );
}
