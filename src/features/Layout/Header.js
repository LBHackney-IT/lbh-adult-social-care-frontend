const Header = ({ children, subTitle }) => {
  return (
    <div className="page-header">
      {children}
      {subTitle}
    </div>
  );
};

export default Header;
