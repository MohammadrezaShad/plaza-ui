import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface TooltipClasses {
  /** Styles applied to the Popper component. */
  popper: string;
  /** Styles applied to the Popper component unless `disableInteractive={true}`. */
  popperInteractive: string;
  /** Styles applied to the Popper component if `arrow={true}`. */
  popperArrow: string;
  /** Styles applied to the Popper component unless the tooltip is open. */
  popperClose: string;
  /** Styles applied to the tooltip (label wrapper) element. */
  tooltip: string;
  /** Styles applied to the tooltip (label wrapper) element if `arrow={true}`. */
  tooltipArrow: string;
  /** Styles applied to the arrow element. */
  arrow: string;
  /** Styles applied to the tooltip (label wrapper) element if the tooltip is opened by touch. */
  touch: string;
  /** Styles applied to the tooltip (label wrapper) element if `placement` contains "left". */
  tooltipPlacementLeft: string;
  /** Styles applied to the tooltip (label wrapper) element if `placement` contains "right". */
  tooltipPlacementRight: string;
  /** Styles applied to the tooltip (label wrapper) element if `placement` contains "top". */
  tooltipPlacementTop: string;
  /** Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom". */
  tooltipPlacementBottom: string;
}

export type TooltipClassKey = keyof TooltipClasses;

export function getTooltipUtilityClass(slot: string): string {
  return generateUtilityClass('PuiTooltip', slot);
}

const tooltipClasses: TooltipClasses = generateUtilityClasses('PuiTooltip', [
  'popper',
  'popperInteractive',
  'popperArrow',
  'popperClose',
  'tooltip',
  'tooltipArrow',
  'touch',
  'tooltipPlacementLeft',
  'tooltipPlacementRight',
  'tooltipPlacementTop',
  'tooltipPlacementBottom',
  'arrow',
]);

export default tooltipClasses;
