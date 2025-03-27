import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="mx-0 my-4 w-full px-4 text-sm sm:mx-auto sm:my-12 sm:max-w-3xl sm:px-6">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-300 py-6 sm:flex-row">
        {/* Left Section - Copyright */}
        <p className="text-gray-900 dark:text-gray-100">&copy; {new Date().getFullYear()} MILO. All rights reserved.</p>

        {/* Center Section - Navigation Links */}
        <nav className="hidden gap-4 text-gray-600 ">
          <a href="/about" className="hover:text-black transition-colors text-gray-900 dark:text-gray-100">
            About
          </a>

          <a href="/contact" className="hover:text-black transition-colors text-gray-900 dark:text-gray-100">
            Contact
          </a>
        </nav>

        {/* Right Section - Social Links */}
        <div className="hidden gap-4">
          <a href="https://www.instagram.com/madeverypersecond/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="h-5 w-5 text-gray-900 dark:text-gray-100 hover:text-black transition-colors" />
          </a>
          <a href="https://github.com/PanuwatChinpratan" target="_blank" rel="noopener noreferrer">
            <FaGithub className="h-5 w-5 text-gray-900 dark:text-gray-100 hover:text-black transition-colors" />
          </a>
          <a href="https://www.linkedin.com/in/panuwat-chinpratan-milo/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="h-5 w-5 text-gray-900 dark:text-gray-100 hover:text-blue-700 transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  )
}
