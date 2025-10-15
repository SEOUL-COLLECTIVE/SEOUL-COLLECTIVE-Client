'use client'

import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { COUNTRIES, GENDERS, AGE_GROUPS, TERMS_CONTENT } from '@/constants/signupData'

export default function SignUpPage() {
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

  return (
    <div className="w-screen bg-white overflow-auto -mx-[5.375rem] min-h-screen">
      <div className="max-w-[400px] mx-auto p-8 pt-12">
        <h1 className="text-[24px] font-bold text-center mb-8">Sign Up</h1>

        <form className="space-y-6 text-[14px]">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 mb-3"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name (Family Name)"
              className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>

          {/* Email ID */}
          <div>
            <label className="block text-gray-700 mb-2">
              Email ID <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email address to use as login ID."
              className="w-full py-2 px-4 border border-red-400 rounded-md focus:outline-none focus:border-red-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <p className="text-red-500 text-xs mt-1">[Email] is a required field.</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Password (8 to 16 characters)"
              className="w-full py-2 px-4 border border-red-400 rounded-md focus:outline-none focus:border-red-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <p className="text-red-500 text-xs mt-1">Please enter 8 - 16 Characters</p>
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
              <SelectContent className="bg-white">
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
              <SelectTrigger className="focus:ring-0 focus:ring-offset-0 bg-gray-100">
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

          {/* Age */}
          <div>
            <label className="block text-gray-700 mb-2">Age</label>
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
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-3 pt-4 border-t">
            <label className="flex items-start gap-2 cursor-pointer">
              <Checkbox
                checked={formData.agreeTerms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, agreeTerms: checked as boolean })
                }
              />
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
            className="w-full bg-black text-white py-4 rounded-md font-medium hover:bg-gray-800 transition-colors mt-8"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}
