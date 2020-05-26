import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import routes from 'constants/routes';

interface RouterLinkProps {
  children: any;
  className?: string;
  href: string;
  onMouseEnter?: (e: React.MouseEvent) => any;
  onMouseLeave?: (e: React.MouseEvent) => any;
}
export const RouterLink: React.FunctionComponent<RouterLinkProps> = props => {
  const {
    children,
    className,
    href,
    onMouseEnter,
    onMouseLeave,
  } = props;

  return (
    <Link
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      to={href}
    >
      {children}
    </Link>
  );
}

const BreadCrumbs = () => (
  <div id="BreadCrumbs">
    <BreadcrumbsStateless onExpand={(...args) => console.log(args)}>
      {
        routes.map(route => (
          <BreadcrumbsItem
            key={`BreadcrumbsItem_${route.id}`}
            href={route.path}
            text={route.label}
            component={RouterLink}
          />
        ))
      }
    </BreadcrumbsStateless>
  </div>
);

export default BreadCrumbs;
