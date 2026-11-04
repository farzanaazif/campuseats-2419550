function Footer() {
  return (
    <footer className="footer">
      {/* new Date().getFullYear() = current year, updates by itself */}
      © {new Date().getFullYear()} CampusEats · BICS 3301, IIUM
    </footer>
  );
}

export default Footer;