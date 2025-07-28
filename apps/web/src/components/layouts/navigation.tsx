import { Container } from "./layouts";
import Link from "next/link";
import { site_details } from "@/utils/constants";
import { PropsWithChildren } from "react";

const Navigation: React.FC<PropsWithChildren<{}>> = () => {
  return (
    <header className="pointer-events-none z-10 absolute top-0 left-0 right-0">
      <nav>
        <Container className="flex justify-between py-8">
          <Link 
            href="/" 
            className="relative p-2 leading-4 text-neutral-7 pointer-events-auto transition-colors duration-200 font-semibold -ml-3 hover:text-neutral-9"
          >
            <span className="text-primary">{site_details.firstname}</span>{" "}
            <span className="text-neutral-7">{site_details.lastname_abbr}</span>
          </Link>
          <ul className="flex m-0 p-0 list-none gap-2">
            <li>
              <Link 
                href="/works" 
                className="relative p-2 leading-4 text-neutral-7 pointer-events-auto transition-colors duration-200 font-medium hover:text-neutral-9"
              >
                Works
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className="relative p-2 leading-4 text-neutral-7 pointer-events-auto transition-colors duration-200 font-medium hover:text-neutral-9"
              >
                Contact
              </Link>
            </li>
          </ul>
        </Container>
      </nav>
    </header>
  );
};

export default Navigation;