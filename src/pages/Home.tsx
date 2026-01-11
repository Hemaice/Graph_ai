import { Link } from 'react-router-dom';
import { Brain, FileText, TrendingUp, Shield, Zap, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Unlock Your Personality Through
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {' '}Handwriting
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover your unique personality traits using advanced AI-powered handwriting analysis.
            Get insights into the Big Five personality dimensions with just a sample of your handwriting.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/predict"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all"
            >
              Start Analysis
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Analysis</h3>
            <p className="text-gray-600">
              Our advanced machine learning algorithms analyze your handwriting patterns to reveal deep insights
              about your personality traits with remarkable accuracy.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Results</h3>
            <p className="text-gray-600">
              Upload your handwriting sample and receive a comprehensive personality analysis in seconds.
              No waiting, no complicated processes.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Private</h3>
            <p className="text-gray-600">
              Your handwriting samples are processed securely and never stored permanently.
              Your privacy is our top priority.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-12 text-white mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center">
              Understanding the Big Five Personality Traits
            </h2>
            <p className="text-xl text-blue-50 mb-10 text-center">
              Our analysis evaluates five core dimensions of personality that are scientifically validated
              and widely recognized in psychology.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h4 className="text-2xl font-bold mb-2">Openness</h4>
                <p className="text-blue-50">
                  Measures creativity, imagination, and willingness to try new experiences.
                  High scorers are curious and adventurous.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h4 className="text-2xl font-bold mb-2">Conscientiousness</h4>
                <p className="text-blue-50">
                  Reflects organization, dependability, and self-discipline.
                  High scorers are organized and goal-oriented.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h4 className="text-2xl font-bold mb-2">Extraversion</h4>
                <p className="text-blue-50">
                  Indicates sociability, assertiveness, and energy levels.
                  High scorers are outgoing and thrive in social settings.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h4 className="text-2xl font-bold mb-2">Agreeableness</h4>
                <p className="text-blue-50">
                  Shows compassion, cooperation, and trust in others.
                  High scorers are empathetic and value harmony.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 md:col-span-2">
                <h4 className="text-2xl font-bold mb-2">Neuroticism</h4>
                <p className="text-blue-50">
                  Measures emotional stability and tendency toward negative emotions.
                  Lower scores indicate greater emotional resilience and calmness.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Upload</h3>
              <p className="text-gray-600">
                Upload a clear image of your handwritten text
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Analyze</h3>
              <p className="text-gray-600">
                AI processes handwriting patterns and features
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Results</h3>
              <p className="text-gray-600">
                Receive detailed Big Five trait scores
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Insights</h3>
              <p className="text-gray-600">
                Get personalized interpretations of your profile
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <FileText className="w-16 h-16 text-blue-600 mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Handwriting Analysis?
              </h2>
              <p className="text-gray-600 mb-4">
                Handwriting is a unique form of self-expression. The way you form letters,
                space words, and apply pressure reveals unconscious patterns linked to your personality.
              </p>
              <p className="text-gray-600 mb-4">
                Graphology, the study of handwriting, has been used for decades in psychology and
                human resources. Now, with AI, we can provide more accurate and comprehensive analyses
                than ever before.
              </p>
              <Link
                to="/predict"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
              >
                Try it now
                <TrendingUp className="w-5 h-5 ml-2" />
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-50 rounded-2xl p-8 h-80 flex items-center justify-center">
                <Users className="w-32 h-32 text-blue-600 opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-600 mb-2">10,000+</div>
                    <div className="text-xl text-gray-700">Analyses Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
