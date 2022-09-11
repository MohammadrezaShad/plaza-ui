import {useEffect, useRef} from 'react';
import warning from 'warning';

export function useControlledWarning(
  controlPropValue: unknown,
  controlPropName: string,
  componentName: string,
) {
  const isControlled = controlPropValue != null;
  const {current: wasControlled} = useRef(isControlled);

  useEffect(() => {
    warning(
      !(isControlled && !wasControlled),
      `\`${componentName}\` is changing from uncontrolled to be controlled. Components should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled \`${componentName}\` for the lifetime of the component. Check the \`${controlPropName}\` prop.`,
    );
    warning(
      !(!isControlled && wasControlled),
      `\`${componentName}\` is changing from controlled to be uncontrolled. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled \`${componentName}\` for the lifetime of the component. Check the \`${controlPropName}\` prop.`,
    );
  }, [componentName, controlPropName, isControlled, wasControlled]);
}
