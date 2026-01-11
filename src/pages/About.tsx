import { Brain, Target, Award, Sparkles, LineChart, Lock } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About HandwritingAI</h1>
            <p className="text-xl text-blue-50 max-w-3xl mx-auto">
              Pioneering the future of personality assessment through the intersection
              of artificial intelligence and graphology
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-4">
            At HandwritingAI, we believe that understanding yourself is the first step toward
            personal growth and fulfillment. Our mission is to make sophisticated personality
            assessment accessible to everyone through the power of artificial intelligence.
          </p>
          <p className="text-lg text-gray-700">
            By combining centuries-old graphology principles with cutting-edge machine learning,
            we've created a tool that provides accurate, insightful, and actionable personality
            assessments in seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Accurate</h3>
            <p className="text-gray-600">
              Our AI models are trained on thousands of validated handwriting samples,
              achieving high accuracy in personality trait prediction.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-cyan-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Accessible</h3>
            <p className="text-gray-600">
              No expensive tests or psychologist visits needed. Get professional-grade
              insights from the comfort of your home.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Private</h3>
            <p className="text-gray-600">
              Your data is processed securely and never shared. We respect your privacy
              and protect your information.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-3xl p-12 mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            The Science Behind Our Technology
          </h2>

          <div className="space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Graphology Foundations
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Graphology is the study of handwriting and its connection to personality traits.
                    Research has shown that handwriting characteristics such as size, slant, pressure,
                    spacing, and letter formations can reveal insights about a person's psychological state.
                  </p>
                  <p className="text-gray-700">
                    Features we analyze include letter sizing, baseline consistency, pen pressure variation,
                    margin placement, word spacing, letter slant angle, loop formations, and overall writing rhythm.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <LineChart className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Machine Learning Models
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Our AI system uses deep convolutional neural networks trained on extensive datasets
                    of handwriting samples paired with validated personality assessments. The model learns
                    to identify subtle patterns and correlations that even trained graphologists might miss.
                  </p>
                  <p className="text-gray-700">
                    We employ computer vision techniques for feature extraction, including edge detection,
                    texture analysis, and geometric measurements, combined with supervised learning algorithms
                    that map these features to Big Five personality dimensions.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Big Five Personality Model
                  </h3>
                  <p className="text-gray-700 mb-3">
                    The Big Five model is the most scientifically validated framework in personality psychology.
                    It measures five broad dimensions: Openness, Conscientiousness, Extraversion, Agreeableness,
                    and Neuroticism (often remembered as OCEAN).
                  </p>
                  <p className="text-gray-700">
                    These traits are stable across time and cultures, making them ideal for personality assessment.
                    Each trait exists on a spectrum, and our system provides nuanced scores that reflect the
                    complexity of human personality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Our Development Process
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-3">01</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Data Collection</h3>
              <p className="text-gray-700">
                We collected thousands of handwriting samples from diverse populations,
                ensuring our model works across different writing styles, languages, and demographics.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-3">02</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Validation</h3>
              <p className="text-gray-700">
                Each handwriting sample was paired with standardized Big Five personality assessments
                to create ground truth data for training and validation.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border border-cyan-100">
              <div className="text-3xl font-bold text-cyan-600 mb-3">03</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Model Training</h3>
              <p className="text-gray-700">
                Our team of data scientists and psychologists worked together to develop and refine
                neural network architectures optimized for handwriting feature extraction.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border border-cyan-100">
              <div className="text-3xl font-bold text-cyan-600 mb-3">04</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Continuous Improvement</h3>
              <p className="text-gray-700">
                We continuously update our models with new data and feedback, ensuring our
                predictions remain accurate and relevant as our understanding evolves.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Discover Yourself?</h2>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have gained valuable insights into their personality
            through our AI-powered handwriting analysis.
          </p>
          <a
            href="/predict"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all"
          >
            Start Your Analysis
          </a>
        </div>
      </div>
    </div>
  );
}
