import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/custom.css';
import '../styles/heroes.css';
// import 'sf-font'
import Image from 'next/image';
import Link from 'next/link';
export default function App({ Component, pageProps }) {
  return (
    <div>
      <header className="d-flex flex-wrap mx-3 align-items-start justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <Link href="/">
          <Image
            src="/applogo.png"
            alt="Logo"
            width={50}
            height={50}
          />
        </Link>

        <ul className="nav col-10 col-md-auto mb-2 justify-content-center mb-md-1">
          <li>
            <a href="/" className="nav-link px-4 link-dark" style={{ fontFamily: 'SF Pro Display', fontWeight: "bold", fontSize: '20px' }}>
              Listed Properties
            </a>
          </li>
          <li>
            <a href="list" className="nav-link px-4 link-dark" style={{ fontFamily: 'SF Pro Display', fontWeight: "bold", fontSize: '20px' }}>
              List My Property
            </a>
          </li>
        </ul>
      </header>

      <Component {...pageProps} />
    </div>
  )
}