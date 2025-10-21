'use client'
import Image from 'next/image'
import { ExpertProfile } from '@/components/Cards/ExpertsProfileCard'
import { ExpertInfo } from '@/components/Cards/ExpertInfo'
import { QuestionCard } from '@/components/Cards/QuestionCard'
import { Button } from '@/components/ui/button'
import { CategoryFilter } from '@/components/Buttons/CategoryFilter'

const expertsymenu = [
  {
    name: 'Ask a Question',
    slug: 'ask-a-question',
  },
  {
    name: 'Experts Answers',
    slug: 'experts-answers',
  },
  {
    name: 'Experts',
    slug: 'experts',
  },
]

const experts = [
  {
    name: 'Dr. Sangshin Lee',
    title: 'Dermatologist',
    image: '/test/expert/doctor.jpg',
    description:
      'Dermatologist with 10 years of experience, specializing in acne and skin regeneration.',
  },
  {
    name: 'Junghye Lee',
    title: 'Allure Korea\nBeauty Director',
    image: '/test/expert/director.jpg',
    description:
      'Beauty director with 8 years of experience, specializing in trend makeup and skincare curation.',
  },
]

const questions = [
  {
    id: 1,
    expertName: 'Dr. Kim',
    expertTitle: 'Dermatologist',
    expertImage: '/test/expert/expert3.jpg',
    question: "What's the best retinol concentration for acne-prone sensitive skin?",
    answer:
      "For acne-prone, sensitive skin, I recommend a retinol concentration of 0.5% or lower to minimize irritation. When starting with retinol, it's important to introduce it gradually into your skincare routine. Begin by applying it once or twice a week, then slowly increase frequency as your skin builds tolerance. Always use sunscreen during the day, as retinol can increase sun sensitivity. Look for products that also contain soothing ingredients like niacinamide, ceramides, or hyaluronic acid to help minimize potential irritation. If you experience excessive dryness or irritation, reduce the frequency of application or consider switching to a lower concentration.",
    category: 'Skincare',
    likes: 23,
  },
  {
    id: 2,
    expertName: 'Dr. Park',
    expertTitle: 'Dermatologist',
    expertImage: '/test/expert/expert4.jpg',
    question: 'How often should I exfoliate my combination skin?',
    answer:
      'For combination skin, I recommend exfoliating 2-3 times per week using a gentle chemical exfoliant like BHA or AHA. Chemical exfoliants are generally more effective and less irritating than physical scrubs. BHA (salicylic acid) works well for oily areas and helps unclog pores, while AHA (glycolic or lactic acid) is great for dry patches and improving skin texture. Start with a lower concentration and gradually increase as your skin adapts. Always follow up with a good moisturizer and sunscreen, as exfoliation can make your skin more sensitive to UV rays. If you notice any redness or irritation, reduce the frequency.',
    category: 'Skincare',
    likes: 45,
  },
  {
    id: 3,
    expertName: 'Mina Lee',
    expertTitle: 'Makeup Artist',
    expertImage: '/test/expert/expert6.jpg',
    question: "What's the best way to make makeup last all day in humid weather?",
    answer:
      "To make your makeup last in humid conditions, start with a mattifying primer to control oil and create a smooth base. Use long-wear, waterproof formulas for foundation, concealer, and mascara. Set your makeup with a translucent powder, focusing on the T-zone, and finish with a setting spray designed for humidity. I recommend using cream products sparingly and opting for powder formulas instead, as they tend to hold up better in moisture. Blotting papers are also essential for touch-ups throughout the day. Consider using a primer specifically designed for humid climates, and don't skip skincare prep - a good moisturizer helps makeup adhere better.",
    category: 'Makeup',
    likes: 67,
  },
  {
    id: 4,
    expertName: 'Dr. Choi',
    expertTitle: 'Dermatologist',
    expertImage: '/test/expert/expert5.jpg',
    question: 'Can I use vitamin C and niacinamide together in my routine?',
    answer:
      "Yes, you can absolutely use vitamin C and niacinamide together! This is actually a common skincare myth that they can't be combined. Modern formulations are designed to work well together, and they can provide complementary benefits for your skin. Vitamin C is a powerful antioxidant that brightens and protects against environmental damage, while niacinamide helps with pore appearance, redness, and strengthens the skin barrier. If you're new to using both, you can start by applying vitamin C in the morning and niacinamide at night to see how your skin responds. Once your skin adjusts, you can use them in the same routine. Just make sure to use stable formulations and always follow with sunscreen during the day.",
    category: 'Skincare',
    likes: 89,
  },
  {
    id: 5,
    expertName: 'Sarah Kim',
    expertTitle: 'Hair Stylist',
    expertImage: '/test/expert/expert1.jpg',
    question: 'How can I repair heat-damaged hair without cutting it all off?',
    answer:
      "Repairing heat-damaged hair requires patience and a consistent routine. Start by eliminating or significantly reducing heat styling - let your hair air dry when possible and use heat protectant sprays when you must use hot tools. Incorporate deep conditioning treatments 2-3 times per week, focusing on protein treatments to rebuild the hair structure and moisture masks to restore hydration. Look for products containing keratin, amino acids, and natural oils like argan or coconut oil. Regular trims every 6-8 weeks will help remove split ends and prevent further damage from traveling up the hair shaft. Consider using leave-in conditioners and hair serums to seal the cuticle and add shine. With consistent care, you'll see improvement in 2-3 months.",
    category: 'Hair',
    likes: 52,
  },
  {
    id: 6,
    expertName: 'Jenny Park',
    expertTitle: 'Beauty Director',
    expertImage: '/test/expert/expert2.jpg',
    question: "What's the correct order to apply skincare products?",
    answer:
      'The golden rule for skincare application is to go from thinnest to thickest consistency. Start with cleanser, then apply toner or essence to prep the skin. Next, use any treatment serums like vitamin C or hyaluronic acid - these should be applied to slightly damp skin for better absorption. Follow with eye cream, gently patting around the orbital area. Then apply your moisturizer to lock in all the previous layers. In the morning, always finish with sunscreen as your last step. At night, you can use a heavier cream or facial oil as your final layer. Wait about 30-60 seconds between each step to allow proper absorption. Remember, less is more - using too many products can overwhelm your skin and reduce effectiveness.',
    category: 'Skincare',
    likes: 134,
  },
]

export default function page() {
  return (
    <div className="w-screen container mb-24">
      <div className="relative h-80 -mx-[5.375rem]">
        <Image
          src={'/test/expert/ask-experts-bg.png'}
          alt="community thumbnail"
          fill
          className="object-cover"
          priority
        />
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between py-8 left-[5.375rem]">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-white text-sm font-light tracking-wide">
            <span className="uppercase"></span>
          </div>

          <div className="mb-2">
            <div className="text-white inline-block tracking-wide text-p32">
              <div className="font-bold uppercase">ASK AN EXPERT</div>
            </div>
          </div>
        </div>
      </div>

      {/* 상단 네비게이션 - 버튼 flex line */}
      <div className="flex justify-between pt-10">
        {/* 서브카테고리 네비게이션 */}
        <div>
          {expertsymenu && (
            <div className="flex gap-8 text-p14">
              {expertsymenu.map((subItem) => (
                <div
                  key={subItem.name}
                  className="font-semibold cursor-pointer hover:underline hover:decoration-purple hover:decoration-[0.125rem] underline-offset-[0.4375rem]"
                >
                  {subItem.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <main className="min-h-screen bg-background">
        <div className="mx-auto py-8">
          {/* Expert Profiles Section */}
          <div className="mb-12 grid gap-6 lg:grid-cols-[2fr_2fr_3fr]">
            <div className="lg:col-span-2">
              <div className="grid gap-6 sm:grid-cols-2">
                {experts.map((expert, index) => (
                  <ExpertProfile key={index} {...expert} />
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <ExpertInfo />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <CategoryFilter />
          </div>

          {/* Questions Grid */}
          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {questions.map((question) => (
              <QuestionCard key={question.id} {...question} />
            ))}
          </div>

          {/* More Answers Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px] bg-transparent font-bold border-black shadow-none"
            >
              More Answers
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
