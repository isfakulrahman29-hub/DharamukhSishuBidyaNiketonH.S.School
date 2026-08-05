import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Dharamukh Sishu Bidya Niketon',
  description: 'Learn about the history, vision, and mission of Dharamukh Sishu Bidya Niketon Higher Secondary School.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 border-b pb-4">About Our School</h1>
          
          <div className="prose prose-blue max-w-none">
            <h2>Our History</h2>
            <p>
              Established in 2013, Dharamukh Sishu Bidya Niketon Higher Secondary School was founded with the vision of providing quality education to the children of Dharamukh and surrounding areas in the Nagaon district of Assam.
            </p>

            <h2>Vision</h2>
            <p>
              To be a center of excellence in education that nurtures intellectually capable, morally upright, and socially responsible citizens.
            </p>

            <h2>Mission</h2>
            <p>
              Our mission is to provide a holistic educational environment that fosters intellectual curiosity, character building, and life skills, empowering students to face the challenges of the modern world with confidence and integrity.
            </p>

            <h2>Educational Philosophy</h2>
            <p>
              We believe in an education system that goes beyond rote learning. Our approach focuses on understanding concepts, critical thinking, and practical application. We aim to develop the whole child—academically, physically, emotionally, and socially.
            </p>

            <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="text-xl font-semibold text-blue-900 mb-4 mt-0">School Profile</h3>
              <ul className="space-y-2 list-none pl-0">
                <li><strong>Status:</strong> Operational</li>
                <li><strong>Management:</strong> Private Unaided (Recognized)</li>
                <li><strong>Category:</strong> Primary with Upper Primary, Secondary and Higher Secondary</li>
                <li><strong>Type:</strong> Co-educational</li>
                <li><strong>UDISE Code:</strong> 18100401203</li>
                <li><strong>Cluster:</strong> Amtala West Cluster</li>
                <li><strong>Block:</strong> Kapili Block</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
