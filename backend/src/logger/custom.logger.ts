import winston from 'winston';
const { createLogger, format, transports } = winston;

class CustomLogger {
  private _logger: winston.Logger;

  public initialization(): void {
    try {
      this._logger = createLogger({
        transports: [
          new transports.Console({
            level: 'info' || 'error',
            format: format.combine(
              format.colorize({ all: true }),
              format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
              format.ms(),
              format.printf(({ level, message, timestamp, ms }) => {
                return `${timestamp} ${level}: ${message} : ${ms}`;
              })
            ),
          }),
        ],
      });

      this.client.info('Logger initialized');
    } catch (error: any) {
      this.client.error(error.message);
    }
  }

  get client() {
    return this._logger;
  }
}
export const logger = new CustomLogger();
