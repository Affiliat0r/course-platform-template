import { Target, Users, Award, TrendingUp } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Over TechTrain</h1>
          <p className="text-xl text-secondary-100 max-w-3xl">
            Professionals en organisaties versterken met eersteklas IT-training sinds 2015
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8">
            <Target className="w-12 h-12 text-primary-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Onze Missie</h2>
            <p className="text-secondary-700 leading-relaxed">
              Hoogwaardige, praktische IT-training leveren die individuen en organisaties in staat stelt te floreren in het digitale tijdperk. We overbruggen de kloof tussen technologie en talent door door experts geleide cursussen die zijn ontworpen voor toepassing in de praktijk.
            </p>
          </Card>

          <Card className="p-8">
            <Award className="w-12 h-12 text-primary-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Onze Waarden</h2>
            <ul className="space-y-2 text-secondary-700">
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span><strong>Excellentie:</strong> De hoogste kwaliteit training leveren</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span><strong>Innovatie:</strong> Vooroplopen in technologietrends</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span><strong>Impact:</strong> Meetbare carrièregroei creëren</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">10+</div>
            <div className="text-secondary-600">Jaar Ervaring</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">5000+</div>
            <div className="text-secondary-600">Getrainde Studenten</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
            <div className="text-secondary-600">Expert Docenten</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">98%</div>
            <div className="text-secondary-600">Tevredenheidspercentage</div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">Waarom TechTrain Kiezen?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Docenten</h3>
              <p className="text-secondary-700">
                Leer van professionals uit de industrie met jarenlange praktijkervaring
              </p>
            </Card>

            <Card className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Praktische Focus</h3>
              <p className="text-secondary-700">
                Cursussen ontworpen voor toepassing in de praktijk met hands-on labs
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Award className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Certificering Klaar</h3>
              <p className="text-secondary-700">
                Bereid je voor op branche-erkende certificeringen en carrièreverbetering
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
