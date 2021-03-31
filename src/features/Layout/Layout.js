import Header from "./Header";
import NavigationColumn from "./NavigationColumn";
import "./assets/layout.scss";

const Layout = ({ headerTitle, subTitle, children }) => {
  return (
    <>
      <Header subTitle={subTitle}>{headerTitle}</Header>
      <div className="columns pb-0 mb-0">
        <div className="column is-2 pb-0 mb-0">
          <NavigationColumn />
        </div>
        <div className="column pb-0 mb-0">
          <div className="container pr-3">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
