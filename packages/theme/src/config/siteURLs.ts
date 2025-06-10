export const siteURLs = {
  PORTAL: process.env.PORTAL_URL!,
  ISBDM: process.env.ISBDM_URL!,
  LRM: process.env.LRM_URL!,
  FR: process.env.FR_URL!,
  ISBD: process.env.ISBD_URL!,
  MULDICAT: process.env.MULDICAT_URL!,
  UNIMARC: process.env.UNIMARC_URL!,
};

export function getStandardUrl(key: keyof typeof siteURLs) {
  return siteURLs[key];
}
