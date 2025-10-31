import { z } from 'zod';

// 프론트엔드와 동일한 비밀번호 정책 적용
const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
)

// 회원 가입 정보
export const signUpSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  email: z.string().email('Invalid email address.'),
  password: z
    .string()
    .min(8, 'Password must be 8 to 16 characters.')
    .max(16, 'Password must be 8 to 16 characters.'),
  // .regex(passwordValidation, 'Password must contain at least one uppercase, one lowercase, one number and one special character')
  // -> [TO-DO] 프론트엔드 정규식이 정해지면 수정
  age: z.string().min(1, 'Age is required.'),

  // 선택적 필드
  country: z.string().optional(),
  gender: z.string().optional(),

  // 약관 필드
  termsOfUse: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Terms of Use.',
  }),
  personalInfoRequired: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the collection of required personal information.',
  }),

  // 선택 약관
  personalInfoOptional: z.boolean().default(false),
  marketingOptional: z.boolean().default(false),
  emailMarketing: z.boolean().default(false),
})

// 로그인 정보
export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  keepSignedIn: z.boolean().optional(),
})