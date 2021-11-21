import React, { useEffect, useState } from 'react';

import AsyncCreatableSelect from 'react-select/async-creatable';

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