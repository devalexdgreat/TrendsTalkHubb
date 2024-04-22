// components/DeviceDetector.js

import { parse } from 'useragent';

export async function getDeviceType(req) {
  const userAgent = req.headers['user-agent'];
  const ua = parse(userAgent);
  return ua.device.family === 'iPhone' || ua.device.family === 'iPad' || ua.os.family === 'Mac OS X';
}