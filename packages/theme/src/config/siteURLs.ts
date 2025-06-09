export function getSiteUrls(env: Record<string, string | undefined>) {
  return {
    portal: env.PORTAL_URL,
    isbdm: env.ISBDM_URL,
    lrm: env.LRM_URL,
    fr: env.FR_URL,
    isbd: env.ISBD_URL,
    muldicat: env.MULDICAT_URL,
    unimarc: env.UNIMARC_URL,
  };
}
