/* eslint-disable no-nested-ternary */
import * as React from 'react';
import {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';

import {Component} from '../../shared/Main.types';

export interface FlipProps {
  /**
   * z-Index for the flip card. Used to help solve context stack issues while using multiple flip cards.
   * @default 'auto'
   */
  cardZIndex?: string;
  /** Extra css styling that can be applied to the container.
   * @default {}
   */
  containerStyle?: Record<string, unknown>;
  /**
   * Custom container class name.
   * @default undefined
   */
  containerClassName?: string;
  /**
   * False to show the front of the card, true to show the back
   * @default undefined
   */
  isFlipped?: boolean;
  /**
   * The speed of the flip animation when the card flips from back to front, the higher the number the slower the flip animation
   * @default 0.6
   */
  flipSpeedBackToFront?: number;
  /**
   * The speed of the flip animation when the card flips from front to back, the higher the number the slower the flip animation
   * @default 0.6
   */
  flipSpeedFrontToBack?: number;

  cardStyles?: {
    front?: Record<string, unknown>;
    back?: Record<string, unknown>;
  };
  /**
   * False to rotate in opposite directions on both sides of the card, true to rotate in the same direction
   * @default false
   */
  infinite?: boolean;

  /** Direction of the card flip (options are: 'horizontal' or 'vertical' )
   * @default 'horizontal'
   */
  flipDirection?: 'horizontal' | 'vertical';
  children: [React.ReactNode, React.ReactNode];

  component?: Component;
  flipperComponent?: Component;
  frontComponent?: Component;
  backComponent?: Component;
}

const Wrap = styled.div``;

const Flipper = styled.div``;

const Front = styled.div``;

const Back = styled.div``;

const Flip = React.forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    props: FlipProps,
    ref: React.Ref<T>,
  ) => {
    const {
      cardStyles = {
        back: {},
        front: {},
      },
      containerClassName,
      cardZIndex = 'auto',
      containerStyle = {},
      flipDirection = 'horizontal',
      flipSpeedBackToFront = 0.6,
      flipSpeedFrontToBack = 0.6,
      infinite = false,
      isFlipped: inputIsFlipped = false,
      component,
      backComponent,
      flipperComponent,
      frontComponent,
    } = props;
    const {back, front} = cardStyles;

    const [isFlipped, setFlipped] = useState(inputIsFlipped);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
      if (inputIsFlipped !== isFlipped) {
        setFlipped(inputIsFlipped);
        setRotation(c => c + 180);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputIsFlipped]);

    const getContainerClassName = useMemo(() => {
      let className = 'plaza-card-flip';
      if (containerClassName) {
        className += ` ${containerClassName}`;
      }
      return className;
    }, [containerClassName]);

    const getComponent = (key: 0 | 1) => {
      if (props.children.length !== 2) {
        throw new Error('[Plaza-UI] : Component Flip requires 2 children');
      }
      return props.children[key];
    };

    const frontRotateY = `rotateY(${
      infinite ? rotation : isFlipped ? 180 : 0
    }deg)`;
    const backRotateY = `rotateY(${
      infinite ? rotation + 180 : isFlipped ? 0 : -180
    }deg)`;
    const frontRotateX = `rotateX(${
      infinite ? rotation : isFlipped ? 180 : 0
    }deg)`;
    const backRotateX = `rotateX(${
      infinite ? rotation + 180 : isFlipped ? 0 : -180
    }deg)`;

    const styles: Record<string, React.CSSProperties> = {
      back: {
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        height: '100%',
        left: '0',
        position: isFlipped ? 'relative' : 'absolute',
        top: '0',
        transform: flipDirection === 'horizontal' ? backRotateY : backRotateX,
        transformStyle: 'preserve-3d',
        transition: `${flipSpeedFrontToBack}s`,
        width: '100%',
        ...back,
      },
      container: {
        perspective: '1000px',
        zIndex: `${cardZIndex}` as never,
      },
      flipper: {
        height: '100%',
        position: 'relative',
        width: '100%',
      },
      front: {
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        height: '100%',
        left: '0',
        position: isFlipped ? 'absolute' : 'relative',
        top: '0',
        transform: flipDirection === 'horizontal' ? frontRotateY : frontRotateX,
        transformStyle: 'preserve-3d',
        transition: `${flipSpeedBackToFront}s`,
        width: '100%',
        zIndex: '2' as never,
        ...front,
      },
    };

    return (
      <Wrap
        as={component}
        className={getContainerClassName}
        style={{...styles.container, ...containerStyle}}
        ref={ref as React.Ref<HTMLDivElement>}
      >
        <Flipper
          as={flipperComponent}
          className="plaza-card-flipper"
          style={styles.flipper}
        >
          <Front
            as={frontComponent}
            className="plaza-card-front"
            style={styles.front}
          >
            {getComponent(0)}
          </Front>

          <Back
            as={backComponent}
            className="plaza-card-back"
            style={styles.back}
          >
            {getComponent(1)}
          </Back>
        </Flipper>
      </Wrap>
    );
  },
);

Flip.displayName = 'Flip';

export default Flip;
