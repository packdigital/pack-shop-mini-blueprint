import {v4 as uuidv4} from 'uuid';
import cookieParser from 'cookie';

const SESSION_COOKIE = 'pack_session';
const DEFAULT_EXPIRES = 365;

export const setPackCookie = async ({
  cookieDomain,
  headers,
  request,
}: {
  cookieDomain: string;
  headers: Headers;
  request: Request;
}) => {
  try {
    const cookies = cookieParser.parse(request.headers.get('Cookie') || '');

    let sessionCookie = cookies[SESSION_COOKIE];

    if (!sessionCookie) {
      sessionCookie = uuidv4();

      const daysInMs = DEFAULT_EXPIRES * 24 * 60 * 60 * 1000;
      const expiresAtInMs = Date.now() + daysInMs;
      const expiresAt = new Date(expiresAtInMs).toUTCString();

      headers.append(
        'Set-Cookie',
        `${SESSION_COOKIE}=${sessionCookie}; Path=/; Domain=${cookieDomain}; Expires=${expiresAt}; Secure;`,
      );
    }

    return {headers};
  } catch (error) {
    console.error('Error setting pack cookie', error);
    return {headers};
  }
};
