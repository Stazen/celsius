import 'dotenv/config';
import Joi from 'joi';

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    // CLIENT_URL: Joi.string().required().description('Client url'),
    // GOOGLE_CLIENT_ID: Joi.string().required().description('Google client id'),
    // GOOGLE_CLIENT_SECRET: Joi.string().required().description('Google client secret'),
    // GOOGLE_REDIRECT_URI: Joi.string().required().description('Google redirect url'),
    // GOOGLE_API_KEY: Joi.string().required().description('Google api key'),
    // RABBIT_HOST: Joi.string().required().description('RabbitMQ host url'),
    // RABBIT_PRODUCER_NAME: Joi.string().required().description('RabbitMQ producer queue name'),
    // RABBIT_CONSUMER_NAME: Joi.string().required().description('RabbitMQ consumer queue name'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: `${envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : '')}?retryWrites=true&w=majority`,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    cookieOptions: {
      httpOnly: true,
      secure: envVars.NODE_ENV === 'production',
      signed: true,
    },
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  //   clientUrl: envVars.CLIENT_URL,
  //   google: {
  //     clientId: envVars.GOOGLE_CLIENT_ID,
  //     clientSecret: envVars.GOOGLE_CLIENT_SECRET,
  //     redirectUri: envVars.GOOGLE_REDIRECT_URI,
  //     apiKey: envVars.GOOGLE_API_KEY,
  //   },
  //   rabbitHost: envVars.RABBIT_HOST,
  //   rabbitQueueProducerName: envVars.RABBIT_PRODUCER_NAME,
  //   rabbitQueueConsumerName: envVars.RABBIT_CONSUMER_NAME,
};

export default config;
