const config1: any = {
  apiAddress: ''
}
;
if (!/localhost/.test(document.location.host)) {
  config1.apiAddress = 'http://ar.stonelan.com/api/';
} else {
  config1.apiAddress = 'http://localhost:3085/';
}
export const config = config1;



