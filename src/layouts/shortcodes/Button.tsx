import React from "react";

const Button = ({
  label,
  link,
  style,
  rel,
}: {
  label: string;
  link: string;
  style?: string;
  rel?: string;
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel={`noopener noreferrer ${
        rel ? (rel === "follow" ? "" : rel) : "nofollow"
      }`}
      className={`btn mb-4 me-4 border-1.4 text-dark hover:text-dark hover:bg-teal-100 no-underline ${
        style === "outline" ? "btn-outline-primary" : "btn-primary"
      }`}
    >
      {label}
    </a>
  );
};

export default Button;
