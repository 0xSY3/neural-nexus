// src/components/Navigation.tsx

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-blue-900/50 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">
            <span className="text-teal-300 hover:text-teal-100">Home</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard">
            <span className="text-teal-300 hover:text-teal-100">Dashboard</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}