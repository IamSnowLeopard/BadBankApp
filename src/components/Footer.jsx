const Footer = () => {
  const year = new Date().getFullYear(); // Dynamically get the current year

  return (
    <footer className="bg-light text-center text-lg-start mt-4">
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © {year}{" "}
        <a className="text-dark" href="https://www.linkedin.com/in/rahmat01/">
          Rahmat Muhammad
        </a>
      </div>
    </footer>
  );
};

export default Footer;
