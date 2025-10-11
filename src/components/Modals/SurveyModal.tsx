'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'

const skinTypes = ['Dry', 'Oily', 'Normal', 'Combination']
const sensitiveOptions = ['Yes', 'No']
const skinConcerns = ['Acne', 'Pores', 'Dryness', 'Dark Spots', 'Anti-aging', 'Brightening']

interface SurveyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SurveyModal({ open, onOpenChange }: SurveyModalProps) {
  const [skinType, setSkinType] = useState('')
  const [sensitiveSkin, setSensitiveSkin] = useState('')
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([])

  const toggleConcern = (concern: string) => {
    if (selectedConcerns.includes(concern)) {
      setSelectedConcerns(selectedConcerns.filter((c) => c !== concern))
    } else if (selectedConcerns.length < 2) {
      setSelectedConcerns([...selectedConcerns, concern])
    }
  }

  const handleSave = () => {
    const profileData = {
      skinType,
      sensitiveSkin,
      skinConcerns: selectedConcerns,
    }
    console.log('Skin Profile Data:', profileData)
    onOpenChange(false)
  }

  const handleSkip = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white">
        <div className="grid grid-cols-2">
          {/* Left Section - Form */}
          <div className="p-12">
            <DialogTitle className="text-[20px] font-bold">
              Tell us a bit about your skin
            </DialogTitle>
            <DialogDescription className="text-[14px] mb-8">
              (It only takes 10 seconds)
            </DialogDescription>

            {/* Skin Type Section */}
            <div className="mb-5">
              <label className="block text-[14px] font-medium mb-2">Skin Type</label>
              <Select value={skinType} onValueChange={setSkinType}>
                <SelectTrigger className="h-[44px] border border-[#E0E0E0] rounded-lg px-3 focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="---" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {skinTypes.map((type) => (
                    <SelectItem
                      key={type}
                      value={type.toLowerCase()}
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sensitive Skin Section */}
            <div className="mb-5">
              <label className="block text-[14px] font-medium mb-2">
                Do you have sensitive skin?
              </label>
              <Select value={sensitiveSkin} onValueChange={setSensitiveSkin}>
                <SelectTrigger className="h-[44px] border border-[#E0E0E0] rounded-lg px-3 focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="---" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {sensitiveOptions.map((option) => (
                    <SelectItem
                      key={option}
                      value={option.toLowerCase()}
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Skin Concerns Section */}
            <div className="mb-8">
              <label className="block text-[14px] font-medium mb-2">
                Skin Concerns (Pick up to 2)
              </label>
              <div className="flex flex-wrap gap-2">
                {skinConcerns.map((concern) => (
                  <button
                    key={concern}
                    onClick={() => toggleConcern(concern)}
                    disabled={!selectedConcerns.includes(concern) && selectedConcerns.length >= 2}
                    className={`
                      py-3 px-4 rounded-full text-[14px] font-medium transition-colors
                      ${
                        selectedConcerns.includes(concern)
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                      ${
                        !selectedConcerns.includes(concern) && selectedConcerns.length >= 2
                          ? 'opacity-50 cursor-not-allowed'
                          : 'cursor-pointer'
                      }
                    `}
                  >
                    {concern}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-8">
              <button
                onClick={handleSkip}
                className="p-2 bg-black text-white text-[14px] font-medium hover:bg-gray-800 transition-colors"
              >
                Skip for now
              </button>
              <button
                onClick={handleSave}
                className="p-2 bg-black text-white text-[14px] font-medium hover:bg-gray-800 transition-colors"
              >
                Save & Continue
              </button>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="relative bg-gray-100">
            <Image
              src="/test/thumbnail_01.jpg"
              alt="Skin profile"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
