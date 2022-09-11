import ClassNameGenerator from './ClassNameGenerator';

export type GlobalStateSlot =
  | 'active'
  | 'checked'
  | 'completed'
  | 'disabled'
  | 'error'
  | 'expanded'
  | 'focused'
  | 'focusVisible'
  | 'required'
  | 'selected';

const globalStateClassesMapping: Record<GlobalStateSlot, string> = {
  active: 'Pui-active',
  checked: 'Pui-checked',
  completed: 'Pui-completed',
  disabled: 'Pui-disabled',
  error: 'Pui-error',
  expanded: 'Pui-expanded',
  focused: 'Pui-focused',
  focusVisible: 'Pui-focusVisible',
  required: 'Pui-required',
  selected: 'Pui-selected',
};

export default function generateUtilityClass(
  componentName: string,
  slot: string,
): string {
  const globalStateClass = globalStateClassesMapping[slot as GlobalStateSlot];
  return (
    globalStateClass || `${ClassNameGenerator.generate(componentName)}-${slot}`
  );
}
