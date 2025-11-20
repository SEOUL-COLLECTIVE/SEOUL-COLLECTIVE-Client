import { z } from 'zod'

/**
 * 비밀번호 정책: 8자 ~ 16자, 영문/숫자 1개 이상 포함
 */
const passwordValidation = /^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/

// 회원 가입 정보
export const signUpSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  email: z.string().email('Invalid email address.'),
  password: z
    .string()
    .min(8, 'Password must be 8 to 16 characters.')
    .max(16, 'Password must be 8 to 16 characters.')
    .regex(passwordValidation, 'Password must contain at least one letter and one number.'),
  age: z.string().min(1, 'Age is required.'),

  // 선택적 필드
  country: z.string().optional(),
  gender: z.string().optional(),

  // 필수 약관
  termsOfUse: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Terms of Use.',
  }),
  personalInfoRequired: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the collection of required personal information.',
  }),

  // 선택 약관 (기본값 false 처리)
  personalInfoOptional: z.boolean().optional().default(false),
  marketingOptional: z.boolean().optional().default(false),
  emailMarketing: z.boolean().optional().default(false),
})

// 로그인 정보
export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  
  // 프론트엔드에서 보내는 데이터 구조에 맞춰 saveId 추가 (백엔드 로직에선 안 쓰더라도 받아주는 게 좋음)
  keepSignedIn: z.boolean().optional(),
  saveId: z.boolean().optional(), 
})