/*
 * This file is here to help us to be able to use this file "components\researcher\orders\order-sidebar.js"
 * //TODO-refactorFile: refactor this file to follow the new component structure and best practice
 */

import mergeStyle from '@util/merge-style';

//Primary -> background: main color (#801E41), text: white
//Secondary -> background: white, text: #666
//Green -> background: green (#40C694), text: white
//Blue -> background: blue (#014459), text: white
//Red (Danger) -> background: red (#F16565), text: white
//Red (borderDanger) -> border: red (#F16565), text: white
//Grey -> background grey (#D2D2D2), text: white
//Disabled Grey -> background grey (#E2E2E2), text: black
//warning  -> background: warning-400
//Circle --> border radius full (50%)
//Transparent --> no background, text: #666

const colors = [
  'primary',
  'borderPrimary',
  'warning',
  'yellow',
  'secondary',
  'blue',
  'green',
  'danger',
  'borderDanger',
  'grey',
  'disabledGrey',
  'transparent',
  'circle',
  'outline',
  'dark',
];

const deleteUnusedProps = props => {
  colors.forEach(prop => {
    delete props[prop];
  });
  return props;
};

const Button = ({
  children,
  customClassName,
  type = 'submit',
  onClick,
  dataTest,
  ...props
}) => {
  const controls = {
    primary: props.primary,
    borderPrimary: props.borderPrimary,
    warning: props.warning,
    brown: props.brown,
    borderbrown: props.borderbrown,
    yellow: props.yellow,
    secondary: props.secondary,
    borderWhite: props.borderWhite,
    blue: props.blue,
    green: props.green,
    danger: props.danger,
    borderDanger: props.borderDanger,
    grey: props.grey,
    greylight: props.greylight,
    borderGrey: props.borderGrey,
    disabledGrey: props.disabledGrey,
    transparent: props.transparent,
    dark: props.dark,
    circle: props.circle || false,
    outline: props.outline,
    lightOutline: props.lightOutline,
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={mergeStyle(variants, {
        controls,
        className: `${customClassName} ease-in-out duration-500 transition-all text-center hover:cursor-pointer`,
      })}
      data-test={dataTest}
      {...deleteUnusedProps(props)}
    >
      {children}
    </button>
  );
};

const variants = {
  default:
    'text-[14px] 2xl:text-md disabled:cursor-not-allowed outline-hidden focus:outline-hidden capitalize',
  primary: {
    true: 'bg-primary-600 text-secondary-100 active:bg-primary-500 hover:bg-primary-500 outline-hidden',
  },
  borderPrimary: {
    true: 'bg-transparent text-primary-600 border border-primary-600 active:bg-primary-600 hover:text-white hover:bg-primary-600 outline-hidden',
  },
  secondary: {
    true: 'bg-secondary-100 text-dark-200 active:bg-secondary-200 outline-hidden',
  },
  borderWhite: {
    true: 'bg-transparent border border-secondary-100 text-secondary-100 hover:bg-secondary-100 hover:text-dark-400 outline-hidden',
  },
  brown: {
    true: 'bg-secondary-600 text-secondary-100 hover:bg-secondary-500 active:bg-secondary-500 outline-hidden',
  },
  borderbrown: {
    true: 'bg-transparent text-secondary-600 border border-secondary-600 hover:text-grey-600 hover:bg-secondary-600',
  },
  warning: {
    true: 'bg-warning-400 text-secondary-100 active:bg-warning-400 outline-hidden',
  },
  yellow: {
    true: 'bg-warning-500 text-secondary-100 active:bg-yellow-500 outline-hidden',
  },
  blue: {
    true: 'bg-secondary-600 text-secondary-100 active:bg-secondary-400 outline-hidden',
  },
  green: {
    true: 'bg-success-600 text-secondary-100 active:bg-green-400 outline-hidden',
  },
  danger: {
    true: 'bg-danger-600 text-secondary-100 active:bg-danger-400 outline-hidden',
  },
  borderDanger: {
    true: 'bg-white text-danger-600 border border-danger-600',
  },
  grey: {
    true: 'bg-grey-600 text-dark-400 active:bg-grey-500 hover:bg-grey-500 outline-hidden',
  },
  greylight: {
    true: 'bg-grey-400 text-dark-400 active:bg-grey-500 hover:bg-grey-500 outline-hidden',
  },
  borderGrey: {
    true: 'bg-transparent text-grey-600 border border-grey-600 hover:text-secondary-600 hover:bg-grey-600',
  },
  disabledGrey: {
    true: 'bg-[#E2E2E2] text-dark-400',
  },
  transparent: {
    true: 'bg-transparent text-dark-200 text-[16px]! active:outline-hidden pt-0 pb-0 pr-0 pl-0',
  },
  dark: {
    true: 'text-dark-400 active:outline-hidden pt-0 pb-0 pr-0 pl-0',
  },
  outline: {
    true: 'bg-transparent border-primary-600 text-primary-600 border-[2px] hover:bg-primary-600 hover:text-white',
  },
  lightOutline: {
    true: 'bg-transparent border-grey-400 text-black border-[2px] hover:bg-grey-400',
  },
  circle: {
    true: 'px-3 pt-2 pb-1',
    false: '2xl:px-14 2xl:py-3 px-8 py-2',
  },
};

export default Button;
