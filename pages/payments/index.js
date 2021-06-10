import React from "react";
import { getUserSession } from "../../service/helpers";
import withSession from "../../lib/session";

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

const PaymentsPage = (props) => {
  return (
    <div className='payments-page'>
      <p>Payments page</p>
    </div>
  );
};

export default PaymentsPage;
