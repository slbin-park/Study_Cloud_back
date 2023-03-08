import { createLogger, transports, format } from "winston";

interface TransformableInfo {
  level: string;
  message: string;
  [key: string]: any;
}
