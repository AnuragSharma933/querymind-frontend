import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Database, Globe, Zap } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Query in English, Hindi, Hinglish, Spanish, French, or Chinese'
    },
    {
      icon: Database,
      title: 'Multiple Databases',
      description: 'Support for MySQL, PostgreSQL, and SQLite'
    },
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Advanced AI suggestions and query optimization'
    },
    {
      icon: Zap,
      title: 'Real-Time Execution',
      description: 'Execute queries and see results instantly'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="gradient-bg text-white">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              QueryMind AI
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Transform natural language into SQL queries with AI
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-white text-primary-purple px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 dark:text-white">
          Powerful Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="gradient-bg w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-heading font-semibold mb-2 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="gradient-bg rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to simplify your SQL workflow?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Start converting natural language to SQL queries in seconds
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-white text-primary-purple px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Launch Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;