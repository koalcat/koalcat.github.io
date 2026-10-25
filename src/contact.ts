// The address is assembled at runtime so it never appears verbatim in the bundle
// (and therefore not in any page text a crawler can grep for).
// s1fun@koalcat.com is a Cloudflare Email Routing alias: it forwards to the real
// inbox and can be rotated or switched off from the dashboard at any time.
const user = 's1fun';
const domain = ['koalcat', 'com'].join('.');

export const contactAddress = `${user}@${domain}`;
export const contactMailto = `mailto:${contactAddress}`;
