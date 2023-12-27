import Redis, { RedisOptions } from "ioredis";

const getRedisConfiguration = () => {
  return {
    host: process.env.URL_REDIS,
    port: 40057,
    password: process.env.PASSWORD_REDIS,
  };
};

export function createRedisInstance(config = getRedisConfiguration()) {
  try {
    const options: RedisOptions = {
      host: config.host,
      lazyConnect: true,
      showFriendlyErrorStack: true,
      enableAutoPipelining: true,
      maxRetriesPerRequest: 0,
      retryStrategy: (times: number) => {
        if (times > 3) {
          throw new Error(`[Redis] Could not connect after ${times} attempts`);
        }

        return Math.min(times * 200, 1000);
      },
    };

    if (config.port) {
      options.port = Number(config.port);
    }
    if (config.password) {
      options.password = config.password;
    }

    const redis = new Redis(options);

    redis.on("error", (error: unknown) => {
      console.warn("[Redis] Error connecting", error);
    });

    return redis;
  } catch (e) {
    throw new Error(`[Redis] Could not create a Redis instance`);
  }
}
