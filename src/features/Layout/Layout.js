import Header from "./Header";
import NavigationColumn from "./NavigationColumn";
import "./assets/layout.scss";

const Layout = ({ headerTitle, children }) => {
  return (
    <>
      <Header subTitle="Sub Title">{headerTitle}</Header>
      <div className="columns">
        <div className="column is-2">
          <NavigationColumn />
        </div>
        <div className="column">{children}</div>
      </div>
    </>
  );
};

export default Layout;
