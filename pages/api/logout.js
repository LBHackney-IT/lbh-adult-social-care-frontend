import withSession from 'lib/session';

export default withSession((req, res) => {
  req.session.destroy();
  console.log('logout destroy', req.session);
  res.end();
});
