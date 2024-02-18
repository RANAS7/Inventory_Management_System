const { z } = require("zod");

const LoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

const SignUpSchema = z.object({
  body: z.object({
    username: z.string().email(),
    fullname: z.string().min(2),
    usertype: z.string().min(2),
    password: z.string().min(8),
  }),
});

module.exports = { LoginSchema, SignUpSchema };
