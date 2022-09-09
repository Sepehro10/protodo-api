const { Strategy, ExtractJwt } = require("passport-jwt");
const config = require("../../utils/certs");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Config
const options = {
  secretOrKey: Buffer.from(config.publicKey, "utf8"),
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
};

// Helper functions
const getPassportUser = async (id) => {
  try {
    return await prisma.users.findUniqueOrThrow({ where: { id } });
  } catch (err) {
    return false;
  }
};

// Public function
module.exports = (passport) => {
  passport.use(
    new Strategy(options, async (tkn, done) => {
      const user = await getPassportUser(tkn.sub);
      if (!user) return done(null, false);

      // Return the actuall user
      done(null, user);
    })
  );
};
