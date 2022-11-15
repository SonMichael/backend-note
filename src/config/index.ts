const codes = {
  ERR_00000: 'ERR_00000',
  ERR_00001: 'ERR_00001',
  ERR_00002: 'ERR_00002',
};
const config = {
  codes,
  err_msg: {
    [codes.ERR_00001]: 'We have a problem, please re-try again.',
    [codes.ERR_00002]: 'Authenticate failed',
  },
};
export default config;
