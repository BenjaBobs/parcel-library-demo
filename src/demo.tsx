import React, { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, NavLink, Route, Routes, useMatch } from 'react-router-dom';

import * as docs from './lib/**/*.docs.tsx';

const flatDocs = flattenGlob<ReactNode>(
  docs,
  (node) => node["__esModule"] === true
);
console.log(flatDocs);

const reactRootElement = document.body.appendChild(
  document.createElement("div")
);
const reactRoot = createRoot(reactRootElement);

reactRoot.render(
  <BrowserRouter>
    <div className="menu">
      <GlobMenu files={docs} />
    </div>
    <div className="content">
      <Routes>
        {flatDocs.map((doc) => (
          <Route
            key={doc.path}
            path={doc.path}
            element={<RenderDoc component={<doc.Value />} />}
          />
        ))}
      </Routes>
    </div>
  </BrowserRouter>
);

type GlobImport<T> = { [key: string]: T | GlobImport<T> };

function GlobMenu(props: { files: GlobImport<ReactNode>; parent?: string }) {
  return (
    <>
      {Object.entries(props.files).map(([key, value]) => {
        const nextKey = props.parent ? `${props.parent}/${key}` : key;
        const isMdx = typeof value!["default"] === "function";

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
            {typeof value === "object" && !value!["default"] && (
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

function RenderDoc(props: { component: ReactNode }) {
  return <div>{props.component}</div>;
}

function flattenGlob<T>(
  glob: GlobImport<T>,
  isLeaf: (glob: GlobImport<T>) => boolean,
  parent?: string
): { path: string; Value: T }[] {
  return isLeaf(glob)
    ? [{ path: parent!, Value: (glob as any).default as T }]
    : Object.entries(glob).flatMap(([key, value]) =>
        flattenGlob(
          value as GlobImport<T>,
          isLeaf,
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
