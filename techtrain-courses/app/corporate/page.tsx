import { Building2, Users, TrendingUp, Award, CheckCircle, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function CorporatePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bedrijfstraining</h1>
          <p className="text-xl text-secondary-100 max-w-3xl mb-8">
            Versterk je team met op maat gemaakte IT-trainingen. Investeer in de vaardigheden van je medewerkers en blijf voorop in een snel veranderende technologielandschap.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Offerte Aanvragen</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white hover:bg-secondary-50" asChild>
              <Link href="/courses">Bekijk Cursussen</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Waarom Kiezen voor Bedrijfstraining?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <Building2 className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Op Maat Gemaakt</h3>
            <p className="text-secondary-700">
              Training specifiek ontworpen voor de behoeften en doelen van jouw organisatie
            </p>
          </Card>

          <Card className="p-6 text-center">
            <TrendingUp className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">ROI-Gericht</h3>
            <p className="text-secondary-700">
              Meetbare resultaten met directe impact op productiviteit en innovatie
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Flexibel & Schaalbaar</h3>
            <p className="text-secondary-700">
              Train teams van 5 tot 500+ medewerkers, on-site of virtueel
            </p>
          </Card>
        </div>
      </section>

      {/* Training Options */}
      <section className="bg-secondary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Trainingsopties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4">On-Site Training</h3>
              <p className="text-secondary-700 mb-6">
                Onze trainers komen naar jouw locatie voor een gepersonaliseerde, hands-on ervaring.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Op maat gemaakt curriculum</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Gebruik je eigen infrastructuur</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Team building voordelen</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Flexibele planning</span>
                </li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/contact?type=onsite">Meer Informatie</Link>
              </Button>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4">Virtuele Training</h3>
              <p className="text-secondary-700 mb-6">
                Live, interactieve online trainingen die teams wereldwijd met elkaar verbinden.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Geografisch verspreide teams</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Kosteneffectieve oplossing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Opgenomen sessies voor terugkijken</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">Hands-on labs en oefeningen</span>
                </li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/contact?type=virtual">Meer Informatie</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Corporate Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Populaire Bedrijfstrainingen</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Cloud Transformatie',
              description: 'Begeleid je team bij de migratie naar cloud-first architectuur',
              topics: ['AWS/Azure/GCP', 'Cloud Security', 'Cost Optimization'],
            },
            {
              title: 'DevOps & CI/CD',
              description: 'Implementeer moderne deployment pipelines en automatisering',
              topics: ['Docker & Kubernetes', 'GitLab/GitHub Actions', 'Infrastructure as Code'],
            },
            {
              title: 'Cybersecurity Awareness',
              description: 'Versterk je verdediging met security best practices',
              topics: ['Threat Detection', 'Secure Coding', 'Compliance (AVG, ISO)'],
            },
          ].map((course, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-secondary-700 mb-4">{course.description}</p>
              <div className="space-y-2">
                {course.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="flex items-center gap-2 text-sm text-secondary-600">
                    <span className="w-1.5 h-1.5 bg-primary-600 rounded-full"></span>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button size="lg" asChild>
            <Link href="/courses">Bekijk Alle Cursussen</Link>
          </Button>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-secondary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Ons Proces</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Consultatie</h3>
              <p className="text-secondary-600 text-sm">
                We bespreken je doelen, uitdagingen en teamsamenstelling
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Maatwerk Plan</h3>
              <p className="text-secondary-600 text-sm">
                Ontwerp van een gepersonaliseerd trainingsprogramma
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Levering</h3>
              <p className="text-secondary-600 text-sm">
                Door experts geleide training met praktische projecten
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Follow-up</h3>
              <p className="text-secondary-600 text-sm">
                Ondersteuning na training en voortgangsbeoordeling
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Success Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Klant Succesverhalen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <Award className="w-12 h-12 text-primary-600" />
              <div>
                <h3 className="font-semibold text-lg">Tech Innovate BV</h3>
                <p className="text-sm text-secondary-600">Software Bedrijf, 150+ medewerkers</p>
              </div>
            </div>
            <p className="text-secondary-700 mb-4">
              "TechTrain heeft ons geholpen om 50 developers op te leiden in moderne cloud-native ontwikkeling. Binnen 3 maanden zagen we een 40% verbetering in deployment snelheid."
            </p>
            <p className="text-sm text-secondary-600">- CTO, Tech Innovate</p>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <Award className="w-12 h-12 text-primary-600" />
              <div>
                <h3 className="font-semibold text-lg">FinSecure Nederland</h3>
                <p className="text-sm text-secondary-600">Financiële Diensten, 300+ medewerkers</p>
              </div>
            </div>
            <p className="text-secondary-700 mb-4">
              "De cybersecurity training was precies wat we nodig hadden. Praktisch, relevant en direct toepasbaar. Onze security posture is significant verbeterd."
            </p>
            <p className="text-sm text-secondary-600">- CISO, FinSecure</p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageSquare className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Klaar om je Team te Versterken?</h2>
          <p className="text-xl text-secondary-100 mb-8">
            Neem contact op voor een vrijblijvende consultatie en ontvang een op maat gemaakt trainingsvoorstel.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-secondary-50" asChild>
              <Link href="/contact">Neem Contact Op</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/courses">Bekijk Cursussen</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
