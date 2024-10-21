import React from "react";

export default function Footer() {
  let current_Year = new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="co-12 bg-dark p-3 d-flex align-items-center">
              <span
                style={{ fontSize: "smaller" }}
                className="text-white fw-bold"
              >
                &#169; {current_Year} Nagesh Sonawane. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
