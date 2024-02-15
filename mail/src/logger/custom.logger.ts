import winston from 'winston';
const { createLogger, format, transports } = winston;

class Logger {
  private _logger: winston.Logger;

  public initialization() {
    try {
      this._logger = createLogger({
        level: 'http',
        format: format.combine(
          format.colorize({ all: true }),
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.ms(),
          format.label({ label: `🏷️` }),
          format.printf(({ level, message, timestamp, label, ms }) => {
            return `${timestamp} ${level}: ${message}  ${ms} : ${label}    `;
          })
        ),
        transports: [new transports.Console()],
      });

      this._logger.info('Logger initialized');
    } catch (error: any) {
      this._logger.error(error.message);
    }
  }

  get client() {
    return this._logger;
  }
}
export const logger = new Logger();
