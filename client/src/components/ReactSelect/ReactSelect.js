import React from "react";
import Select from "react-select";

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    borderRadius: "5px",
    // border: "0.1px solid black",
    height: state.selectProps.height,
    width: state.selectProps.width,
  }),
  valueContainer: (base, state) => ({
    ...base,
    height: state.selectProps.height,
    width: state.selectProps.width,
    // overflow: "hidden",
  }),
  //   indicatorsContainer: (base) => ({
  //     ...base,
  //     height: "4vh",
  //   }),
  control: (base, state) => ({
    ...base,
    height: state.selectProps.height,
    fontWeight: "bold",
    background: state.selectProps.backgroundColor,
    color: "white",
    borderRadius: "5px",
    overflow: "hidden",
    pointerEvents: "auto",
    // cursor: isDisabled ? "not-allowed" : "pointer",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "5px",
    hyphens: "auto",
    marginTop: "0",
    textAlign: "left",
    color: "black",
    overflowY: "auto",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // height: "1vh",
    fontWeight: "bold",
    fontSize: "13px",
    color: state.selectProps.textColor,
  }),
  //   input: (defaultStyles) => ({
  //     ...defaultStyles,
  //     height: "4vh",
  //   }),
  placeholder: (defaultStyles, state) => ({
    ...defaultStyles,
    // height: "1vh",
    fontWeight: "bold",
    fontSize: "13px",
    color: state.selectProps.textColor, //
  }),
  menuList: (base) => ({
    ...base,
    background: "whitesmoke",
    borderRadius: "5px",
    padding: 0,
    // overflowY:'auto'
  }),
  option: (provided) => ({
    ...provided,
    borderRadius: "5px",
    fontSize: '13px',
  }),
};

const ReactSelect = (props) => {
  // console.log("react select props", props);
  return (
    <div>
      <Select
        placeholder={props.placeholder}
        // className="basic-single"
        // classNamePrefix="select"
        // value={
        //   props.value !== "all"
        //     ? { value: props.value, label: props.value }
        //     : null
        // }
        // ref={props.ref}
        value={props.value}
        styles={customStyles}
        height={props.height}
        width={props.width}
        backgroundColor={props.backgroundColor}
        options={props.data}
        onChange={(e) => props.onChange(e)}
        textColor={props.textColor}
        isClearable={true}
      />{" "}
    </div>
  );
};

export default ReactSelect;

// {
//     container: (provided, state) => ({
//       ...provided,
//       borderRadius: "20px",
//       border: "0.1px solid black",
//       width: state.selectProps.width,
//     }),

//     control: (base, { isDisabled }) => ({
//       ...base,
//       fontWeight: "bold",
//       background: "whitesmoke",
//       borderColor: "whitesmoke",
//       borderRadius: "20px",
//       overflow: "auto",
//       pointerEvents: "auto",
//       cursor: isDisabled ? "not-allowed" : "pointer",
//     }),
//     menu: (base) => ({
//       ...base,
//       borderRadius: "20px 20px 20px 20px",
//       hyphens: "auto",
//       marginTop: "0",
//       textAlign: "left",
//       color: "#20314d",
//       overflowY: "auto",
//     }),
//     singleValue: (provided) => ({
//       ...provided,
//       fontWeight: "bold",
//       fontSize: "15px",
//       color: "#20314d",
//     }),
//     placeholder: (defaultStyles) => ({
//       ...defaultStyles,
//       fontWeight: "bold",
//       fontSize: "15px",
//       color: "#20314d",
//     }),
//     menuList: (base) => ({
//       ...base,
//       background: "whitesmoke",
//       borderRadius: "20px",
//       padding: 0,
//       // overflowY:'auto'
//     }),
//     option: (provided) => ({
//       ...provided,
//       borderRadius: "20px",
//     }),
//   };
