'use client';

import { Phone, FileText, Mail, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContactSidebar() {
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Vragen? Wij helpen je graag verder!</h2>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Phone className="w-6 h-6 text-blue-600" />
          <div>
            <a
              href="tel:0555768044"
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              055 576 8044
            </a>
          </div>
        </div>
        <p className="text-sm text-gray-600 ml-9">
          (maandag t/m vrijdag tussen 9:00 en 17:30 uur)
        </p>
      </div>

      <div className="space-y-3">
        <Link
          href="/contact"
          className="flex items-center gap-3 p-3 bg-white rounded-md border border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-all group"
        >
          <FileText className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
          <span className="text-sm font-medium text-gray-900 group-hover:text-blue-700">
            Stuur mij een brochure
          </span>
        </Link>

        <Link
          href="/contact"
          className="flex items-center gap-3 p-3 bg-white rounded-md border border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-all group"
        >
          <Phone className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
          <span className="text-sm font-medium text-gray-900 group-hover:text-blue-700">
            Bel mij terug
          </span>
        </Link>

        <Link
          href="/contact"
          className="flex items-center gap-3 p-3 bg-white rounded-md border border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-all group"
        >
          <FileText className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
          <span className="text-sm font-medium text-gray-900 group-hover:text-blue-700">
            Stuur mij een vrijblijvend voorstel
          </span>
        </Link>

        <Link
          href="/inschrijven"
          className="flex items-center gap-3 p-3 bg-green-600 rounded-md hover:bg-green-700 transition-all group"
        >
          <CheckCircle className="w-5 h-5 text-white" />
          <span className="text-sm font-medium text-white">
            Ik wil me inschrijven
          </span>
        </Link>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-300">
        <p className="text-xs text-gray-600 mb-2">
          Voor meer informatie kun je ook contact opnemen via:
        </p>
        <a
          href="mailto:info@techtrain.nl"
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Mail className="w-4 h-4" />
          <span>info@techtrain.nl</span>
        </a>
      </div>
    </div>
  );
}
