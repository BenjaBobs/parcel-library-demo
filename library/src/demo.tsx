import React, { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, NavLink, Route, Routes, useMatch } from 'react-router-dom';

// @ts-ignore
import * as docs from './lib/**/*.docs.tsx';

const flatDocs = flattenGlob<ReactNode>(docs);

const reactRoot = createRoot(
  document.body.appendChild(document.createElement("div"))
);

reactRoot.render(
  <BrowserRouter>
    <div className="menu">
      <NavMenu files={docs} />
    </div>
    <div className="content">
      <Routes>
        {flatDocs.map((doc) => (
          <Route
            key={doc.path}
            path={doc.path}
            // @ts-ignore
            element={<doc.Value />}
          />
        ))}
      </Routes>
    </div>
  </BrowserRouter>
);

type GlobImport<T> = { [key: string]: T | GlobImport<T> };

function NavMenu(props: { files: GlobImport<ReactNode>; parent?: string }) {
  return (
    <>
      {Object.entries(props.files).map(([key, value]) => {
        const nextKey = props.parent ? `${props.parent}/${key}` : key;
        const isModule = (value as any)["__esModule"] === true;

        return (
          <div className="nav-section" key={nextKey}>
            {isModule ? (
              <NavLink
                className={({ isActive }) =>
                  `nav-item link ${isActive ? "match" : ""}`
                }
                to={nextKey}
              >
                {key}
              </NavLink>
            ) : (
              <>
                <NavMenuSection name={key} parent={props.parent} />
                <NavMenu
                  parent={nextKey}
                  files={value as GlobImport<ReactNode>}
                />
              </>
            )}
          </div>
        );
      })}
    </>
  );
}

function NavMenuSection(props: { name: string; parent?: string }) {
  const route = props.parent ? `${props.parent}/${props.name}` : props.name;
  const isMatch = useMatch(route + "/*");

  return (
    <div className={`nav-item ${isMatch ? "match" : ""}`}>{props.name}</div>
  );
}

function flattenGlob<T>(
  glob: GlobImport<T>,
  parent?: string
): { path: string; Value: T }[] {
  return (glob as any)["__esModule"] === true
    ? [{ path: parent!, Value: (glob as any).default as T }]
    : Object.entries(glob).flatMap(([key, value]) =>
        flattenGlob(value as GlobImport<T>, parent ? `${parent}/${key}` : key)
      );
}
