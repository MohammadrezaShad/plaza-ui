import * as React from 'react';

import PlazaIcon, {IconProps} from '../components/Icon';

export function createSvgIcon(children: React.ReactNode, name: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = React.forwardRef((props: IconProps, ref: any) => (
    <PlazaIcon viewBox="0 0 1024 1024" ref={ref} {...props}>
      {children}
    </PlazaIcon>
  ));

  Icon.displayName = `${name}Icon`;

  return Icon;
}
