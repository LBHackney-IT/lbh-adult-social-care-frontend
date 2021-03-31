import "./assets/clientSummary.scss";

const ClientSummary = ({
  children,
  client,
  hackneyId,
  age,
  dateOfBirth,
  postcode,
}) => {
  return (
    <div className="client-summary-cont">
      <div className="columns">
        <div className="column is-5 client-summary-title">{children}</div>
        <div className="column client-prop">
          <label>Client</label>
          <div>{client}</div>
        </div>
        <div className="column client-prop">
          <label>Hackney ID</label>
          <div>#{hackneyId}</div>
        </div>
        <div className="column client-prop">
          <label>Age {age}</label>
          <div>{dateOfBirth}</div>
        </div>
        <div className="column client-prop">
          <label>Postcode</label>
          <div>{postcode}</div>
        </div>
      </div>
      {/* TODO Green Divider */}
    </div>
  );
};

export default ClientSummary;
