const actualReactRedux = jest.requireActual('react-redux');

module.exports = {
  ...actualReactRedux,
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
};
