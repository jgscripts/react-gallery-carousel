import useTouch from './useTouch';
import useMouse from './useMouse';
import useNoDrag from './useNoDrag';

const useSwipe = (
  elementRef,
  swipePercentageMin,
  { swipeMove, swipeEndRight, swipeEndLeft, swipeEndDown, swipeEndDisqualified }
) => {
  const swipeEnd = (swipeXDisplacement, swipeYDisplacement = 0) => {
    const { clientWidth: width, clientHeight: height } = elementRef.current;
    const swipeXDistanceMin = width * swipePercentageMin;
    const swipeYDistanceMin = height * swipePercentageMin;
    if (
      swipeXDisplacement < -swipeYDisplacement &&
      swipeXDisplacement <= -swipeXDistanceMin
    )
      swipeEndLeft(swipeXDisplacement);
    else if (
      swipeXDisplacement > swipeYDisplacement &&
      swipeXDisplacement >= swipeXDistanceMin
    )
      swipeEndRight(swipeXDisplacement);
    else if (swipeYDisplacement > swipeYDistanceMin) swipeEndDown();
    else swipeEndDisqualified(swipeXDisplacement);
  };

  // have to use event listeners (active event listeners) to deal with undesired tiny vertical movements
  useTouch(elementRef, { swipeMove: swipeMove, swipeEnd: swipeEnd });

  const mouseEventHandlers = useMouse({
    swipeMove: swipeMove,
    swipeEnd: swipeEnd
  });

  useNoDrag(elementRef); // prevent dragging on FireFox

  return mouseEventHandlers;
};

export default useSwipe;
