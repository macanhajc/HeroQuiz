import React from 'react';
import Svg, {Path} from 'react-native-svg';

const LogoSVG = ({color, ...props} = this.props) => {
  return (
    <Svg
      width={152.814}
      height={170.353}
      viewBox="0 0 152.814 170.353"
      {...props}>
      <Path
        fill={color || '#fff'}
        d="M0 0v141.008h21.788V80.93h37.747v60.078h71.531l-49.1 29.344h48.923l21.932-9.691h-29.759l29.752-18.4V62.314h-48.148v18.815h26.4v40.673h-49.1V.002H59.531v62.69H21.788V.002z"
        data-name="Caminho 1"
      />
    </Svg>
  );
};

export default LogoSVG;
