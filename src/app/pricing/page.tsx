'use client';

import { motion } from 'framer-motion';
import { Check, Zap, Code, Shield, Users, Sparkles, Rocket } from 'lucide-react';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { SignUpButton } from '@clerk/nextjs';

const PricingPage = () => {
  const { isSignedIn } = useUser();

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for individuals getting started with GitDev',
      features: [
        'Up to 5 private repositories',
        'Basic issue tracking',
        'Community support',
        '1GB storage',
        'Basic analytics',
      ],
      cta: 'Get Started',
      popular: false,
      icon: <Code className="h-8 w-8 text-red-400" />,
    },
    {
      name: 'Pro',
      price: '$9',
      description: 'For developers and small teams',
      features: [
        'Unlimited private repositories',
        'Advanced issue tracking',
        'Priority support',
        '10GB storage',
        'Advanced analytics',
        'Code review tools',
        'Team management',
      ],
      cta: 'Go Pro',
      popular: true,
      icon: <Zap className="h-8 w-8 text-yellow-400" />,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large teams and organizations',
      features: [
        'Everything in Pro',
        'Unlimited storage',
        'Enterprise support',
        'SAML SSO',
        'Advanced security',
        'Audit logs',
        'Dedicated account manager',
      ],
      cta: 'Contact Sales',
      popular: false,
      icon: <Rocket className="h-8 w-8 text-purple-400" />,
    },
  ];

  const features = [
    {
      name: 'Unlimited Repositories',
      description: 'Host all your projects with unlimited private repositories.',
      icon: <Code className="h-6 w-6 text-red-400" />,
    },
    {
      name: 'Advanced Security',
      description: 'Enterprise-grade security features to keep your code safe.',
      icon: <Shield className="h-6 w-6 text-red-400" />,
    },
    {
      name: 'Team Collaboration',
      description: 'Seamless collaboration with your team members.',
      icon: <Users className="h-6 w-6 text-red-400" />,
    },
    {
      name: 'Priority Support',
      description: 'Get help when you need it with our priority support.',
      icon: <Sparkles className="h-6 w-6 text-red-400" />,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100 pt-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-red-100/80 max-w-3xl mx-auto">
            Choose the perfect plan for your development needs. No hidden fees, no surprises.
          </p>
        </motion.div>
      </div>

      {/* Pricing Toggle - Monthly/Yearly */}
      <div className="flex justify-center mb-16">
        <div className="bg-black/40 backdrop-blur-sm p-1 rounded-full border border-red-500/30 inline-flex">
          <button className="px-6 py-2 rounded-full bg-red-900/50 text-white font-medium">
            Monthly
          </button>
          <button className="px-6 py-2 rounded-full text-gray-400 hover:text-white transition-colors">
            Yearly <span className="ml-1 text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 border ${
                plan.popular 
                  ? 'border-red-500/50 bg-gradient-to-br from-red-900/20 to-black/50 ring-1 ring-red-500/30 transform md:-translate-y-4' 
                  : 'border-red-900/50 bg-black/40'
              } backdrop-blur-sm`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-6">
                {plan.icon}
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {plan.price}
                  </span>
                  {plan.price !== 'Free' && plan.price !== 'Custom' && (
                    <span className="text-lg text-gray-400 ml-2">/mo</span>
                  )}
                </div>
                <p className="text-red-100/80 mt-2">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {isSignedIn ? (
                <Link 
                  href={plan.name === 'Enterprise' ? '/contact' : '/dashboard/billing'}
                  className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-all ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-500 hover:to-pink-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]' 
                      : 'bg-red-900/30 text-white border border-red-500/30 hover:bg-red-900/50 hover:border-red-400/50'
                  }`}
                >
                  {plan.cta}
                </Link>
              ) : (
                <SignUpButton mode="modal">
                  <button
                    className={`w-full text-center py-3 px-6 rounded-lg font-medium transition-all ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-500 hover:to-pink-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]' 
                        : 'bg-red-900/30 text-white border border-red-500/30 hover:bg-red-900/50 hover:border-red-400/50'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </SignUpButton>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gradient-to-b from-black to-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500 mb-4">
              Everything you need to ship better code
            </h2>
            <p className="text-lg text-red-100/80 max-w-3xl mx-auto">
              All plans include powerful features to help you and your team collaborate more effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-red-900/50 hover:border-red-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-red-900/30 flex items-center justify-center mb-4 border border-red-500/30">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.name}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {[
              {
                question: "Can I change plans later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated and reflected in your next billing cycle."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes, all paid plans come with a 14-day free trial. No credit card is required to start your trial."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. We also support payments via PayPal."
              },
              {
                question: "How does the free plan work?",
                answer: "The free plan includes basic features and is perfect for individuals getting started. You can upgrade to a paid plan at any time for additional features and resources."
              },
              {
                question: "Do you offer discounts for non-profits or educational institutions?",
                answer: "Yes, we offer special pricing for non-profits and educational institutions. Please contact our sales team for more information."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-red-900/50 hover:border-red-500/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">Still have questions?</h3>
            <p className="text-red-100/80 mb-6">Our team is here to help you get the most out of GitDev.</p>
            <Link 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
            >
              Contact Support
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
