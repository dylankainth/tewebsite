import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/components/Breadcrumb.module.css";

const convertBreadcrumb = (string) => {
  return string
    .replace(/-/g, " ")
    .replace(/oe/g, "ö")
    .replace(/ae/g, "ä")
    .replace(/ue/g, "ü");
};

const BreadcrumbGlobal = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <div className={styles.breadcrumb}>
      <li>
        <a href="/">Home</a>
      </li>
      {breadcrumbs.map((breadcrumb, i) => {
        return (
          <li key={breadcrumb.href}>
            <a href={breadcrumb.href}>
              {convertBreadcrumb(breadcrumb.breadcrumb)}
            </a>
          </li>
        );
      })}
    </div>
  );
};

export default BreadcrumbGlobal;
