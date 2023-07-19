import {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  ReactNode,
  FC,
} from "react";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import { slideDown } from "../animations/keyframes";

// ============================================================
type StickyProps = {
  fixedOn: number;
  children: ReactElement[] | ReactElement;
  scrollDistance?: number;
  notifyPosition?: number;
  containerRef?: { current: any };
  onSticky?: (isFixed: boolean) => void;
  notifyOnScroll?: (hasReachedPosition: boolean) => void;
};

type StyledBoxProps = {
  fixed?: boolean;
  fixedOn?: number;
  children: ReactNode;
  componentHeight?: number;
};
// ============================================================

export const StyledBox = styled<FC<StyledBoxProps>>(
  ({ children, componentHeight, fixedOn, fixed, ...rest }) => (
    <div {...rest}>{children}</div>
  )
)<StyledBoxProps>(({ theme, componentHeight, fixedOn, fixed }) => ({
  "& .hold": {
    zIndex: 5,
    boxShadow: "none",
    left: 0,
    right: 0,
    position: "fixed",
  },

  "& .fixed": {
    left: 0,
    right: 0,
    zIndex: 3,
    position: "fixed",
    boxShadow: theme.shadows[2],
  },
  "& + .section-after-sticky": { paddingTop: "95px" },
}));

const Sticky: FC<StickyProps> = ({
  fixedOn,
  children,
  onSticky,
  containerRef,
  notifyPosition,
  notifyOnScroll,
  scrollDistance = 0,
}) => {
  const [fixed, setFixed] = useState(false);
  const [parentHeight, setParentHeight] = useState(0);
  const elementRef = useRef<any>(null);
  const positionRef = useRef(0);

  const scrollListener = useCallback(() => {
    if (!window) return;

    // Distance of element from window top (-) minus value
    let distance = window.pageYOffset - positionRef.current;

    if (containerRef?.current) {
      let containerDistance =
        containerRef.current.offsetTop +
        containerRef.current?.offsetHeight -
        window.pageYOffset;

      if (notifyPosition && notifyOnScroll) {
        notifyOnScroll(
          distance <= notifyPosition && containerDistance > notifyPosition
        );
      }

      return setFixed(distance <= fixedOn && containerDistance > fixedOn);
    }

    if (notifyPosition && notifyOnScroll) {
      notifyOnScroll(distance >= notifyPosition);
    }

    let isFixed = distance >= fixedOn + scrollDistance;

    if (positionRef.current === 0) {
      isFixed =
        distance >= fixedOn + elementRef.current?.offsetHeight + scrollDistance;
    }

    setFixed(isFixed);
  }, [containerRef, fixedOn, notifyOnScroll, notifyPosition, scrollDistance]);

  useEffect(() => {
    if (!window) return;

    window.addEventListener("scroll", scrollListener);
    window.addEventListener("resize", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
      window.removeEventListener("resize", scrollListener);
    };
  }, [scrollListener]);

  useEffect(() => {
    if (!positionRef.current) {
      positionRef.current = elementRef.current?.offsetTop;
    }
    setParentHeight(elementRef.current?.offsetHeight || 0);
  }, [children]);

  useEffect(() => {
    if (onSticky) onSticky(fixed);
  }, [fixed, onSticky]);

  return (
    <StyledBox fixedOn={fixedOn} componentHeight={parentHeight} fixed={fixed}>
      <div className={clsx({ hold: !fixed, fixed: fixed })} ref={elementRef}>
        {children}
      </div>
    </StyledBox>
  );
};

export default Sticky;
