export type SpacingsInputs = {
  spacings?: number[];
  pxToRem: (size: number) => string;
};

export type Spacings = (spaceIndex: number) => string;

const createSpacings = (spacingInputs: SpacingsInputs) => {
  const {
    spacings = [2, 4, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96],
    pxToRem,
  } = spacingInputs;
  const spacingsToRem = spacings.map(space => pxToRem(space));

  const spacing = (spaceIndex: number) => {
    if (!spacingsToRem[spaceIndex - 1]) {
      // eslint-disable-next-line no-console
      console.error(
        [
          `[Plaza-UI] : The spaceIndex '${spaceIndex}' is invalid.`,
          `spaceIndex should be between 1-${spacings.length} .`,
        ].join('\n'),
      );
      return '0';
    }
    return spacingsToRem[spaceIndex - 1];
  };
  return spacing;
};

export default createSpacings;
