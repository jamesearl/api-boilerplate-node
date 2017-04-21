import winston from 'winston';

export const transports = [
  new winston.transports.Console({
    colorize: true,
  }),
];

const logger = new(winston.Logger)({
  transports
});

export default logger;
