import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, NavLink, Route, Routes, useMatch } from 'react-router-dom';

import * as mdxFiles from './lib/**/*.mdx';

console.log(mdxFiles);
const flat = flattenGlobImport(mdxFiles) as { path: string; Mdx: ReactNode }[];
console.log("flat", flat);

const reactRoot = document.body.appendChild(document.createElement("div"));

ReactDOM.render(
  <BrowserRouter>
    <div className="menu">
      <GlobMenu files={mdxFiles} />
    </div>
    <div className="content">
      <Routes>
        {flat.map(({ path, Mdx }) => (
          <Route key={path} path={path} element={<Mdx />} />
        ))}
      </Routes>
    </div>
  </BrowserRouter>,
  reactRoot
);

type GlobImport<T> = { [key: string]: T | GlobImport<T> };

function GlobMenu(props: { files: GlobImport<ReactNode>; parent?: string }) {
  return (
    <>
      {Object.entries(props.files).map(([key, value]) => {
        const nextKey = props.parent ? `${props.parent}/${key}` : key;
        const isMdx = typeof value["default"] === "function";

        return (
          <React.Fragment key={nextKey}>
            {isMdx ? (
              <NavLink
                className={({ isActive }) =>
                  `nav-item ${isActive ? "match" : ""}`
                }
                to={nextKey}
              >
                {key}
              </NavLink>
            ) : (
              <NavText name={key} parent={props.parent} />
            )}
            {typeof value === "object" && !value["default"] && (
              <GlobMenu
                parent={nextKey}
                files={value as GlobImport<ReactNode>}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}

function flattenGlobImport<T>(files: GlobImport<T>, parent?: string) {
  return files["default"]
    ? [{ path: parent, Mdx: files["default"] }]
    : Object.entries(files).flatMap(([key, value]) =>
        flattenGlobImport(
          value as GlobImport<T>,
          parent ? `${parent}/${key}` : key
        )
      );
}

function NavText(props: { name: string; parent?: string }) {
  const route = props.parent ? `${props.parent}/${props.name}` : props.name;
  const isMatch = useMatch(route + "/*");

  return (
    <div className={`nav-item ${isMatch ? "match" : ""}`}>{props.name}</div>
  );
}
