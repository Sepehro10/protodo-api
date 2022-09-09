const express = require("express");
const passport = require("passport");
const { auth } = require("../validators/user.schema");
const { generateSession, hashPassword, validatePassword, removeFields } = require("../core/core");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
	res.status(200).json((({ password, ...user }) => user)(req.user));
});

router.post("/register", async (req, res, next) => {
	try {
		const data = await auth.validate(req.body);

		// Register user
		const newUser = removeFields(
			await prisma.users.create({
				data: {
					...data,
					password: await hashPassword(data.password),
				},
			}),
			["password"]
		);

		// Generate token based on the new user
		const jwtPayload = {
			sub: newUser.id,
		};
		const session = await generateSession(jwtPayload);

		// Return data
		res.status(200).json({
			success: true,
			msg: "Account registered successfully",
			session,
			user: newUser,
		});
	} catch (err) {
		next(err);
	}
});

router.post("/login", async (req, res, next) => {
	try {
		const data = await auth.validate(req.body);

		// Get user data by username
		const user = await prisma.users.findUniqueOrThrow({
			where: { username: data.username },
		});

		if (!user) {
			res.json({
				success: false,
				message: "User not found",
			});
			return;
		}

		// Check password
		const isPasswordValid = validatePassword(data.password, user.password);
		if (!isPasswordValid) {
			// npx prisma studio
			res.json({
				success: false,
				message: "Invalid password",
			});
			return;
		}

		// Generate token
		const jwtPayload = {
			sub: user.id,
		};
		const session = await generateSession(jwtPayload);
		res.status(200).json({
			success: true,
			msg: "Account authenticated successfully",
			session,
			user: removeFields(user, ["password"])
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
