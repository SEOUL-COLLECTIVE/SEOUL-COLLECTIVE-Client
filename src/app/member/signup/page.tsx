'use client'

import { useState, useEffect } from 'react'
import SignInput from '@/components/Inputs/SignInput'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { COUNTRIES, GENDERS, AGE_GROUPS, TERMS_CONTENT } from '@/constants/signup'
import { validateEmail, validatePassword, validateRequired } from '@/utils/validation'
import SurveyModal from '@/components/Modals/SurveyModal'
import { api } from '@/api/api'

export default function SignUpPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    country: '',
    gender: '',
    age: '',
    agreeTerms: false,
    termsOfUse: false,
    personalInfoRequired: false,
    personalInfoOptional: false,
    marketingOptional: false,
    emailMarketing: false,
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
  })

  const [expandedSections, setExpandedSections] = useState({
    termsOfUse: false,
    personalInfoRequired: false,
    personalInfoOptional: false,
    marketingOptional: false,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  // field에 따라 각각 알맞은 validation 부여
  const validateField = (field: keyof typeof errors, value: string) => {
    let validationResult = { valid: true, message: '' }

    switch (field) {
      case 'firstName':
        validationResult = validateRequired(value, 'First name')
        break
      case 'lastName':
        validationResult = validateRequired(value, 'Last name')
        break
      case 'email':
        validationResult = validateEmail(value)
        break
      case 'password':
        validationResult = validatePassword(value)
        break
    }

    return validationResult
  }

  const handleChange = (field: keyof typeof errors, value: string) => {
    setFormData({ ...formData, [field]: value })

    // 실시간 검증
    const validationResult = validateField(field, value)
    setErrors({ ...errors, [field]: validationResult.message })
  }

  // agree all terms 선택 시 모든 사항에 동의
  const handleAgreeAllTerms = (checked: boolean) => {
    setFormData({
      ...formData,
      agreeTerms: checked,
      termsOfUse: checked,
      personalInfoRequired: checked,
      personalInfoOptional: checked,
      marketingOptional: checked,
      emailMarketing: checked,
    })
  }

  // 모든 체크박스가 선택되면 agreeTerms도 자동으로 true
  useEffect(() => {
    const allChecked =
      formData.termsOfUse &&
      formData.personalInfoRequired &&
      formData.personalInfoOptional &&
      formData.marketingOptional &&
      formData.emailMarketing

    if (allChecked && !formData.agreeTerms) {
      setFormData({ ...formData, agreeTerms: true })
    } else if (!allChecked && formData.agreeTerms) {
      setFormData({ ...formData, agreeTerms: false })
    }
  }, [
    formData.termsOfUse,
    formData.personalInfoRequired,
    formData.personalInfoOptional,
    formData.marketingOptional,
    formData.emailMarketing,
    formData,
  ])

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.password &&
      formData.age &&
      validateEmail(formData.email).valid &&
      validatePassword(formData.password).valid &&
      formData.termsOfUse &&
      formData.personalInfoRequired
    )
  }

  // 최종 제출 이벤트
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid()) {
      // 모든 에러 표시
      setErrors({
        firstName: validateRequired(formData.firstName, 'First name').message,
        lastName: validateRequired(formData.lastName, 'Last name').message,
        email: validateEmail(formData.email).message,
        password: validatePassword(formData.password).message,
        age: validateRequired(formData.age, 'Age').message,
      })

      alert('Please fill in all required fields correctly and agree to the required terms.')
      return
    }

    console.log('Form submitted:', formData)

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: formData.age,
        gender: formData.gender,
        country: formData.country,
        termsOfUse: formData.termsOfUse,
        personalInfoRequired: formData.personalInfoRequired,
        personalInfoOptional: formData.personalInfoOptional,
        marketingOptional: formData.marketingOptional,
        emailMarketing: formData.emailMarketing,
      }

      const res = await api.post('/auth/signup', payload)
      if (res.status === 201) {
        alert('Sign up successful!')
        setModalOpen(true)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error)
      alert(error.response?.data?.message || 'Sign up failed.')
    }
  }

  return (
    <div className="w-screen bg-white overflow-auto -mx-[5.375rem] min-h-screen">
      <div className="max-w-[400px] mx-auto p-8 pt-12">
        <h1 className="text-[24px] font-bold text-center mb-8">Sign Up</h1>

        <form className="space-y-6 text-[14px]" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <SignInput
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              error={errors.firstName}
            />
            <SignInput
              type="text"
              placeholder="Last Name (Family Name)"
              value={formData.lastName}
              className="mt-3"
              onChange={(e) => handleChange('lastName', e.target.value)}
              error={errors.lastName}
            />
          </div>

          {/* Email ID */}
          <div>
            <label className="block text-gray-700 mb-2">
              Email ID <span className="text-red-500">*</span>
            </label>
            <SignInput
              type="email"
              placeholder="Enter your email address to use as login ID."
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={errors.email}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <SignInput
              type="password"
              placeholder="Password (8 to 16 characters)"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              error={errors.password}
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 mb-2">
              Age <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {AGE_GROUPS.map((ageGroup) => (
                <label key={ageGroup.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="age"
                    value={ageGroup.value}
                    checked={formData.age === ageGroup.value}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-4 h-4"
                  />
                  <span>{ageGroup.label}</span>
                </label>
              ))}
            </div>
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>

          {/* Country */}
          <div>
            <label className="block text-gray-700 mb-2">Country</label>
            <Select
              value={formData.country}
              onValueChange={(value) => setFormData({ ...formData, country: value })}
            >
              <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent className="bg-white max-h-40 overflow-y-auto">
                {COUNTRIES.map((country) => (
                  <SelectItem
                    key={country.value}
                    value={country.value}
                    className="hover:bg-gray-100 cursor-pointer"
                  >
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 mb-2">Gender</label>
            <Select
              value={formData.gender}
              onValueChange={(value) => setFormData({ ...formData, gender: value })}
            >
              <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {GENDERS.map((gender) => (
                  <SelectItem
                    key={gender.value}
                    value={gender.value}
                    className="hover:bg-gray-100 cursor-pointer"
                  >
                    {gender.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-3 pt-4 border-t">
            <label className="flex items-start gap-2 cursor-pointer">
              <Checkbox checked={formData.agreeTerms} onCheckedChange={handleAgreeAllTerms} />
              <span>I Agree to all terms. (Required/Optional).</span>
            </label>

            {/* Terms of Use */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <Checkbox
                  checked={formData.termsOfUse}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, termsOfUse: checked as boolean })
                  }
                />
                <span>
                  <span className="underline">Terms of Use</span> (Required){' '}
                  <button
                    type="button"
                    onClick={() => toggleSection('termsOfUse')}
                    className="text-gray-400 underline"
                  >
                    {expandedSections.termsOfUse ? 'Read Less' : 'Read More'}
                  </button>
                </span>
              </label>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedSections.termsOfUse ? 'max-h-48 opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="ml-7 p-4 bg-gray-50 rounded-md max-h-40 overflow-y-auto text-sm">
                  <p className="whitespace-pre-line">{TERMS_CONTENT.termsOfUse.content}</p>
                </div>
              </div>
            </div>

            {/* Personal Info Required */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <Checkbox
                  checked={formData.personalInfoRequired}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, personalInfoRequired: checked as boolean })
                  }
                />
                <span>
                  Collection and use of personal information (Required).{' '}
                  <button
                    type="button"
                    onClick={() => toggleSection('personalInfoRequired')}
                    className="text-gray-400 underline"
                  >
                    {expandedSections.personalInfoRequired ? 'Read Less' : 'Read More'}
                  </button>
                </span>
              </label>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedSections.personalInfoRequired
                    ? 'max-h-48 opacity-100 mt-2'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="ml-7 p-4 bg-gray-50 rounded-md max-h-40 overflow-y-auto text-sm">
                  <p className="whitespace-pre-line">
                    {TERMS_CONTENT.personalInfoRequired.content}
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Info Optional */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <Checkbox
                  checked={formData.personalInfoOptional}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, personalInfoOptional: checked as boolean })
                  }
                />
                <span>
                  Collection and use of personal information (Optional).{' '}
                  <button
                    type="button"
                    onClick={() => toggleSection('personalInfoOptional')}
                    className="text-gray-400 underline"
                  >
                    {expandedSections.personalInfoOptional ? 'Read Less' : 'Read More'}
                  </button>
                </span>
              </label>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedSections.personalInfoOptional
                    ? 'max-h-48 opacity-100 mt-2'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="ml-7 p-4 bg-gray-50 rounded-md max-h-40 overflow-y-auto text-sm">
                  <p className="whitespace-pre-line">
                    {TERMS_CONTENT.personalInfoOptional.content}
                  </p>
                </div>
              </div>
            </div>

            {/* Marketing Optional */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <Checkbox
                  checked={formData.marketingOptional}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, marketingOptional: checked as boolean })
                  }
                />
                <span>
                  Marketing usage and notification about offers and new products (Optional){' '}
                  <button
                    type="button"
                    onClick={() => toggleSection('marketingOptional')}
                    className="text-gray-400 underline"
                  >
                    {expandedSections.marketingOptional ? 'Read Less' : 'Read More'}
                  </button>
                </span>
              </label>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedSections.marketingOptional
                    ? 'max-h-48 opacity-100 mt-2'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="ml-7 p-4 bg-gray-50 rounded-md max-h-40 overflow-y-auto text-sm">
                  <p className="whitespace-pre-line">{TERMS_CONTENT.marketingOptional.content}</p>
                </div>
              </div>
            </div>

            <label className="flex items-start gap-2 cursor-pointer ml-8">
              <Checkbox
                checked={formData.emailMarketing}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, emailMarketing: checked as boolean })
                }
              />
              <span>Email</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-4 rounded-md font-medium transition-colors mt-8 ${
              isFormValid()
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Sign Up
          </button>
        </form>
      </div>

      {/* survey modal */}
      <SurveyModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  )
}
