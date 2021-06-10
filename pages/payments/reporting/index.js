import React from "react";
import {getUserSession} from "../../../service/helpers";
import withSession from "../../../lib/session";

export const getServerSideProps = withSession(async function({ req }) {
  const user = getUserSession({ req });
  if(user.redirect) {
    return {
      props: { user },
    }
  }

  return {
    props: {}, // will be passed to the page component as props
  }
});

const Reporting = (props) => {
  return (
    <div className='reporting'>
      <p>Reporting</p>
    </div>
  )
};

export default Reporting;
