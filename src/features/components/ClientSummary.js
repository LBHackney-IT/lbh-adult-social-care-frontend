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
    <>
      <div className="columns">
        <div className="column is-5">
          <strong>{children}</strong>
        </div>
        <div className="column">
          <label>Client</label>
          <div>{client}</div>
        </div>
        <div className="column">
          <label>Hackney ID</label>
          <div>#{hackneyId}</div>
        </div>
        <div className="column">
          <label>Age {age}</label>
          <div>{dateOfBirth}</div>
        </div>
        <div className="column">
          <label>Postcode</label>
          <div>{postcode}</div>
        </div>
      </div>
      {/* TODO Green Divider */}
    </>
  );
};

export default ClientSummary;
