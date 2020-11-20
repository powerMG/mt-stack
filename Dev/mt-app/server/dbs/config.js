export default {
  dbs: {
    get host() {
      return "mongodb://106.13.46.252:27017/student";
    }
  },
  redis: {
    get host() {
      return "106.13.46.252";
    },
    get port() {
      return 6379;
    },
    get password() {
      return "redis1.q_252";
    }
  },
  smtp: {
    get host() {
      return "smtp.qq.com";
    },
    get port() {
      return 587;
    },
    get user() {
      return "945816614@qq.com";
    },
    get pass() {
      return "dkqflcnmhjcrbajc";
    },
    get code() {
      return () => {
        return Math.random()
          .toString(16)
          .slice(2, 6)
          .toUpperCase();
      };
    },
    get expire() {
      return () => {
        return new Date().getTime() + 60 * 60 * 1000;
      };
    }
  }
};
