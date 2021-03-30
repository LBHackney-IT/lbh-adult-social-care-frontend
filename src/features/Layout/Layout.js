import Header from "./Header";
import NavigationColumn from "./NavigationColumn";
import "./assets/layout.scss";

const Layout = ({ headerTitle, subTitle, children }) => {
  return (
    <>
      <Header subTitle={subTitle}>{headerTitle}</Header>
      <div className="columns">
        <div className="column is-2">
          <NavigationColumn />
        </div>
        <div className="column">
          <div className="container pr-3">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
