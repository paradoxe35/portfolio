import Link from "next/link";
import style from "@/styles/modules/home.module.scss";
import { StorageImg } from "./storage-img";
import { Project } from "@/data/actions/project";

interface Work {
  aosDuration: number;
  project: Project;
}

export default function WorksItem({ aosDuration = 0, project }: Work) {
  return (
    <div className={style.project}>
      <Link href={`/works/${project.id}`} className={style.project__image}>
        <StorageImg src={project.image} alt={project.title} />
      </Link>

      <div className={style.project__body}>
        <div className={style.project__tags}>{project.technology}</div>
        <Link href={`/works/${project.id}`} className={style.project__name}>
          {project.title}
        </Link>
        <p className={style.project__desc}>{project.description}</p>

        <Link href={`/works/${project.id}`} className={style.project__action}>
          Find out more
          <svg
            className={style.icon__action}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            id="arrow"
            viewBox="0 0 14 14"
          >
            <path
              d="M6 1l.6-.6c.3-.3.8-.3 1.1 0l6 6c.4.4.4.8 0 1.1l-6 6.1c-.3.3-.8.3-1 0l-.7-.7a.8.8 0 010-1l3.7-3.6h-9a.7.7 0 01-.7-.8v-1c0-.4.3-.7.8-.7h9L6 2.2A.7.7 0 016 1z"
              fill="currentColor"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
