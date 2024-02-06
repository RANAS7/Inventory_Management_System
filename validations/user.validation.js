const { z } = require("zod");

const LoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

const SignUpSchema = z.object({
  body: z.object({
    Email: z.string().email(),
    Name: z.string().min(2),
    Password: z.string().min(2),
  }),
});

module.exports = { LoginSchema, SignUpSchema };
