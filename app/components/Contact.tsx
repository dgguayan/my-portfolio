'use_client';

import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  return (
    <section id="contactme" className="py-16 text-center">
      <h3 className="text-7xl mb-8 uppercase font-black">Contact Me</h3>
      <div className="max-w-md mx-auto space-y-8">
        <div className="flex justify-center gap-8 text-4xl">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">
            <FaGithub />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
            <FaLinkedin />
          </a>
          <a href="mailto:your.email@example.com" className="hover:text-red-600 transition-colors">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </section>
  );
}