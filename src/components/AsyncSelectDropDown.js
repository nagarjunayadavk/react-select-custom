import React, { useEffect, useState } from 'react';

import AsyncCreatableSelect from 'react-select/async-creatable';
// import { colourOptions } from './data';
const colourOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];
// 
const filterColors = (inputValue) => {
  return colourOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = (inputValue) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

const FormatLabel = ({ inputValue }) => {
  return (
    <div style={{ color: "green" }}>
      < div style={{
        border: '2px solid green',
        width: '13px',
        lineHeight: '13px',
        textAlign: 'center',
        display: 'inline-table',
        borderRadius: '8px'
      }}>+</div> Add "{inputValue}"
    </div >
  )
}
const CustomSelect = () => {
  const [data, setData] = useState()
  useEffect(() => {
    // fetch('http://localhost:5000/colors')
    //   .then(response => response.json())
    //   .then(data => {
    //     // setData(data);
    //   });
  }, [])

  const loadOptions = (inputValue) => {

    return fetch('http://localhost:5000/colors?label_like=' + inputValue)
      .then(response => response.json())
      .then(data => {
        // setData(data);
        return data;
      });

    //=== to see Indicators

    // new Promise((resolve) => {
    //   setTimeout(() => {
    //     fetch('http://localhost:5000/colors?label_like=' + inputValue)
    //       .then(response => response.json())
    //       .then(data => {
    //         // setData(data);
    //         // return data;
    //         resolve(data);
    //       });
    //     // resolve(filterColors(inputValue));
    //   }, 1000);
    // });

  }
  const formatCreateLabel = (inputValue) => {
    return <FormatLabel inputValue={inputValue} />;
  }

  const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || ""
  const onCreateOption = (inputValue) => {
    console.log("called on create Options", inputValue);
    const inputData = {
      "label": capitalize(inputValue),
      "value": inputValue
    }
    fetch("http://localhost:5000/colors",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
      })
      .then(response => response.json())
      .then(data => {
        setData(data);
        return data;
      });
  }

  const LoadingMessage = ({ inputValue }) => {
    return (
      <div className=" css-at12u2-loadingIndicator" aria-hidden="true">
        <span className="css-1xtdfmb-LoadingDot"></span>
        <span className="css-zoievk-LoadingDot"></span>
        <span className="css-x748d8-LoadingDot"></span>
      </div>
    )
  }

  const loadingMessage = () => {
    return <LoadingMessage />
  }

  // const getNewOptionData = (inputValue, optionLabel) => ({
  //   "label": optionLabel,
  //   "value": inputValue,
  //   isNew: true
  // })
  // const isValidNewOption = (inputValue, selectValue, selectOptions) => {
  //   if (
  //     inputValue.trim().length === 0 ||
  //     selectOptions.find(option => option.name === inputValue)
  //   ) {
  //     return false;
  //   }
  //   return true;
  // };

  return (
    <AsyncCreatableSelect
      styles={
        {
          loadingIndicator: (prevStyle, state) => state ? ({
            ...prevStyle,
            display: 'none'
          }) : null,
        }
      }
      cacheOptions
      defaultOptions
      loadingMessage={loadingMessage}
      formatCreateLabel={formatCreateLabel}
      onCreateOption={onCreateOption}
      isClearable={true}
      // isValidNewOption={isValidNewOption}
      // getNewOptionData={getNewOptionData}
      loadOptions={loadOptions}
    />
  );
}


export default CustomSelect;
// export default class WithPromises extends Component {
//   render() {
//     return (
//       <AsyncCreatableSelect
//         cacheOptions
//         defaultOptions
//         loadOptions={promiseOptions}
//       />
//     );
//   }
// }